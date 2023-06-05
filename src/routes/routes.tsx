import ProtectedPage from "../components/ProtectedPage/ProtectedPage";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

const routes = [
    {
        index: true,
        element: (
            <ProtectedPage children={<Home/>} />
        ),
        state: "home"
    },
    {
        path: "/login",
        element: <Login/>,
        state: "login"
    },
    {
        path: "/register",
        element: <Register/>,
        state: "register"
    },
];

export default routes;