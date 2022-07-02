import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom'
import {Home} from './home/Home'
import logo from "./assets/pictures/Logo.png"
export const Header = () => {
    return (
        <header className="header">
                <img src={logo} className="logo" alt="logo" />
                <p className="title">
                    <Link to ="/homePage" style={{ textDecoration: 'none', color: 'inherit'}}> TRIPPLAN </Link>
                    <Routes>
                        <Route path="/homePage">{Home}</Route>
                    </Routes>
                </p>
        </header>
    )
}