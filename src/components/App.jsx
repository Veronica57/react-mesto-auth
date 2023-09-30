import "../index.css";
import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../context/CurrentUserContext";
import api from "../utils/Api";
import * as auth from "../utils/Auth";
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
    const [cards, setCards] = useState([]); //cards
    const [currentUser, setCurrentUser] = useState({}); // user
    const [selectedCard, setSelectedCard] = useState(null); //selected card
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false); //user profile
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false); //card adding
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false); //avatar updating
    const [isDeletePopupOpen, setDeletePopupOpen] = useState(false); // delete popup
    const [isLoading, setIsLoading] = useState(false); //loading
    const [deletedCard, setDeletedCard] = useState(); //card deleting
    const [loggedIn, setLoggedIn] = useState(false); //login
    const [email, setEmail] = useState(""); //email
    const [isInfoToolTipSucceed, setInfoToolTipSucceed] = useState({
        isOpen: false,
        isSucceed: false,
    }); //info tool tip

    //close all popups
    const closeAllPopups = () => {
        setEditAvatarPopupOpen(false);
        setAddPlacePopupOpen(false);
        setEditProfilePopupOpen(false);
        setSelectedCard(null);
        setDeletePopupOpen(false);
        setInfoToolTipSucceed({ ...isInfoToolTipSucceed, isOpen: false });
    };

    //user data getting
    useEffect(() => {
        api.getInfo()
            .then((info) => setCurrentUser(info))
            .catch((error) => console.error(error));
    }, []);

    //cards receiving
    useEffect(() => {
        api.getCards()
            .then((cards) => setCards(cards))
            .catch((error) => console.error(error));
    }, []);

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

    // card deleting
    const handleCardDelete = (event) => {
        event.preventDefault();
        setIsLoading(true);
        api.deleteCard(deletedCard._id).then(() =>
            api
                .getCards()
                .then((dataCards) => {
                    setCards(dataCards);
                })
                .then(() => closeAllPopups())
                .catch((error) => console.error(error))
                .finally(() => setIsLoading(false))
        );
    };

    // delete popup open
    const handleDeleteClick = (card) => {
        setDeletePopupOpen(true);
        setDeletedCard(card);
    };

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

    //navigate
    const navigate = useNavigate();

    const checkAuthorization = (token) => {
        auth.getToken(token)
            .then((response) => {
                if (response.data) {
                    setEmail(response.data.email);
                    setLoggedIn(true);
                    navigate("/");
                }
            })
            .catch((error) => console.error(error));
    };

    const checkToken = () => {
        const token = localStorage.getItem("jwt");
        if (token) {
            checkAuthorization(token);
        } else {
            navigate("/signin");
        }
    };

    //checking token
    useEffect(() => {
        checkToken();
    }, []);

    //register
    const handleRegisterSubmit = (password, email) => {
        auth.register(password, email)
            .then((res) => {
                if (res) {
                    navigate("/signin");
                    setInfoToolTipSucceed({
                        isOpen: true,
                        isSucceed: true,
                    });
                }
            })
            .catch((error) => {
                console.error(error);
                setInfoToolTipSucceed({
                    isOpen: true,
                    isSucceed: false,
                });
            });
    };

    //login
    const handleLoginSubmit = (password, email) => {
        auth.authorize(password, email)
            .then((response) => {
                if (response) {
                    localStorage.setItem("jwt", response.token);
                    checkAuthorization(response.token);
                }
            })
            .catch((error) => {
                console.error(error);
                setInfoToolTipSucceed({
                    isOpen: true,
                    isSucceed: false,
                });
            });
    };

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

    //sign out
    const signOut = () => {
        localStorage.removeItem("jwt");
        setEmail("");
        setLoggedIn(false);
    };

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div>
                <div className="page">
                    <Header
                        loggedIn={loggedIn}
                        email={email}
                        onSignOut={signOut}
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
                            element={
                                <Login handleLoginSubmit={handleLoginSubmit} />
                            }
                        />
                        <Route
                            path="/signup"
                            element={
                                <Register
                                    handleRegisterSubmit={handleRegisterSubmit}
                                />
                            }
                        />
                    </Routes>
                    {/* Info tooltip */}
                    <InfoToolTip
                        isSucceed={isInfoToolTipSucceed.isSucceed}
                        isOpen={isInfoToolTipSucceed.isOpen}
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
            </div>
        </CurrentUserContext.Provider>
    );
}
export default App;
