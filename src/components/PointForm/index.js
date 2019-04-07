import React from 'react';
import "./PointForm.css";
import axios from "axios";
import {setAuthorised, setUnAuth} from "../../actions/login";
import {setPoints} from "../../actions/setPoints";
import {connect} from "react-redux";
import MyCanvas from "../MyCanvas";
import MediaQuery from 'react-responsive'

class PointForm extends React.Component {

    constructor(props) {
        super(props);
        this.state =
            {
                showInv: false,
                x: "",
                y: "",
                r: ""
            };
        this.testSession = this.testSession.bind(this);
        this.pointFromCanvas = this.pointFromCanvas.bind(this);
    }

    testSession() {
        axios.get('http://localhost:8080/web_4_laba/get_hits', {withCredentials: true})
            .then(res => {
                if (res.status !== 401) {
                    this.props.setPoints(res.data);
                    return true;
                } else return false;
            }).catch(err => {
            this.props.setUnAuth();
            return false;
        });
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
        if (!this.validateY() || !this.validateX() || !this.validateR()) this.showInval();
        else this.hideInval();
    }

    showInval() {
        this.setState({
            showInv: true
        })
    };

    hideInval() {
        this.setState({
            showInv: false
        })
    };

    handleSubmit(event) {

        event.preventDefault();
        if (this.validateY()) {
            var params = new URLSearchParams();
            params.append('x', this.state.x);
            params.append('y', this.state.y);
            params.append('r', this.state.r);
            axios.get('http://localhost:8080/web_4_laba/hit', {params, withCredentials: true})
                .then(response => {
                    this.testSession();
                    this.child.updateCanvas(this.state.r);
                });
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.child.updateCanvas(this.state.r);
    }

    pointFromCanvas(x, y, r) {
        this.setState({
            x: x, y: y, r: r
        }, () => {
            this.sbf.dispatchEvent(new Event('submit'))
        });
    }


    validateY() {
        let y = parseFloat(this.state.y);
        return (y >= -3 && y <= 3) || (this.state.y === "");
    }

    validateX() {
        let x = parseFloat(this.state.x);
        return (x >= -3 && x <= 3) || (this.state.x === "");
    }

    validateR() {
        let r = parseFloat(this.state.r);
        return (r > 0 && r <= 3) || (this.state.r === "");
    }

    render() {
        let error;

        var formTable = {
            display: 'inline-block',
            textAlign: 'center',
            verticalAlign: 'center',
            float: 'left'
        };

        var bigX = {
            display: 'inline-block',
            textAlign: 'center',
            float: 'left',
            marginLeft: '0',
        };

        var smallX = {
            display: 'block',
            textAlign: 'right'
        };

        var bigY = {
            display: 'inline-block',
            textAlign: 'center',
        };

        var smallY = {};

        var bigR = {
            display: 'inline-block',
            float: 'center'
        };

        var smallR = {};

        var buttonBig = {
            padding: '10px 18px',
            width: '300px',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            height: '60px',
            font: '20pt sans-serif',

        }

        var buttonSmall = {
            padding: '10px 18px',
            width: '100px',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            height: '60px',
            font: '16pt sans-serif',
        };

        if (!this.validateY() || !this.validateX() || !this.validateR()) {
            error = <p className="Inval" style={{color: 'red'}}>Некорректные данные</p>;
        } else error = <p className="Inval" style={{color: 'red'}}/>;
        return (

            <div>
                <MediaQuery minDeviceWidth={1176}>
                    <form ref={f => this.sbf = f} className="pointForm"
                          style={{marginLeft: '15%', marginRight: '15%', width: '70%'}}
                          onSubmit={this.handleSubmit.bind(this)}>
                        <div style={{height: '150px'}}>
                            <table style={formTable}>
                                <thead>Введите значения</thead>

                                <tbody>
                                <tr>
                                    <label style={bigX}>
                                        Значение X:
                                        <input type="text" className="x" style={{width: '70%'}} value={this.state.x}
                                               onChange={this.handleChange.bind(this)}
                                               placeholder="Значение X от -3 до 3"
                                               name="x" required/>
                                    </label>
                                </tr>

                                <tr>
                                    <label style={bigY}>
                                        Значение Y:
                                        <input type="text" className="y" style={{width: '70%'}} value={this.state.y}
                                               onChange={this.handleChange.bind(this)}
                                               placeholder="Значение Y от -3 до 3"
                                               name="y" required/>
                                    </label>
                                </tr>

                                <tr>
                                    {/*radius*/}
                                    <label style={bigR}>
                                        Значение R:
                                        <input type="text" className="r" style={{width: '70%'}} value={this.state.r}
                                               onChange={this.handleChange.bind(this)}
                                               placeholder="Значение R от -3 до 3" name="r" required/>

                                    </label>
                                </tr>
                                </tbody>

                                <tfoot>
                                {error}
                                </tfoot>
                            </table>
                        </div>
                        <br/>
                        <div>
                            <MyCanvas setPoint={this.pointFromCanvas} radius={this.state.r} width={"w>1176"}
                                      onRef={ref => this.child = ref}/>
                        </div>
                        <br/>
                        <button type="submit" style={buttonBig}>Check</button>
                    </form>
                </MediaQuery>


                <MediaQuery minDeviceWidth={829} maxDeviceWidth={1175}>
                    <form ref={f => this.sbf = f} className="pointForm"
                          style={{marginLeft: '15%', marginRight: '15%', width: '70%'}}
                          onSubmit={this.handleSubmit.bind(this)}>
                        <div style={{height: '150px'}}>
                            <table style={formTable}>
                                <thead>Введите значения</thead>

                                <tbody>
                                <tr>
                                    <label style={bigX}>
                                        Значение X:
                                        <input type="text" className="x" style={{width: '70%'}} value={this.state.x}
                                               onChange={this.handleChange.bind(this)}
                                               placeholder="Значение X от -3 до 3"
                                               name="x" required/>
                                    </label>
                                </tr>

                                <tr>
                                    <label style={bigY}>
                                        Значение Y:
                                        <input type="text" className="y" style={{width: '70%'}} value={this.state.y}
                                               onChange={this.handleChange.bind(this)}
                                               placeholder="Значение Y от -3 до 3"
                                               name="y" required/>
                                    </label>
                                </tr>

                                <tr>
                                    {/*radius*/}
                                    <label style={bigR}>
                                        Значение R:
                                        <input type="text" className="r" style={{width: '70%'}} value={this.state.r}
                                               onChange={this.handleChange.bind(this)}
                                               placeholder="Значение R от -3 до 3" name="r" required/>

                                    </label>
                                </tr>
                                </tbody>

                                <tfoot>
                                {error}
                                </tfoot>
                            </table>
                        </div>
                        <br/>
                        <div style={{width: '30%'}}>
                            <MyCanvas setPoint={this.pointFromCanvas} radius={this.state.r} width={"829<w<1175"}
                                      onRef={ref => this.child = ref}/>
                        </div>
                        <br/>
                        <button type="submit" style={buttonBig}>Check</button>


                    </form>
                </MediaQuery>

                <MediaQuery maxDeviceWidth={828}>
                    <form ref={f => this.sbf = f} className="pointForm"
                          style={{marginLeft: '15%', marginRight: '15%', width: '70%'}}
                          onSubmit={this.handleSubmit.bind(this)}>
                        <div style={{height: '150px'}}>
                            <table style={formTable}>
                                <thead>Введите значения</thead>

                                <tbody>
                                <tr>
                                    <label style={bigX}>
                                        Значение X:
                                        <input type="text" className="x" style={{width: '70%'}} value={this.state.x}
                                               onChange={this.handleChange.bind(this)}
                                               placeholder="Значение X от -3 до 3"
                                               name="x" required/>
                                    </label>
                                </tr>

                                <tr>
                                    <label style={bigY}>
                                        Значение Y:
                                        <input type="text" className="y" style={{width: '70%'}} value={this.state.y}
                                               onChange={this.handleChange.bind(this)}
                                               placeholder="Значение Y от -3 до 3"
                                               name="y" required/>
                                    </label>
                                </tr>

                                <tr>
                                    {/*radius*/}
                                    <label style={bigR}>
                                        Значение R:
                                        <input type="text" className="r" style={{width: '70%'}} value={this.state.r}
                                               onChange={this.handleChange.bind(this)}
                                               placeholder="Значение R от -3 до 3" name="r" required/>

                                    </label>
                                </tr>
                                </tbody>

                                <tfoot>
                                {error}
                                </tfoot>
                            </table>
                        </div>
                        <br/>
                        <div>
                            <MyCanvas setPoint={this.pointFromCanvas} radius={this.state.r} width={"x<828"}
                                      onRef={ref => this.child = ref}/>
                        </div>
                        <br/>
                        <button type="submit" style={buttonBig}>Check</button>


                    </form>
                </MediaQuery>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        isAuthorised: state.loginReducer.isAuthorised,
        points: state.pointsReducer.points
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setAuthorised: () => {
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

export default connect(mapStateToProps, mapDispatchToProps)(PointForm);