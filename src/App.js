import './App.css';
import sha1 from 'sha1';
import React, { Component } from 'react';
import Login from './Componentes/login';
import Users from './Componentes/users';
import Form_user from './Componentes/form_user';
import Calendario from './Componentes/calendario';
import Dashboard from './Componentes/dashboard';
import Historico from './Componentes/dashboard';
import { withRouter } from './Shared/withRouter';
import { Route, Routes } from 'react-router-dom';
import { getFromStorage } from './utils/utils';
import { verifyToken } from './Shared/api';
import { Funcionarios, Add_Funcionarios, Edit_Funcionarios, Delete_Funcionarios } from './Shared/funcionarios';




class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      funcionarios: [],
      isLoading: true
    }
  }

  render() {
    return (
      <div>
        <div className="App">
          <Routes>
            <Route exact path="/Login" element={<Login updateLoading={this.updateLoading} user={this.state.user} updateUser={this.updateUser}> </Login>} />
            <Route exact path="/" element={<Calendario isLoading={this.state.isLoading} updateFuncionarios={this.updateFuncionarios} updateLoading={this.updateLoading} user_logated={this.state.user} funcionarios={this.state.funcionarios} updateUser={this.updateUser}> </Calendario>} />
            <Route exact path="/user/" element={<Users user_logated={this.state.user} funcionarios={this.state.funcionarios} delete_user={this.delete_user} updateUser={this.updateUser}> </Users>} />
            <Route exact path="/user/add" element={<Form_user add_userbd={this.add_userbd}> </Form_user>} />
            <Route exact path="/user/edit/:id" element={<Form_user funcionarios={this.state.funcionarios} edit_userbd={this.edit_userbd}> </Form_user>} />
            <Route exact path="/dashboard" element={<Dashboard updateUser={this.updateUser}> </Dashboard>} />
            <Route exact path="/historico" element={<Historico updateUser={this.updateUser}> </Historico>} />
          </Routes>
        </div>
      </div>
    )
  }

  updateUser = (data) => {
    this.setState({
      user: data
    });
  }

  updateFuncionarios = (data) => {
    this.setState({
      funcionarios: data
    });
  }

  /* -----------AÇÕES COM OS FUNCIONARIOS ----------*/
  add_userbd = (e, data) => {
    e.preventDefault();

    var password_user_encrypt = sha1(data.password_user);
    data.password_user = password_user_encrypt

    Add_Funcionarios(data).then((result) => {
      console.log(result);
      if (result.success == true) {

        var funcionarios = this.state.funcionarios;
        funcionarios.push(data);
        this.setState({
          funcionarios
        })
        this.props.navigate('/user')
      }

    }).catch((err) => {
      console.log(err);
    })
  }

  edit_userbd = (e, data) => {
    e.preventDefault();

    var password_user_encrypt = sha1(data.password_user);
    data.password_user = password_user_encrypt

    Edit_Funcionarios(data).then((result) => {
      if (result.success) {
        Funcionarios().then((result) => {
          this.setState({
            funcionarios: result.message
          })
          this.props.navigate('/user')
        })
      }
    })
  }

  delete_user = (e, data) => {
    e.preventDefault();

    window.confirm('Tens a certeza que queres remover este Funcionario ?')
    // Remove da base de dados com o id: clickInfo.id
    Delete_Funcionarios(data).then((result) => {
      if (result.sucess) {
        this.setState({
          funcionarios: result.message
        })
        this.props.navigate('/')
      }
    })
  }

  updateLoading = (isLoading) => {
    this.setState({
      isLoading
    });
  }

  componentDidMount() {
    const Token = getFromStorage('Token');
    if (!Token) {
      this.updateUser({});
      return;
    }

    // verify token
    verifyToken(Token).then((result) => {
      if (result.success) {
        this.setState({
          user: result.user,
          isLoading: false
        });
      }
    })
  }
}
export default withRouter(App);

