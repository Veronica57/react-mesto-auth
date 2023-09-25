import { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
    const avatarInput = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();
        onUpdateAvatar({
            avatar: avatarInput.current.value,
        });
    };

    useEffect(() => {
        avatarInput.current.value = "";
    }, [isOpen]);

    return (
        <PopupWithForm
            title={"Обновить аватар"}
            name={"userAvatarForm"}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            submitButton={isLoading ? "Сохранение..." : "Сохранить"}>
            <div className="popup__form-fieldset">
                <div className="popup__input-container">
                    <input
                        type="url"
                        className="popup__input popup__input_avatar_link"
                        name="useravatar"
                        id="useravatar"
                        placeholder="Ссылка на фотографию пользователя"
                        required
                        ref={avatarInput}
                    />
                    <span className="popup__input-error popup__input-useravatar-error"></span>
                </div>
            </div>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;
