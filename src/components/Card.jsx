function Card({ card, onCardClick }) {
    return (
        <template id="photoTemplate">
            <li className="photo__element">
                <img
                    className="photo__image"
                    src={card.link}
                    alt={card.name}
                    onClick={() =>
                        onCardClick({ link: card.link, name: card.name })
                    }
                />
                <button className="photo__delete" type="button"></button>
                <div className="photo__signature">
                    <h2 className="photo__name">{card.name}</h2>
                    <div className="photo__like-container">
                        <button className="photo__like" type="button"></button>
                        <span className="photo__like-number"></span>
                    </div>
                </div>
            </li>
        </template>
    );
}
export default Card;
