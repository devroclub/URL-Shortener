import React from 'react';
import logo from '../logo.png';
import './App.css';
import {Route, BrowserRouter} from "react-router-dom";
import Home from "./Home";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import Stats from "./Stats";
import About from "./About";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <nav className="navbar navbar-expand-md navbar-light">
                    <div className="container">
                        <a className="navbar-brand" href="/">
                            <img height="40px" src={logo} alt="Password Generator Logo"/>
                        </a>

                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <a className="nav-link" href="/about">ABOUT</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" target="_blank"
                                       href="https://devrolabs.com/products-landing-page">OTHER PRODUCTS</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" target="_blank" href="https://devrolabs.com/">COMPANY</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <Route exact={true} path='/' render={(props) => (
                    <Home {...props} />
                )}/>
                <Route exact={true} path='/about' render={(props) => (
                    <About {...props} />
                )}/>
                <Route exact={true} path='/stats' render={(props) => (
                    <Stats {...props} />
                )}/>
                <div className="footer-bottom">
                    <span className="text-center">© 2019 URL Shortener | <a className="github"
                                                                                 href="https://github.com/devroclub/URL-Shortener"
                                                                                 target="_blank">Managed on GitHub</a></span>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
