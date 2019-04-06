import React from 'react';
import LoginForm from "../LoginForm";
import {connect} from "react-redux";
import axios from "axios";
import {setAuthorised, setUnAuth} from "../../actions/login";
import {setPoints} from '../../actions/setPoints'
import './Home.css'
import MediaQuery from 'react-responsive'

class Home extends React.Component{

    constructor(props){
        super(props);
        this.testSession = this.testSession.bind(this);
        this.testSession();
        this.logout = this.logout.bind(this);
    }


    render() {

        var buttonBig = {
            padding: '10px 18px',
            width: '300px',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            height: '60px',
            font: '20pt sans-serif',

        };

        var buttonSmall = {
            padding: '10px 18px',
            width: '100px',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            height: '60px',
            font: '16pt sans-serif',
        };

        if(this.props.isAuthorised) {
            return (
                <div>
                    <MediaQuery minDeviceWidth={1176}>
                    <div>
                        <h1>Вы уже вошли в систему</h1>
                        <div className="buttonHolder">
                        <button onClick={this.logout} style={buttonBig}>Выйти</button>
                        </div>
                    </div>
                    </MediaQuery>

                    <MediaQuery minDeviceWidth={829} maxDeviceWidth={1175}>
                        <div>
                            <h2>Вы уже вошли в систему</h2>
                            <div className="buttonHolder">
                            <button onClick={this.logout} style={buttonBig}>Выйти</button>
                            </div>
                        </div>
                    </MediaQuery>

                    <MediaQuery maxDeviceWidth={828}>
                        <div>
                            <h4>Вы уже вошли в систему</h4>
                            <div className="buttonHolder">
                            <button onClick={this.logout} style={buttonSmall}>Выйти</button>
                            </div>
                        </div>
                    </MediaQuery>
                </div>
            );

        }
        else {
            return (
                <div>
                    <MediaQuery minDeviceWidth={1176}>
                        <div>
                            <h1>Homepage</h1>
                            <p className='info'>
                                Лабораторная работа №4.<br/>
                                Вариант: 18006<br/>
                                Выполнили: Вербовой Александр, Базарова Анна<br/>
                                Группа: Р3200<br/>
                            </p>
                            <LoginForm history={this.history}/>
                        </div>
                    </MediaQuery>

                    <MediaQuery minDeviceWidth={829} maxDeviceWidth={1175}>
                        <div>
                            <h1>Homepage</h1>
                            <p className='info'>
                                Лабораторная работа №4.<br/>
                                Вариант: 18006<br/>
                                Выполнили: Вербовой Александр, Базарова Анна<br/>
                                Группа: Р3200<br/>
                            </p>
                            <LoginForm history={this.history}/>
                        </div>
                    </MediaQuery>


                    <MediaQuery maxDeviceWidth={828}>
                        <div>
                            <h1>Homepage</h1>
                            <p className='info'>
                                Лабораторная работа №4.<br/>
                                Вариант: 18006<br/>
                                Выполнили: Вербовой Александр, Базарова Анна<br/>
                                Группа: Р3200<br/>
                            </p>
                            <LoginForm history={this.history}/>
                        </div>
                    </MediaQuery>
                </div>




            );
        }
    }


    logout(){
        axios.get('http://localhost:8080/logout',{withCredentials:true})
            .catch(res => {
                this.props.setUnAuth();
                this.props.setPoints(null);
            });
    }

    testSession() {
        axios.get('http://localhost:8080/results/get', {withCredentials: true})
            .then(res => {
                if(res.status !== 401) {
                    this.props.setAuthorised();
                    this.props.setPoints(res.data);
                    return true;
                }
                else return false;
            }).catch(err => {
            this.props.setUnAuth();
            this.props.setPoints(null);
            return false;
        });
    }
}

function mapStateToProps(state){
    return { isAuthorised: state.loginReducer.isAuthorised, points: state.pointsReducer.points}
}


function mapDispatchToProps(dispatch){
    return { setAuthorised: () => {
            dispatch(setAuthorised());
        },
        setUnAuth: () => {
            dispatch(setUnAuth());
        },
        setPoints: (pointsData) => {
            dispatch(setPoints(pointsData));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);