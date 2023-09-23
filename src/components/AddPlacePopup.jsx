import { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
    const imageName = useRef(null);
    const imageLink = useRef(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        onAddPlace({
            imagename: imageName.current.value,
            imagelink: imageLink.current.value,
        });
    };

    useEffect(() => {
        imageName.current.value = "";
        imageLink.current.value = "";
    }, [isOpen]);

    return (
        <PopupWithForm
            title={"Новое место"}
            name={"addImageForm"}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            submitButton={isLoading ? "Сохранение..." : "Создать"}>
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
                        ref={imageName}
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
                        ref={imageLink}
                    />
                    <span className="popup__input-error popup__input-imagelink-error"></span>
                </div>
            </div>
        </PopupWithForm>
    );
}

export default AddPlacePopup;
