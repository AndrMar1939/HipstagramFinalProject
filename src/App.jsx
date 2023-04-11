import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import store from "./Store";
import "./App.css";



import Auth from "./Pages/Auth";
import Application from "./Pages/App";

function App() {
    const isAuth = useSelector((state) => state.getCurrentUser.isAuth);
    return isAuth ? <Application /> : <Auth />;
}

export default App;
