import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom'
import {Home} from './home/Home'
export const Header = () => {
    return (
        <header className="header">
                <p className="title">
                    <Link to ="/homePage" style={{ textDecoration: 'none', color: 'inherit'}}> TRAVELPLANNER </Link>
                    <Routes>
                        <Route path="/homePage">{Home}</Route>
                    </Routes>
                </p>
        </header>
    )
}