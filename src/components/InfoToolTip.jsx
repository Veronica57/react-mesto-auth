import fail from "../images/fail.svg";
import success from "../images/success.svg";

function InfoToolTip({ onClose, isOpen, isSucceed }) {
    return (
        <div
            className={`popup info-tooltip ${isOpen && "popup_opened"}`}
            onClick={onClose}>
            <div
                className="info-tooltip__container"
                onClick={(event) => {
                    event.stopPropagation();
                }}>
                {isSucceed ? (
                    <>
                        <img
                            className="info-tooltip__image"
                            src={success}
                            alt="Запрос"
                        />
                        <p className="info-tooltip__subtitle">
                            Вы успешно зарегистрировались!
                        </p>
                    </>
                ) : (
                    <>
                        <img
                            className="info-tooltip__image"
                            src={fail}
                            alt="Запрос"
                        />
                        <p className="info-tooltip__subtitle">
                            Что-то пошло не так! Попробуйте ещё раз.
                        </p>
                    </>
                )}

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
