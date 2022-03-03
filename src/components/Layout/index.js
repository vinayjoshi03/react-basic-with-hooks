import React from 'react'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import HeaderComponent from './Header';
import FooterComponent from './Footer';

//const bootstrap = require('bootstrap');
const Layout = ({children}) => {
    console.log(children);
    //const SimpleHOC = AuxilaryComponent(children);
    return (
        <div className={"container-md"}>
            <HeaderComponent />
           
                {children}
            
            <FooterComponent />
        </div>
    )
}

export default Layout;