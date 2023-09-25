import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { useContext, useEffect, useState } from "react";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
    const currentUser = useContext(CurrentUserContext);

    const [userName, setUserName] = useState("");

    const handleUserName = (event) => {
        setUserName(event.target.value);
    };

    const [userDescription, setUserDescription] = useState("");

    const handleUserDescription = (event) => {
        setUserDescription(event.target.value);
    };

    useEffect(() => {
        setUserName(currentUser.name);
        setUserDescription(currentUser.about);
    }, [currentUser, isOpen]);

    const handleSubmit = (event) => {
        event.preventDefault();
        onUpdateUser({
            username: userName,
            userdescription: userDescription,
        });
    };

    return (
        <PopupWithForm
            title={"Редактировать профиль"}
            name={"editForm"}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            submitButton={isLoading ? "Сохранение..." : "Сохранить"}>
            <div className="popup__form-fieldset">
                <div className="popup__input-container">
                    <input
                        type="text"
                        name="username"
                        className="popup__input popup__input_user_name"
                        required
                        minLength={2}
                        maxLength={40}
                        placeholder="Имя пользователя"
                        value={userName || ""}
                        onChange={handleUserName}
                    />
                    <span className="popup__input-error popup__input-username-error"></span>
                </div>
                <div className="popup__input-container">
                    <input
                        type="text"
                        name="userdescription"
                        className="popup__input popup__input_user_description"
                        required
                        minLength={2}
                        maxLength={200}
                        placeholder="Описание пользователя"
                        value={userDescription || ""}
                        onChange={handleUserDescription}
                    />
                    <span className="popup__input-error popup__input-userdescription-error"></span>
                </div>
            </div>
        </PopupWithForm>
    );
}

export default EditProfilePopup;
