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
    const [cards, setCards] = useState([]); //карточки
    const [currentUser, setCurrentUser] = useState({}); // пользователь
    const [selectedCard, setSelectedCard] = useState(null); //выбранная карточка
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false); //профиль пользователя
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false); //добавление картинки
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false); //изменение аватара
    const [isDeletePopupOpen, setDeletePopupOpen] = useState(false); // удаление карточки
    const [isLoading, setIsLoading] = useState(true); //загрузка
    const [deletedCard, setDeletedCard] = useState(); //удаление карточки

    //close all popups
    const closeAllPopups = useCallback(() => {
        setEditAvatarPopupOpen(false);
        setAddPlacePopupOpen(false);
        setEditProfilePopupOpen(false);
        setSelectedCard(null);
        setDeletePopupOpen(false);
    }, []);

    //получение данных о пользователе
    useEffect(() => {
        api.getInfo()
            .then((info) => setCurrentUser(info))
            .catch((error) => console.error(error));
    }, []);

    //получение карточек
    useEffect(() => {
        api.getCards()
            .then((cards) => setCards(cards))
            .catch((error) => console.error(error));
    }, []);

    // обновление пользователя
    const handleUpdateUser = (data) => {
        setIsLoading(true);
        api.setInfo(data)
            .then((info) => {
                setCurrentUser(info);
            })
            .then(() => closeAllPopups())
            .catch((error) => console.error(error))
            .finally(() => setIsLoading(false));
    };

    //Обновление автара
    const handleUpdateAvatar = (data) => {
        setIsLoading(true);
        api.setAvatar(data)
            .then((info) => {
                setCurrentUser(info);
            })
            .then(() => closeAllPopups())
            .catch((error) => console.error(error))
            .finally(() => setIsLoading(false));
    };

    //загрузка новой карточки
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
    //установка лайка на карточке
    const handleCardLike = (card) => {
        const isLiked = cards.likes.some(
            (item) => item._id === currentUser._id
        );
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

    // api.changeLike(card._id, isLiked)
    //         .then((newCard) => {
    //             const newCards = cards.map((currentCard) =>
    //                 currentCard._id === card._id ? newCard : currentCard
    //             );
    //             setCards(newCards);
    //         })
    //         .catch((error) => console.error(error));

    // удаление карточки
    const handleCardDelete = (card) => {
        setIsLoading(true);
        api.deleteCard(card._id).then(() =>
            setCards(cards.filter((item) => item !== card))
                .then(() => closeAllPopups())
                .catch((error) => console.error(error))
                .finally(() => setIsLoading(false))
        );
    };

    // открытие попапа удаления
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
                        isLoading={isLoading}
                        title={"Вы уверены?"}
                        name={"confirmDelete"}
                        submitButton={isLoading ? "Удаление..." : "Да"}
                        isOpen={isDeletePopupOpen}
                        onClose={closeAllPopups}
                        deleteCard={handleCardDelete}
                        card={deletedCard}
                    />
                    <ImagePopup card={selectedCard} onClose={closeAllPopups} />
                </div>
            </div>
        </CurrentUserContext.Provider>
    );
}
export default App;
