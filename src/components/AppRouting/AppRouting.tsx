import { createBrowserRouter } from "react-router-dom";
import FeedPage from "../../pages/FeedPage/FeedPage";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";
import AuthLayout from "../Layouts/AuthLayout";
import MainLayout from "../Layouts/MainLayout";
import Login from "../../pages/AuthPage/Login/Login";
import Register from "../../pages/AuthPage/Register/Register";
import NotificationPage from "../../pages/NotificationPage/NotificationPage";
import ProfilePage from "../../pages/ProfilePage/ProfilePage";
import ProtectedAuthRouting from "./ProtectedAuthRouting";
import ProtectedLogRouting from "./ProtectedLogRouting";
import PostDetails from "../../pages/PostDetailsPage/PostDetailsPage";
import UsersProfileInfo from "../profile/UsersProfileInfo/UsersProfileInfo";
import SettingsPage from "../../pages/SettingsPage/SettingsPage";

export const router = createBrowserRouter([
    {
        element: <ProtectedAuthRouting />,
        children: [
            {
                path: '',
                element: <MainLayout />,
                children: [
                    {
                        path: '',
                        element: <FeedPage />,

                    },
                    {
                        path: 'profile',
                        element: <ProfilePage />
                    },
                    {
                        path: 'notification',
                        element: <NotificationPage />
                    },
                    {

                        path: 'posts/:postId',
                        element: <PostDetails />

                    },
                    {
                        path: 'profile/:userId',
                        element: <UsersProfileInfo />
                    },
                    {
                        path: "settings",
                        element: <SettingsPage />
                    },
                    {
                        path: '*',
                        element: <NotFoundPage />
                    }
                ]
            }
        ]
    },

    {
        element: <ProtectedLogRouting />,
        children: [
            {
                path: 'auth/',
                element: <AuthLayout />,
                children: [
                    {
                        path: 'login',
                        element: <Login />
                    },
                    {
                        path: 'register',
                        element: <Register />
                    },
                    {
                        path: '*',
                        element: <NotFoundPage />
                    }
                ]
            }
        ]
    },
    {
        path: '*',
        element: <NotFoundPage />
    }

],{basename:"/Route-Social-App"})