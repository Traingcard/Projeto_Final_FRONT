import React, { Component } from 'react';
import '../App.css';
import '../Styles/users.css';
import { Link, Navigate } from 'react-router-dom';
import Menulateral from './menu';




class Users extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        if (Object.keys(this.props.user_logated).length < 1) {
            return (<Navigate to="/login" />);
        }
        return (
            <div>
                <div class="menu">
                    <Menulateral updateUser={this.props.updateUser} />
                </div>
                <div class='container'>

                    <h1> Gerencia de Funcionários</h1>
                        {this.props.user_logated.is_admin == true ? <Link id="btn-adicionar" exact to="/user/add">   <button id="btn-adicionar">Adicionar </button></Link> : ''}
                    <div>
                        <table class="table table-striped" id="tabelamenu">
                            <tr id="header">
                                <td>
                                    Número:
                                </td>
                                <td>
                                    Nome:
                                </td>
                                <td>
                                    Morada:
                                </td>
                                <td>
                                    Data de Nasciento:
                                </td>
                                <td colSpan={3}>
                                    Administrador:
                                </td>
                            </tr>
                            {this.props.funcionarios.map((funcionario, key) => {
                                return (
                                    <tbody>
                                        <tr>
                                            <td>
                                                {funcionario.num_user}
                                            </td>
                                            <td>
                                                {funcionario.nome_user}
                                            </td>
                                            <td>
                                                {funcionario.morada_user}
                                            </td>
                                            <td>
                                                {funcionario.data_nascimento_user}
                                            </td>
                                            <td>
                                                {funcionario.is_admin == true ? <button id="btn-type" > Admin </button> : <button id="btn-type" > Funcionário </button>}
                                            </td>
                                            <td>
                                                {this.props.user_logated.is_admin == true ? <Link id="link" exact to={"/user/edit/" + funcionario._id}><button id="btn-edit" > Editar</button></Link> : ''}
                                            </td>
                                            <td>
                                                {this.props.user_logated.is_admin == true ? <button id="btn-eliminar" onClick={(e) => this.props.delete_user(e, funcionario._id)}> Eliminar </button> : ''}
                                            </td>
                                        </tr>
                                    </tbody>
                                )
                            })}
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}
export default Users;