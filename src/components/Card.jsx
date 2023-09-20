import { CurrentUserContext } from "../context/CurrentUserContext";
import { useContext } from "react";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
    const user = useContext(CurrentUserContext);

    const handleLikeClick = () => {
        onCardLike(card);
    };

    const handleDeleteClick = () => {
        onCardDelete(card);
    };

    const isOwner = card.owner._id === user._id;
    const isLiked = card.likes.some((like) => like._id === user._id);
    const cardLikeButtonClassName = `photo__like ${
        isLiked ? "photo__like_active" : ""
    }`;
    return (
        <li className="photo__element">
            <img
                className="photo__image"
                src={card.link}
                alt={card.name}
                onClick={() =>
                    onCardClick({ link: card.link, name: card.name })
                }
            />
            {isOwner && (
                <button
                    className="photo__delete"
                    type="button"
                    onClick={handleDeleteClick}></button>
            )}
            <div className="photo__signature">
                <h2 className="photo__name">{card.name}</h2>
                <div className="photo__like-container">
                    <button
                        className={cardLikeButtonClassName}
                        type="button"
                        onClick={handleLikeClick}></button>
                    <span className="photo__like-number">
                        {card.likes.length}
                    </span>
                </div>
            </div>
        </li>
    );
}
export default Card;
