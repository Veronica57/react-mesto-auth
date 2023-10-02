function PopupWithForm({
    title,
    name,
    submitButton,
    children,
    isOpen,
    onClose,
    onSubmit,
}) {
    return (
        <div className={`popup ${name}-popup ${isOpen && "popup_opened"}`}>
            <div className="popup__container">
                <form className="popup__form" name={name} onSubmit={onSubmit}>
                    <button
                        className="popup__exit"
                        type="button"
                        onClick={onClose}></button>
                    <h2 className="popup__form-title">{title}</h2>
                    {children}
                    <button className="popup__button" type="submit">
                        {submitButton}
                    </button>
                </form>
            </div>
        </div>
    );
}
export default PopupWithForm;
