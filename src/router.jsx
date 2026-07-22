import { createBrowserRouter, createHashRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import About from "./pages/About";
import ErrorPage from "./pages/ErrorPage";
import PokemonDetailsPage from "./pages/PokemonDetailsPage";
import LoginPage from "./pages/LoginPage";

const createRouter = import.meta.env.PROD ? createHashRouter : createBrowserRouter;

const router = createRouter(
    [
        {
            path:'/',
            element:<App/>,
            errorElement: <ErrorPage/>,
            children:[
                {
                    index:true,
                    element: <HomePage />
                },
                {
                    path:"about",
                    element:<About/>
                },
                {
                    path:"pokemon/:id",
                    element: <PokemonDetailsPage/>   
                },
                {
                    path: "login",
                    element: <LoginPage/>
                },
                {
                    path:'*',
                    element: <NotFoundPage/>
                }
            ]
        }
    ]
)

export default router;