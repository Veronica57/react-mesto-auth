import fail from "../images/fail.svg";
import success from "../images/success.svg";

function InfoToolTip({ onClose, isOpen, isSuccess, message }) {
    return (
        <div
            className={`popup info-tooltip
            onClick={onClose}> ${isOpen && "popup_opened"}`}>
            <div className=" info-tooltip__container">
                <img
                    className="info-tooltip__image"
                    src={isSuccess ? success : fail}
                    alt="Результат запроса"
                />
                <p className="info-tooltip__subtitle">{message}</p>
                <button
                    className="button info-tooltip__close"
                    type="button"
                    onClick={onClose}
                />
            </div>
        </div>
    );
}

export default InfoToolTip;
