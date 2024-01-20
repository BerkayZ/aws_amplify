import React from "react";
import "../assets/css/Header.css";


const Header = ({onAddAction}) => (
    <div className="header-wrapper">
        <h1>AWS Amplify</h1>
        <button className="button-primary" onClick={onAddAction}>Add product</button>
    </div>
);

export default Header;
