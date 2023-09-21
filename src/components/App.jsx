import "../index.css";
import { useEffect, useState } from "react";
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
    //edit avatar popup
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
    const handleEditAvatarClick = () => {
        setEditAvatarPopupOpen(true);
    };

    //edit profile popup
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
    const handleEditProfileClick = () => {
        setEditProfilePopupOpen(true);
    };

    //add place popup
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
    const handleAddPlaceClick = () => {
        setAddPlacePopupOpen(true);
    };

    //cards
    //open card
    const [selectedCard, setSelectedCard] = useState(null);
    const handleCardClick = (card) => {
        setSelectedCard(card);
    };

    //delete card
    const [deleteCardId, setDeleteCardId] = useState("");

    //confirm delete card
    const [isConfirmDeletePopupOpen, setConfirmDeletePopupOpen] =
        useState(false);
    const handleDeleteCardClick = (cardId) => {
        setDeleteCardId(cardId);
        setConfirmDeletePopupOpen(true);
    };

    //close popup by escape button
    useEffect(() => {
        const closePopupEscape = (event) => {
            if (event.key === "Escape") {
                closeAllPopups();
            }
        };
        if (
            isEditProfilePopupOpen ||
            isAddPlacePopupOpen ||
            isEditAvatarPopupOpen ||
            isConfirmDeletePopupOpen
        ) {
            document.addEventListener("keydown", closePopupEscape);
        }
    }, [
        isEditProfilePopupOpen,
        isAddPlacePopupOpen,
        isEditAvatarPopupOpen,
        isConfirmDeletePopupOpen,
    ]);

    //close all popups
    const closeAllPopups = () => {
        setEditAvatarPopupOpen(false);
        setAddPlacePopupOpen(false);
        setEditProfilePopupOpen(false);
        setSelectedCard(null);
        setConfirmDeletePopupOpen(false);
    };

    //user
    const [currentUser, setCurrentUser] = useState({});

    //cards loading
    const [cards, setCards] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        Promise.all([api.getInfo(), api.getCards()])
            .then(([dataUser, dataCard]) => {
                setCurrentUser(dataUser);
                dataCard.forEach((element) => {
                    element.id = dataUser._id;
                });
                setCards(dataCard);
                setLoading(false);
            })
            .catch((error) => console.error(`Код ошибки ${error}`));
    }, []);

    const handleUpdateUser = (data) => {
        api.getInfo(data)
            .then((data) => {
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch((error) => console.error(error));
    };

    const handleUpdateAvatar = (data) => {
        api.setAvatar(data)
            .then((data) => {
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch((error) => console.error(error));
    };

    const handleAddPlaceSubmit = (data) => {
        api.addNewCard(data)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((error) => console.error(error));
    };

    const handleCardDelete = (event) => {
        event.preventDefault();
        api.deleteCard(deleteCardId).then(() => {
            api.getCards()
                .then((dataCards) => {
                    setCards(dataCards);
                    closeAllPopups();
                })
                .catch((error) => console.error(error));
        });
    };

    const handleCardLike = (card) => {
        const isLiked = cards.likes.some(
            (item) => item._id === currentUser._id
        );
        api.changeLike(card._id, isLiked)
            .then((newCard) => {
                const newCards = cards.map((currentCard) =>
                    currentCard._id === card._id ? newCard : currentCard
                );
                setCards(newCards);
            })
            .catch((error) => console.error(error));
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
                        onCardDelete={handleCardDelete}
                        cards={cards}
                        isLoading={isLoading}
                        onCardLike={handleCardLike}
                    />
                    <Footer />
                    {/* Edit Profile */}
                    <EditProfilePopup
                        isOpen={isEditProfilePopupOpen}
                        onClose={closeAllPopups}
                        onUpdateUser={handleUpdateUser}
                    />
                    {/* Add Photo */}
                    <AddPlacePopup
                        isOpen={isAddPlacePopupOpen}
                        onClose={closeAllPopups}
                        onAddPlace={handleAddPlaceSubmit}
                    />
                    {/* Add User Avatar */}
                    <EditAvatarPopup
                        isOpen={isEditAvatarPopupOpen}
                        onClose={closeAllPopups}
                        onUpdateAvatar={handleUpdateAvatar}
                    />
                    {/* Confirm Delete Photo */}
                    <PopupWithForm
                        title={"Вы уверены?"}
                        name={"confirmDelete"}
                        submitButton={"Да"}
                    />
                    <ImagePopup card={selectedCard} onClose={closeAllPopups} />
                </div>
            </div>
        </CurrentUserContext.Provider>
    );
}
export default App;
