import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import '../Styles/login.css'
import sha1 from 'sha1';
import { Logim } from '../Shared/api';
import { Link } from 'react-router-dom';
import { NavLink, Navigate } from 'react-router-dom';
import { setInStorage } from '../utils/utils';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                num_user: "", password_user: "", is_admin: ""
            },
            error: {
                status: false,
                message: ''
            }
        }
    }

    handlertype = (e) => {
        var data = this.state.data;

        if (e.target.type === "password") {
            data[e.target.name] = sha1(e.target.value);
        }
        else {
            const re = /^[0-9\b]+$/;

            if (re.test(e.target.value)) {
                data.num_user = parseInt(e.target.value);
            }
            else {
                data.num_user = ''
            }
        }
        this.setState({ data });
    }

    handlersubmit = (e) => {
        e.preventDefault();

        Logim(this.state.data).then((result) => {
            if (result.success) {
                this.props.updateUser(result.user);
                setInStorage('Token', result.token)
                this.props.updateLoading(false);
                this.setState({
                    error: {
                        status: !result.success,
                        message: result.message
                    }
                })
            }
            else {
                this.setState({
                    error: {
                        status: !result.sucess,
                        message: result.message
                    }
                })
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    render() {
        if (Object.keys(this.props.user).length > 0) {
            return (<Navigate to="/" />);
        } else {
            return (
                <div class="lgn-centro">
                    <div id="imagem">
                    </div>
                    <form id="form">
                        Login:
                        <p id="diminuir">
                            <input name="num_user" value={this.state.data.num_user} class="btn" onChange={(e) => this.handlertype(e)} ></input>
                        </p>

                        Password:
                        <p id="diminuir">
                            <input name="password_user" type="password" class="btn" onChange={(e) => this.handlertype(e)}></input>
                        </p>

                        <p><span class="text-danger"> {this.state.error.message} </span></p>

                        <input class="btn login" type="submit" value="Login" onClick={(e) => this.handlersubmit(e)} ></input>
                    </form>
                </div>

            )
        }
    }
}
export default Login;