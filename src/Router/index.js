// add routes here
import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import ErrorPage from "../Components/ErrorPage";
import Loader from "../Components/Loader";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        loader: Loader,
        errorElement: ErrorPage,
    }
]);

export default Router;