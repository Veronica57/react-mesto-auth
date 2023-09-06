function ImagePopup({ card, onClose }) {
    return (
        <div
            className={`popup popup_image-background show-popup' ${
                card ? "popup_opened" : ""
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
                        alt={`Фотография ${card ? card.name : ""}`}
                        src={card ? card.link : ""}
                    />
                    <p className="popup__image-name">{card ? card.name : ""}</p>
                </div>
            </div>
        </div>
    );
}

export default ImagePopup;
