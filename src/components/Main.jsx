import Card from "./Card";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { useContext } from "react";

function Main({
    cards,
    onEditAvatar,
    onEditProfile,
    onAddPlace,
    onCardClick,
    onCardLike,
    onCardDelete,
}) {
    const user = useContext(CurrentUserContext);
    return (
        <main>
            <section className="profile">
                <button
                    type="button"
                    className="profile__avatar-button"
                    onClick={onEditAvatar}>
                    <img
                        src={user.avatar}
                        alt="Фотография пользователя"
                        className="profile__avatar-image"
                    />
                </button>
                <div className="profile__info">
                    <h1 className="profile__name">{user.name}</h1>
                    <p className="profile__description">{user.about}</p>
                    <button
                        className="profile__edit-button"
                        type="button"
                        onClick={onEditProfile}></button>
                </div>
                <button
                    className="profile__add-button"
                    type="button"
                    onClick={onAddPlace}></button>
            </section>
            <section className="photo">
                <ul className="photo__elements">
                    {cards.map((card) => {
                        return (
                            <Card
                                card={card}
                                onCardClick={onCardClick}
                                key={card._id}
                                onCardLike={onCardLike}
                                onCardDelete={onCardDelete}
                            />
                        );
                    })}
                </ul>
            </section>
        </main>
    );
}
export default Main;
