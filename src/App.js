import React from 'react';
import {useRoutes} from "./routes";
import {BrowserRouter as Router} from 'react-router-dom'
import 'materialize-css'
import {useSelector} from "react-redux";
import NavBar from "./components/NavBar";


function App() {
    const user = useSelector(state => state.user.currentUser)
    const routes = useRoutes(user ? user.isAuthenticated : null)
    return (
        <Router>
            {user && <NavBar />}
            {routes}
        </Router>
    );
}

export default App;
