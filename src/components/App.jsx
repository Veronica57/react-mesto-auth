import "../index.css";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import PopupWithForm from "./PopupWithForm";
import { useState } from "react";

function App() {
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);

    const handleEditAvatarClick = () => {
        setEditAvatarPopupOpen(true);
    };

    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);

    const handleEditProfileClick = () => {
        setEditProfilePopupOpen(true);
    };

    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);

    const handleAddPlaceClick = () => {
        setAddPlacePopupOpen(true);
    };

    const [isImagePopupOpen, setImagePopupOpen] = useState(false);

    const closeAllPopups = () => {
        setEditAvatarPopupOpen(false);
        setAddPlacePopupOpen(false);
        setEditProfilePopupOpen(false);
        setImagePopupOpen(false);
    };

    const [selectedCard, setSelectedCard] = useState({});

    const handleCardClick = (card) => {
        setSelectedCard(card);
        setImagePopupOpen(true);
    };

    return (
        <div>
            <div className="page">
                <Header />
                <Main
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onCardClick={handleCardClick}
                />
                <Footer />
                {/* Edit Profile */}
                <PopupWithForm
                    title={"Редактировать профиль"}
                    submitButton={"Сохранить"}
                    name={"editForm"}
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}>
                    <div className="popup__form-fieldset">
                        <div className="popup__input-container">
                            <input
                                type="text"
                                name="username"
                                className="popup__input popup__input_user_name"
                                required=""
                                minLength={2}
                                maxLength={40}
                                placeholder="Имя пользователя"
                            />
                            <span className="popup__input-error popup__input-username-error"></span>
                        </div>
                        <div className="popup__input-container">
                            <input
                                type="text"
                                name="userdescription"
                                className="popup__input popup__input_user_description"
                                required=""
                                minLength={2}
                                maxLength={200}
                                placeholder="Описание пользователя"
                            />
                            <span className="popup__input-error popup__input-userdescription-error"></span>
                        </div>
                    </div>
                </PopupWithForm>
                {/* Add Photo */}
                <PopupWithForm
                    title={"Новое место"}
                    submitButton={"Сохранить"}
                    name={"addImageForm"}
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}>
                    <div className="popup__form-fieldset">
                        <div className="popup__input-container">
                            <input
                                type="text"
                                name="imagename"
                                id="imagename"
                                className="popup__input popup__input_image_name"
                                required
                                minLength={2}
                                maxLength={30}
                                placeholder="Название"
                            />
                            <span className="popup__input-error popup__input-imagename-error"></span>
                        </div>
                        <div className="popup__input-container">
                            <input
                                type="url"
                                name="imagelink"
                                id="imagelink"
                                className="popup__input popup__input_image_link"
                                required=""
                                placeholder="Ссылка на картинку"
                            />
                            <span className="popup__input-error popup__input-imagelink-error"></span>
                        </div>
                    </div>
                </PopupWithForm>
                {/* Add User Avatar */}
                <PopupWithForm
                    title={"Обновить аватар"}
                    submitButton={"Сохранить"}
                    name={"userAvatarForm"}
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}>
                    <div className="popup__form-fieldset">
                        <div className="popup__input-container">
                            <input
                                type="url"
                                className="popup__input popup__input_avatar_link"
                                name="useravatar"
                                id="useravatar"
                                placeholder="Ссылка на фотографию пользователя"
                                required=""
                            />
                            <span className="popup__input-error popup__input-useravatar-error"></span>
                        </div>
                    </div>
                </PopupWithForm>
                {/* Confirm Delete Photo */}
                <PopupWithForm
                    title={"Вы уверены?"}
                    name={"confirmDelete"}
                    submitButton={"Да"}
                />
                <ImagePopup
                    card={selectedCard}
                    isOpen={isImagePopupOpen}
                    onClose={closeAllPopups}
                />
            </div>
        </div>
    );
}
export default App;
