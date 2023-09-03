function PopupWithForm({
    title,
    name,
    titleButton,
    children,
    isOpen,
    onClose,
}) {
    return (
        <div className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}>
            <div className="popup__container">
                <form className="popup__form" name={name} noValidate="">
                    <button
                        className="popup__exit"
                        type="button"
                        onClick={onClose}></button>
                    <h2 className="popup__form-title">{title}</h2>
                    {children}
                    <button className="popup__button" type="submit">
                        {titleButton}
                    </button>
                </form>
            </div>
        </div>
    );
}
export default PopupWithForm;
