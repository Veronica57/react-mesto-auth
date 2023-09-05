import Card from "./Card";
import api from "../utils/Api";
import { useEffect, useState } from "react";

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {
    const [userName, setUserName] = useState("");
    const [userDescription, setUserDescription] = useState("");
    const [userAvatar, setUserAvatar] = useState("");
    const [cards, setCards] = useState([]);

    useEffect(() => {
        Promise.all([api.getInfo(), api.getCards()]).then(
            ([dataUser, dataCard]) => {
                setUserName(dataUser.name);
                setUserDescription(dataUser.about);
                setUserAvatar(dataUser.avatar);
                dataCard.forEach((element) => {
                    element.id = dataUser._id;
                });
                setCards(dataCard);
            }
        );
    }, []);

    return (
        <main>
            <section className="profile">
                <button
                    type="button"
                    className="profile__avatar-button"
                    onClick={onEditAvatar}>
                    <img
                        src={userAvatar}
                        alt="Фотография пользователя"
                        className="profile__avatar-image"
                    />
                </button>
                <div className="profile__info">
                    <h1 className="profile__name">{userName}</h1>
                    <p className="profile__description">{userDescription}</p>
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
                                likesNumber={card.likes.length}
                            />
                        );
                    })}
                </ul>
            </section>
        </main>
    );
}
export default Main;
