import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import store from "./Store";
import "./App.css";
import { getCurrentUserThunk } from "./Store/slices/currentUserSlice";
import { getFeedSliceThunk } from "./Store/slices/getFeedSlice";


import Auth from "./Pages/Auth";
import Application from "./Pages/App";

import { confirmIsAuth } from "./Store/slices/currentUserSlice";
// import { getCurrentUserThunk } from "./Store/slices/currentUserSlice";

function App() {

    const rememberUser = useSelector(state => state.getCurrentUser.rememberUser);
    const isAuth = useSelector((state) => state.getCurrentUser.isAuth);



    return isAuth ? <Application /> : <Auth />;
}

export default App;
