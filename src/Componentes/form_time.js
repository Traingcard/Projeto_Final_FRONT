import React, {Component} from 'react';
import '../App.css'; 
import '../Styles/login.css'
import {withRouter} from '../Shared/withRouter';

class Form_Time extends React.Component{
    constructor(props){
        super(props);

        
        var elemento = null;

        if(this.props.location.pathname!="/escalas/add")
        {
            const {id} = this.props.params;
            elemento = this.props.escalas.find(data=>{return data._id == id}); 
        }

        this.state={
            escala:{
                num_user:elemento!=null?elemento.num_user:null,
                data:elemento!=null?elemento.data:null,
                tempo:elemento!=null?elemento.tempo:null,
                disponibilidade:elemento!=null?elemento.tempo:null,
            },
            isEdit: elemento!=null
        }
    }

    add_time = (e) =>{
        var data= this.state.escala;
        data[e.target.name] = e.target.value; 
        this.setState({escala:data});
    }

    render(){
        var radio = null;
        console.log(this.state.escala.add_time) 
        if(this.state.escala.add_time==true){
            radio =  <input type="checkbox" name="disponibilidade" value="true" onClick={(e) => this.add_time(e)} checked/>
        }else{
            radio =  <input type="checkbox" name="disponibilidade" value="false" onClick={(e) => this.add_time(e)}/>
        }
        return(
            <div>
            <form onSubmit={this.state.isEdit==true?(e)=>this.props.atualizar(e,this.state.escala):(e) => this.props.add_escala(e,this.state.escala)}>
                <input type="text"  name="num_user" value={this.state.escala.num_user} onChange={(e) => this.add_time(e)}/>
                <input type="date"  name="data" value={this.state.escala.data} onChange={(e) => this.add_time(e)}/>
                <input type="text"  name="tempo" value={this.state.escala.tempo} onChange={(e) => this.add_time(e)}/>
                {radio}
                <input type="submit" value={this.state.isEdit?'Editar':'Adicionar'}></input>
            </form>
        </div>
            )
        }
    }
export default withRouter(Form_Time);