import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { removeFromStorage } from "../utils/utils";
import '../Styles/menu.css';


export default class Menulateral extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <div id="col-menu">
               <img src={'/Imagens/logo.webp'} id="logotipo"></img>   
               <button
                    id="nada"
                    onClick={() => {
                        removeFromStorage('Token');
                        this.props.updateUser({});
                    }}>
                    <div>
                        Logout
                    </div>
                </button>        
                <Link id="link" exact to="/">
                    <div class="botao">
                        Calendário
                    </div>
                </Link>
                <Link id="link" exact to="/historico">
                    <div class="botao">
                        Historico
                    </div>
                </Link>
                <Link id="link" exact to="/dashboard">
                    <div class="botao">
                        Dashboard
                    </div>
                </Link>
                <Link id="link" exact to="/user">
                    <div class="botao">
                        Users
                    </div>
                </Link>
            </div>
        );
    }
}
