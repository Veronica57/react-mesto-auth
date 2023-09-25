import "../index.css";
import { useCallback, useEffect, useState } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import api from "../utils/Api";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import PopupWithForm from "./PopupWithForm";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {
    const [cards, setCards] = useState([]); //cards
    const [currentUser, setCurrentUser] = useState({}); // user
    const [selectedCard, setSelectedCard] = useState(null); //selected card
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false); //user profile
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false); //card adding
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false); //avatar updating
    const [isDeletePopupOpen, setDeletePopupOpen] = useState(false); // delete popup
    const [isLoading, setIsLoading] = useState(false); //loading
    const [deletedCard, setDeletedCard] = useState(); //card deleting

    //close all popups
    const closeAllPopups = useCallback(() => {
        setEditAvatarPopupOpen(false);
        setAddPlacePopupOpen(false);
        setEditProfilePopupOpen(false);
        setSelectedCard(null);
        setDeletePopupOpen(false);
    }, []);

    //user data getting
    useEffect(() => {
        api.getInfo()
            .then((info) => setCurrentUser(info))
            .catch((error) => console.error(error));
    }, []);

    //cards receiving
    useEffect(() => {
        api.getCards()
            .then((cards) => setCards(cards))
            .catch((error) => console.error(error));
    }, []);

    // user data updating
    const handleUpdateUser = (data) => {
        setIsLoading(true);
        api.setInfo(data)
            .then((info) => setCurrentUser(info))
            .then(() => closeAllPopups())
            .catch((error) => console.error(error))
            .finally(() => setIsLoading(false));
    };

    //avatar updating
    const handleUpdateAvatar = (data) => {
        setIsLoading(true);
        api.setAvatar(data)
            .then((info) => setCurrentUser(info))
            .then(() => closeAllPopups())
            .catch((error) => console.error(error))
            .finally(() => setIsLoading(false));
    };

    //new card loading
    const handleAddPlaceSubmit = (data) => {
        setIsLoading(true);
        api.addNewCard(data)
            .then((newCard) => {
                setCards([newCard, ...cards]);
            })
            .then(() => closeAllPopups())
            .catch((error) => console.error(error))
            .finally(() => setIsLoading(false));
    };

    //like status updating
    const handleCardLike = (card) => {
        const isLiked = card.likes.some((like) => like._id === currentUser._id);
        if (!isLiked) {
            api.addLike(card._id)
                .then((like) =>
                    setCards((cards) =>
                        cards.map((currentCard) =>
                            currentCard._id === card._id ? like : currentCard
                        )
                    )
                )
                .catch((error) => console.error(error));
        } else {
            api.deleteLike(card._id)
                .then((like) =>
                    setCards((cards) =>
                        cards.map((currentCard) =>
                            currentCard._id === card._id ? like : currentCard
                        )
                    )
                )
                .catch((error) => console.error(error));
        }
    };

    // card deleting
    const handleCardDelete = (event) => {
        event.preventDefault();
        setIsLoading(true);
        api.deleteCard(deletedCard._id).then(() =>
            api
                .getCards()
                .then((dataCards) => {
                    setCards(dataCards);
                })
                .then(() => closeAllPopups())
                .catch((error) => console.error(error))
                .finally(() => setIsLoading(false))
        );
    };

    // delete popup open
    const handleDeleteClick = (card) => {
        setDeletePopupOpen(true);
        setDeletedCard(card);
    };

    //edit avatar open
    const handleEditAvatarClick = () => {
        setEditAvatarPopupOpen(true);
    };

    //edit profile popup
    const handleEditProfileClick = () => {
        setEditProfilePopupOpen(true);
    };

    //add place popup
    const handleAddPlaceClick = () => {
        setAddPlacePopupOpen(true);
    };

    //card open popup
    const handleCardClick = (card) => {
        setSelectedCard(card);
    };

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div>
                <div className="page">
                    <Header />
                    <Main
                        onEditAvatar={handleEditAvatarClick}
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onCardClick={handleCardClick}
                        onCardLike={handleCardLike}
                        onCardDelete={handleDeleteClick}
                        cards={cards}
                    />
                    <Footer />
                    {/* Edit Profile */}
                    <EditProfilePopup
                        isLoading={isLoading}
                        isOpen={isEditProfilePopupOpen}
                        onClose={closeAllPopups}
                        onUpdateUser={handleUpdateUser}
                    />
                    {/* Add Photo */}
                    <AddPlacePopup
                        isLoading={isLoading}
                        isOpen={isAddPlacePopupOpen}
                        onClose={closeAllPopups}
                        onAddPlace={handleAddPlaceSubmit}
                    />
                    {/* Add User Avatar */}
                    <EditAvatarPopup
                        isLoading={isLoading}
                        isOpen={isEditAvatarPopupOpen}
                        onClose={closeAllPopups}
                        onUpdateAvatar={handleUpdateAvatar}
                    />
                    {/* Confirm Delete Photo */}
                    <PopupWithForm
                        title={"Вы уверены?"}
                        name={"confirmDelete"}
                        submitButton={isLoading ? "Удаление..." : "Да"}
                        isOpen={isDeletePopupOpen}
                        onClose={closeAllPopups}
                        onSubmit={handleCardDelete}
                        card={deletedCard}
                    />
                    <ImagePopup card={selectedCard} onClose={closeAllPopups} />
                </div>
            </div>
        </CurrentUserContext.Provider>
    );
}
export default App;
