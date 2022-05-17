import React, {Component} from 'react';
import '../App.css'; 
import '../Styles/form-user.css'
import {withRouter} from '../Shared/withRouter';
import Menulateral from './menu';


class Form_user extends React.Component{
    constructor(props){
        super(props);

        var elemento = null;

        if(this.props.location.pathname!="/user/add")
        {
            const {id} = this.props.params;
            elemento = this.props.funcionarios.find(data=>{return data._id == id}); 
        }


        this.state={
            user:{
                _id:elemento!=null?elemento._id:null,
                num_user:elemento!=null?elemento.num_user:null,
                nome_user:elemento!=null?elemento.nome_user:null,
                password_user:elemento!=null?elemento.password_user:null,
                morada_user:elemento!=null?elemento.morada_user:null,
                data_nascimento_user:elemento!=null?elemento.data_nascimento_user:null,
                tele_user:elemento!=null?elemento.tele_user:null,
                email_user:elemento!=null?elemento.email_user:null,
                is_admin:elemento!=null?elemento.is_admin:false
            },
            isEdit: elemento!=null
        }
    }

    add_user = (e) =>{
        var data= this.state.user;
        data[e.target.name] = e.target.value; 
        this.setState({user:data});
        console.log(this.state.user)
    }

    
    render(){
        return(
            <div id="total">
                <div class="menu">
                        <Menulateral updateUser={this.props.updateUser}  />
                </div>
                <div class="div-form">
                    <form onSubmit={this.state.isEdit==true?(e)=>this.props.edit_userbd(e,this.state.user):(e) => this.props.add_userbd(e,this.state.user)}>
                        
                        <h1> Adicionar User </h1>
                        
                        <table id="tab-form">
                            <tr>
                                <td class="left-form">
                                    Numero:
                                </td>
                                <td>
                                <input type="text"  class="input" name="num_user" value={this.state.user.num_user} onChange={(e) => this.add_user(e)} placeholder='Numero'/>
                                </td>
                            </tr>
                            <tr>
                                <td class="left-form">
                                    Nome:
                                </td>
                                <td>
                                    <input type="text"  class="input" name="nome_user" value={this.state.user.nome_user} onChange={(e) => this.add_user(e)} placeholder='Nome'/>
                                </td>
                            </tr>
                            <tr>
                                <td class="left-form">
                                    Password:
                                </td>
                                <td>
                                    <input type="password" class="input" name="password_user" value={this.state.user.password_user} onChange={(e) => this.add_user(e)} placeholder='Password'  />
                                </td>
                            </tr>
                            <tr>
                                <td class="left-form">
                                    Morada:
                                </td>
                                <td>
                                    <input type="text"  class="input" name="morada_user" value={this.state.user.morada_user} onChange={(e) => this.add_user(e)} placeholder='Morada' />
                                </td>
                            </tr>
                            <tr>
                                <td class="left-form">
                                    Data:
                                </td>
                                <td>
                                    <input type="date"  class="input" name="data_nascimento_user" value={this.state.user.data_nascimento_user} onChange={(e) => this.add_user(e)} placeholder='Data Nascimento'/>
                                </td>
                            </tr>
                            <tr>
                                <td class="left-form">
                                    Telemovel:
                                </td>
                                <td>
                                    <input type="text"  class="input" name="tele_user" value={this.state.user.tele_user} onChange={(e) => this.add_user(e)} placeholder='Telemovel'/>
                                </td>
                            </tr>
                            <tr>
                                <td class="left-form">
                                    Email:      
                                </td>

                                <td>
                                    <input type="email"  class="input" name="email_user" value={this.state.user.email_user} onChange={(e) => this.add_user(e)} placeholder='Email' />
                                </td>
                            </tr>
                            <tr>
                                <td class="left-form">
                                    Administrador: <input type="radio" name="is_admin" value="true" onClick={(e) => this.add_user(e)}/>
                                </td>
                                <td class="left-form">
                                    Funcionário: <input type="radio" name="is_admin" value="false" onClick={(e) => this.add_user(e)}/>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <input type="submit" value={this.state.isEdit!=false?'Editar':'Adicionar'}></input>
                                </td>
                            </tr>
                        </table>   
                    </form>
                </div>
            </div>
            )
        }
    }
export default withRouter(Form_user);