import React, {Component} from 'react';
import Signout_logo  from '../assets/images/logo.svg';

class Header extends Component {
    render() {
        return (
            <header className="App-header">

                <p className="title">
                    Travel Planner
                </p>

                <img src={Signout_logo} className="Signout-logo" alt="logo" />
            </header>
        );
    }
}
export default Header;

