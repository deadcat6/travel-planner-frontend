import React from "react";
import {HomeSearch} from "./HomeSearch";
import {Footer} from "../Footer"
import {Header} from "../Header"

export const Home = (props) => {
    return (
        <div className = "banner">
            <Header />
            <HomeSearch setCenter={props.setCenter} />
            <div className="bg-image"> </div>
            <Footer />
        </div>
    )
}