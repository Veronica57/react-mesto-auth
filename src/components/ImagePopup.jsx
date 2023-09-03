function ImagePopup({ card, isOpen, onClose }) {
    return (
        <div
            className={`popup popup_image-background show-popup' ${
                isOpen && "popup_opened"
            }`}
            id="openImage">
            <div className="popup__image-container">
                <button
                    className="popup__exit"
                    type="button"
                    onClick={onClose}></button>
                <div>
                    <img
                        className="popup__image"
                        alt={`Фотография ${card.name}`}
                        src={card.link}
                    />
                    <p className="popup__image-name">{card.name}</p>
                </div>
            </div>
        </div>
    );
}

export default ImagePopup;
