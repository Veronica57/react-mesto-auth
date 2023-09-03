import "../index.css";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import PopupWithForm from "./PopupWithForm";
import { useState } from "react";

function App() {
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);

    function handleEditAvatarClick() {
        setEditAvatarPopupOpen(true);
    }

    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);

    function handleEditProfileClick() {
        setEditProfilePopupOpen(true);
    }

    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);

    function handleAddPlaceClick() {
        setAddPlacePopupOpen(true);
    }

    const [isImagePopupOpen, setImagePopupOpen] = useState(false);

    function closeAllPopups() {
        setEditAvatarPopupOpen(false);
        setAddPlacePopupOpen(false);
        setEditProfilePopupOpen(false);
        setImagePopupOpen(false);
    }

    const [selectedCard, setSelectedCard] = useState([]);

    function handleCardClick(card) {
        setSelectedCard(card);
        setImagePopupOpen(true);
    }

    return (
        <div>
            <Header />
            <Main
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditAvatarClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
            />
            <Footer />
            {/* Edit Profile */}
            <PopupWithForm
                title="Редактировать профиль"
                titleButton="Сохранить"
                name="editForm"
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
            />
            {/* Add Photo */}
            <PopupWithForm
                title="Новое место"
                titleButton="Сохранить"
                name="addImageForm"
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
            />
            {/* Add User Avatar */}
            <PopupWithForm
                title="Обновить аватар"
                titleButton="Сохранить"
                name="userAvatarForm"
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
            />
            {/* Confirm Delete Photo */}
            <PopupWithForm
                title="Вы уверены?"
                name="confirmDelete"
                titleButton="Да"
            />
            <ImagePopup
                card={selectedCard}
                isOpen={isImagePopupOpen}
                onClose={closeAllPopups}
            />
        </div>
    );
}
export default App;
