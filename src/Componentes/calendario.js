import React from 'react';
import '../App.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { postEvents, deleteEvents, editEvents, getEventsbyId, Indesponivel } from '../Shared/calendario';
import '../Styles/Calendario.css';
import { Navigate } from 'react-router-dom';
import { Funcionarios } from '../Shared/funcionarios';
import  Menulateral  from './menu';


export default class Calendario extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            eventsList: [],
            event: null,
            num_user: this.props.user_logated.num_user,
            funcionarios: this.props.funcionarios
        }
    }
    render() {
        if (Object.keys(this.props.user_logated).length < 1) {
            return (<Navigate to="/login" />);
        }
        else {
            return (
                <section>
                    <div class="menu">
                        <Menulateral updateUser={this.props.updateUser}  />
                    </div>
                    <div className='demo-app'>
                        <div className='demo-app-main'>
                            <select id="funcionarios_select" onChange={(e) => this.updateCalendar(e)} >
                                <option value=""> Todos </option>
                                {this.props.funcionarios.length > 0 && this.props.funcionarios.map((element, index) => {
                                    return <option selected={element.num_user == this.state.num_user} value={element.num_user}> {element.num_user} : {element.nome_user} </option>
                                })}
                            </select>

                            <div id="fundo">
                                {
                                    !this.props.isLoading &&
                                    <FullCalendar
                                        locale={'pt'}
                                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                                        headerToolbar={{
                                            left: 'prev,next today',
                                            center: 'title',
                                            right: 'dayGridMonth,timeGridWeek,timeGridDay'
                                        }}
                                        initialView='timeGridWeek'
                                        allDaySlot={false}
                                        editable={this.props.user_logated.is_admin == true ? true : false}
                                        selectable={this.props.user_logated.is_admin == true ? true : false}
                                        selectMirror={true}
                                        dayMaxEvents={false}
                                        eventColor={'#06D6A0'}
                                        weekends={true}
                                        initialEvents={this.state.eventsList} // alternatively, use the `events` setting to fetch from a feed
                                        select={this.props.user_logated.is_admin == true ? this.handleDateSelect : null}
                                        eventContent={renderEventContent} // custom render function
                                        eventClick={this.handleEventClick}
                                        eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
                                        eventChange={this.props.user_logated.is_admin == true ? this.handlerEvent : null}
                                    />
                                }


                            </div>
                        </div>
                    </div>
                </section>
            )
        }
    }

    /*-----------------------Calculo das Horas  -------------------*/
    checkHours = (start, end) => {
        var diff = end.valueOf() - start.valueOf();
        var diffInHours = diff / 1000 / 60 / 60; // Convert milliseconds to hours
        return (diffInHours > 13);
    }

    /*-----------------------Edita o evento -------------------*/
    handlerEvent = (event) => {

        const { id, title, start, end, allDay } = event.event;

        if (this.checkHours(start, end)) {
            window.alert("O funcionário não pode trabalhar mais de 13 Horas");
            event.revert();
            return;
        }

        editEvents({
            id,
            title,
            start,
            end,
            allDay
        }).then((result) => {
            if (!result.success) {
                throw result.message;
            }
        }).catch((err) => {
            this.state.event.revert();
        })

    }


    /*-------------- Adicionar Escala   ----------------------*/
    handleDateSelect = (selectInfo) => {
        let calendarApi = selectInfo.view.calendar
        calendarApi.unselect()

        if (this.checkHours(selectInfo.start, selectInfo.end)) {
            window.alert("O funcionário não pode trabalhar mais de 13 Horas");
            return;
        }

        let title = this.state.num_user

        selectInfo.title = title;

        postEvents(selectInfo).then((result) => {
            if (!result.success) {
                throw result.message;
            }
            calendarApi.addEvent({
                id: result.message._id,
                title,
                start: selectInfo.startStr,
                end: selectInfo.endStr,
                allDay: selectInfo.allDay
            });
        }).catch((err) => {
            console.log(err);
        });

    }

    /*-------------- Atuializa um evento / elimina  ----------------------*/
    handleEventClick = (clickInfo) => {

        if (this.props.user_logated.is_admin == true) {
            if (window.confirm(`Tens a certeza que queres remover este evento '${clickInfo.event.title}'?`)) {
                // Remove da base de dados com o id: clickInfo.id

                const id = clickInfo.event.id;
                console.log(clickInfo.event.id)
                deleteEvents(id).then((result) => {
                    if (result.success) {
                        clickInfo.event.remove();
                    }
                })
            }
        } else {
            if (window.confirm(`Tens a certeza que não poderás estar disponivel no dia '${clickInfo.event.start}'?`)) {
                // Remove da base de dados com o id: clickInfo.id
                const id = clickInfo.event.id;
                Indesponivel(id).then((result) => {
                    if (result.success) {
                        window.alert('O seu aviso de indisponibilidade foi enviado');
                        this.props.updateLoading(true);
                        this.getEvents(this.state.num_user);
                    }
                })

            }
        }
    }


    /*-------------- Atualiza a lista de eventos  ----------------------*/
    handleEvents = (events) => {
        this.setState({
            eventsList: events
        })
    }

    /*-------------- Coloca os valores todos formatados  ----------------------*/
    formalizeData = (data) => {
        var formalized = [];
        try {
            data.forEach((element, index) => {
                const { _id, title, start, end, allDay, disponibilidade } = element;
                var startDate = new Date(start).toISOString();
                var endDate = new Date(end).toISOString();
                formalized.push({
                    id: _id,
                    title,
                    start: startDate,
                    end: endDate,
                    allDay,
                    disponibilidade,
                    color: disponibilidade ? '#06D6A0' : '#9D0208'
                });
            });
        } catch (error) {
            console.log(error);
        }
        return formalized;
    }

    /*---------------ATUALIZAR CALENDÁRIO COM SELECT---------------------*/

    updateCalendar = (e) => {

        this.props.updateLoading(true);
        this.setState({
            funcionarios: this.props.funcionarios
        })
        var num_user = e.target.value;
        this.setState({
            num_user
        })
        this.getEvents(num_user);
    }

    /*-----------------BUSCAR AS ESCALAS POR ID ---------------*/
    getEvents = (id) => {
        getEventsbyId(id).then((result) => {
            if (!result.success) {
                throw result.message;
            }
            let data = this.formalizeData(result.message);
            this.handleEvents(data);
            this.setState({
                num_user: this.state.num_user
            });
            this.props.updateLoading(false);
        }).catch(() => {
            this.props.updateLoading(false);
        })
    }


    componentDidMount() {
        if (!this.props.isLoading) {
            this.props.updateLoading(true);
            // buscarFuncionarios
            Funcionarios().then((result) => {
                this.props.updateFuncionarios(result.message);
                this.getEvents(this.state.num_user);
            }).catch((error) => {
                this.props.updateLoading(false);
            })
        }
    }
}




function renderEventContent(eventInfo) {

    return (
        <div id="caixa">
            <p align="center">
                <p> <b>{eventInfo.timeText}</b> </p>
                <b>{eventInfo.event.title}</b>
            </p>
        </div>

    )
}


