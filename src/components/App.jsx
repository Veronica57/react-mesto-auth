import "../index.css";
import { useCallback, useEffect, useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { CurrentUserContext } from "../context/CurrentUserContext";
import api from "../utils/Api";
import auth from "../utils/Auth";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import PopupWithForm from "./PopupWithForm";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
//new
import InfoToolTip from "./InfoToolTip";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";

function App() {
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false); //user profile
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false); //card adding
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false); //avatar updating
    const [isInfoToolTipOpen, setInfoToolTipOpen] = useState(false);
    const [isInfoToolTipMessage, setInfoToolTipMessage] = useState("");
    const [selectedCard, setSelectedCard] = useState(null); //selected card
    const [currentUser, setCurrentUser] = useState({}); // user
    const [cards, setCards] = useState([]); //cards
    const [loggedIn, setLoggedIn] = useState(false); //login
    const [isRegistrationSuccess, setRegistrationSuccess] = useState(false);
    const [email, setEmail] = useState(""); //email
    const [isLoading, setIsLoading] = useState(false); //loading
    // Delete popup
    const [isDeletePopupOpen, setDeletePopupOpen] = useState(false); // delete popup
    const [deletedCard, setDeletedCard] = useState(null); //card deleting

    //navigate
    const navigate = useNavigate();

    //close all popups
    const closeAllPopups = useCallback(() => {
        setEditAvatarPopupOpen(false);
        setAddPlacePopupOpen(false);
        setEditProfilePopupOpen(false);
        setSelectedCard(null);
        setDeletePopupOpen(false);
        setInfoToolTipOpen(false);
    }, []);

    //loggedIn === true get data
    useEffect(() => {
        if (loggedIn) {
            api.getInfo()
                .then((info) => setCurrentUser(info))
                .catch((error) => console.error(error));
            api.getCards()
                .then((cards) => setCards(cards))
                .catch((error) => console.error(error));
        }
    }, [loggedIn]);

    //token validation
    useEffect(() => {
        const validateToken = async () => {
            const token = localStorage.getItem("jwt");
            if (token) {
                try {
                    const { data } = await auth.getToken(token);
                    if (data) {
                        setLoggedIn(true);
                        setEmail(data.email);
                        navigate("/", { replace: true });
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        };
        validateToken();
    }, [navigate]);

    //registration
    async function handleRegisterSubmit(email, password) {
        try {
            await auth.register(email, password);
            navigate("/signin", { replace: true });
            setRegistrationSuccess(true);
            handleSignUp("Вы успешно зарегистрировались!");
        } catch (error) {
            console.error(error);
            setRegistrationSuccess(false);
            handleSignUp("Что-то пошло не так! Попробуйте еще раз.");
        }
    }

    //login
    async function handleLoginSubmit(email, password) {
        try {
            const data = await auth.authorize(email, password);
            if (data.token) {
                localStorage.setItem("jwt", data.token);
                setLoggedIn(true);
                setEmail(email);
                navigate("/", { replace: true });
            }
        } catch (error) {
            setRegistrationSuccess(false);
            handleSignUp("Что-то пошло не так! Попробуйте еще раз.");
            console.error(error);
        }
    }

    //sign out
    const handleSignOut = () => {
        localStorage.removeItem("jwt");
        setEmail("");
        setLoggedIn(false);
        navigate("/signin", { replace: true });
    };

    //function for showing mesage during the registration
    const handleSignUp = (message) => {
        setInfoToolTipMessage(message);
        setInfoToolTipOpen(true);
    };

    // ******************************************
    // user data updating
    const handleUpdateUser = (data) => {
        setIsLoading(true);
        api.setInfo(data)
            .then((info) => setCurrentUser(info))
            .then(() => closeAllPopups())
            .catch((error) => console.error(error))
            .finally(() => setIsLoading(false));
    };

    //avatar updating
    const handleUpdateAvatar = (data) => {
        setIsLoading(true);
        api.setAvatar(data)
            .then((info) => setCurrentUser(info))
            .then(() => closeAllPopups())
            .catch((error) => console.error(error))
            .finally(() => setIsLoading(false));
    };

    //new card loading
    const handleAddPlaceSubmit = (data) => {
        setIsLoading(true);
        api.addNewCard(data)
            .then((newCard) => {
                setCards([newCard, ...cards]);
            })
            .then(() => closeAllPopups())
            .catch((error) => console.error(error))
            .finally(() => setIsLoading(false));
    };

    //like status updating
    const handleCardLike = (card) => {
        const isLiked = card.likes.some((like) => like._id === currentUser._id);
        if (!isLiked) {
            api.addLike(card._id)
                .then((like) =>
                    setCards((cards) =>
                        cards.map((currentCard) =>
                            currentCard._id === card._id ? like : currentCard
                        )
                    )
                )
                .catch((error) => console.error(error));
        } else {
            api.deleteLike(card._id)
                .then((like) =>
                    setCards((cards) =>
                        cards.map((currentCard) =>
                            currentCard._id === card._id ? like : currentCard
                        )
                    )
                )
                .catch((error) => console.error(error));
        }
    };

    // delete popup open
    const handleDeleteClick = (card) => {
        setDeletePopupOpen(true);
        setDeletedCard(card);
    };

    // card deleting
    const handleCardDelete = (event) => {
        event.preventDefault();
        setIsLoading(true);
        api.deleteCard(deletedCard._id)
            .then(() => setCards(cards.filter((item) => item !== deletedCard)))
            .then(() => closeAllPopups())
            .catch((error) => console.error(error))
            .finally(() => setIsLoading(false));
    };

    // const handleCardDelete = (event) => {
    //     event.preventDefault();
    //     setIsLoading(true);
    //     api.deleteCard(deletedCard._id).then(() =>
    //         api
    //             .getCards()
    //             .then((dataCards) => {
    //                 setCards(dataCards);
    //             })
    //             .then(() => closeAllPopups())
    //             .catch((error) => console.error(error))
    //             .finally(() => setIsLoading(false))
    //     );
    // };

    //edit avatar open
    const handleEditAvatarClick = () => {
        setEditAvatarPopupOpen(true);
    };

    //edit profile popup
    const handleEditProfileClick = () => {
        setEditProfilePopupOpen(true);
    };

    //add place popup
    const handleAddPlaceClick = () => {
        setAddPlacePopupOpen(true);
    };

    //card open popup
    const handleCardClick = (card) => {
        setSelectedCard(card);
    };

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header
                    // loggedIn={loggedIn}
                    email={email}
                    onSignOut={handleSignOut}
                />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute loggedIn={loggedIn}>
                                <Main
                                    onEditAvatar={handleEditAvatarClick}
                                    onEditProfile={handleEditProfileClick}
                                    onAddPlace={handleAddPlaceClick}
                                    onCardClick={handleCardClick}
                                    onCardLike={handleCardLike}
                                    onCardDelete={handleDeleteClick}
                                    cards={cards}
                                />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/signin"
                        element={<Login onLogin={handleLoginSubmit} />}
                    />
                    <Route
                        path="/signup"
                        element={<Register onRegister={handleRegisterSubmit} />}
                    />
                    <Route path="*" element={<Navigate to="/signin" />} />
                </Routes>
                {/* Info tooltip */}
                <InfoToolTip
                    name="infoToolTip"
                    isOpen={isInfoToolTipOpen}
                    message={isInfoToolTipMessage}
                    isSuccess={isRegistrationSuccess}
                    onClose={closeAllPopups}
                />
                <Footer />
                {/* Edit Profile */}
                <EditProfilePopup
                    isLoading={isLoading}
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                />
                {/* Add Photo */}
                <AddPlacePopup
                    isLoading={isLoading}
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
                />
                {/* Add User Avatar */}
                <EditAvatarPopup
                    isLoading={isLoading}
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                />
                {/* Confirm Delete Photo */}
                <PopupWithForm
                    title={"Вы уверены?"}
                    name={"confirmDelete"}
                    submitButton={isLoading ? "Удаление..." : "Да"}
                    isOpen={isDeletePopupOpen}
                    onClose={closeAllPopups}
                    onSubmit={handleCardDelete}
                    card={deletedCard}
                />
                <ImagePopup card={selectedCard} onClose={closeAllPopups} />
            </div>
        </CurrentUserContext.Provider>
    );
}
export default App;
