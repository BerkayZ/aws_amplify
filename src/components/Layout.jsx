import React from 'react';
import '../assets/css/Layout.css';


const Layout = ({ children }) => (
    <div className="layout-wrapper">
        {children}
    </div>
);

export default Layout;
