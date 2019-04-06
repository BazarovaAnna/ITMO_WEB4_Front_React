import React from 'react';
import "./PointForm.css";
import axios from "axios";
import {setAuthorised, setUnAuth} from "../../actions/login";
import {setPoints} from "../../actions/setPoints";
import {connect} from "react-redux";
import MyCanvas from "../MyCanvas";
import MediaQuery from 'react-responsive'

class PointForm extends React.Component{

    constructor(props){
        super(props);
        this.state =
            {
                showInv:false,
                x: "1",
                y: "",
                r: "1"
            };
        this.testSession = this.testSession.bind(this);
        this.pointFromCanvas = this.pointFromCanvas.bind(this);
    }

    testSession() {{/*TODO?*/}
        axios.get('http://localhost:8080/results/get', {withCredentials: true})
            .then(res => {
                if(res.status !== 401) {
                    this.props.setPoints(res.data);
                    return true;
                }
                else return false;
            }).catch(err => {
            this.props.setUnAuth();
            return false;
        });
    }

    handleChange(event){
        this.setState({[event.target.name]: event.target.value});
        if(!this.validateY()||!this.validateX()||!this.validateR()) this.showInval();
        else this.hideInval();
    }

    showInval(){
        this.setState({
            showInv: true
        })
    };

    hideInval(){
        this.setState({
            showInv: false
        })
    };

    handleSubmit(event){{/*TODO?*/}
        event.preventDefault();
        if(this.validateY()){
            var params = new URLSearchParams();
            params.append('x', this.state.x);
            params.append('y', this.state.y);
            params.append('r', this.state.r);
            axios.get('http://localhost:8080/results/add',{params, withCredentials:true})
                .then(response => {
                    this.testSession();
                    this.child.updateCanvas(this.state.r);
                });
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.child.updateCanvas(this.state.r);
    }

    pointFromCanvas(x, y, r){
        this.setState({
            x: x, y: y, r: r
        }, ()=>{
            this.sbf.dispatchEvent(new Event('submit'))
        });
    }


    validateY(){
        let y = parseFloat(this.state.y);
        return (y > -3 && y < 3) || (this.state.y === "");
    }
    validateX(){
        let x = parseFloat(this.state.x);
        return (x > -3 && x < 3) || (this.state.x === "");
    }
    validateR(){
        let r = parseFloat(this.state.r);
        return (r > -3 && r < 3) || (this.state.r === "");
    }
    render() {
        let error;

        var bigX={
            display: 'inline-block',
            textAlign: 'left',
            float: 'left',
            marginLeft: '0',
            paddingLeft: '80px',
            border: 'none'
        };

        var smallX={
            display: 'block',
            textAlign: 'left'
        };

        var bigY ={
            display: 'inline-block',
            textAlign: 'left',
            float: 'left',
            width: '40%',
            marginTop: '60px',
            marginRight: '0',
            border: 'none'
        };

        var smallY={

        };

        var bigR ={
            display: 'inline-block',
            textAlign: 'right',
            float: 'right',
            marginRight: '20%',
            font: '20px sans-serif',
            marginTop: '30px'
        };

        var smallR={

        };

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

        if(!this.validateY()){
           error = <p className="Inval" style={{color: 'red'}}>Некорректные данные. Y - число (-3..5)</p>;
        } else error = <p className="Inval" style={{color: 'red'}}> </p>;
        return(
            <div>
                <MediaQuery minDeviceWidth={1176}>
                    <form ref={f => this.sbf = f} className="pointForm" style={{marginLeft:'15%', marginRight: '15%', width: '70%'}} onSubmit={this.handleSubmit.bind(this)} >
                        <div style={{height: '200px'}}>
                            <table className="radioPanelX" style={bigX}>
                                <thead>Значение Y</thead>
                                <tbody>
                                <tr>
                                    <input type="text" className="x" style={{width: '380px'}} value={this.state.x} onChange={this.handleChange.bind(this)} placeholder="Значение X от -3 до 3" name="x" required/>
                                </tr>

                                </tbody>
                            </table>

                            <table style={bigY}>
                                <thead>Значение Y</thead>
                                <tbody>
                                <tr>
                                    <input type="text" className="y" style={{width: '380px'}} value={this.state.y} onChange={this.handleChange.bind(this)} placeholder="Значение Y от -3 до 3" name="y" required/>
                                </tr>
                                <tr>
                                    {/*radius*/}
                                    <label style={bigR}>
                                        Значение R:
                                        <input type="text" className="r" style={{width: '380px'}} value={this.state.r} onChange={this.handleChange.bind(this)} placeholder="Значение R от -3 до 3" name="r" required/>

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
                            <MyCanvas setPoint={this.pointFromCanvas} radius={this.state.r} onRef={ref => this.child = ref}/>
                        </div>
                        <br/>
                        <button type="submit" style={buttonBig}>Check</button>


                    </form>
                </MediaQuery>


                <MediaQuery minDeviceWidth={829} maxDeviceWidth={1175}>
                    <form ref={f => this.sbf = f} className="pointForm" style={{marginLeft:'15%', marginRight: '15%', width: '70%'}} onSubmit={this.handleSubmit.bind(this)} >
                        <div style={{height: '200px'}}>
                            <table className="radioPanelX" style={bigX}>
                                <thead>Значение Х</thead>
                                <tbody>
                                <tr>
                                    <input type="text" className="x" style={{width: '200px'}} value={this.state.x} onChange={this.handleChange.bind(this)} placeholder="Значение X от -3 до 3" name="x" required/>
                                </tr>
                                </tbody>
                            </table>

                            <table style={bigY}>
                                <thead>Значение Y</thead>
                                <tbody>
                                <tr>
                                    <input type="text" className="y" style={{width: '200px'}} value={this.state.y} onChange={this.handleChange.bind(this)} placeholder="Значение Y от -3 до 5" name="y" required/>
                                </tr>
                                <tr>
                                    {/*radius*/}
                                    <label style={bigR}>
                                        Значение R:
                                        <input type="text" className="r" style={{width: '200px'}} value={this.state.r} onChange={this.handleChange.bind(this)} placeholder="Значение R от -3 до 3" name="r" required/>

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
                            <MyCanvas setPoint={this.pointFromCanvas} radius={this.state.r} onRef={ref => this.child = ref}/>
                        </div>
                        <br/>
                        <button type="submit" style={buttonBig}>Check</button>


                    </form>
                </MediaQuery>

                <MediaQuery maxDeviceWidth={828}>
                    <form ref={f => this.sbf = f} className="pointForm" style={{marginLeft:'15%', marginRight: '15%', width: '70%'}} onSubmit={this.handleSubmit.bind(this)} >
                        <div style={{height: '200px'}}>
                            <table className="radioPanelX" style={bigX}>
                                <thead>Значение Х</thead>
                                <tbody>
                                <tr>
                                    <input type="text" className="x" style={{width: '100px'}} value={this.state.x} onChange={this.handleChange.bind(this)} placeholder="Значение X от -3 до 3" name="x" required/>

                                </tr>
                                </tbody>
                            </table>

                            <table style={bigY}>
                                <thead>Значение Y</thead>
                                <tbody>
                                <tr>
                                    <input type="text" className="y" style={{width: '100px'}} value={this.state.y} onChange={this.handleChange.bind(this)} placeholder="Значение Y от -3 до 5" name="y" required/>
                                </tr>
                                <tr>
                                    {/*radius*/}
                                    <label style={bigR}>
                                        Значение R:
                                        <input type="text" className="r" style={{width: '100px'}} value={this.state.r} onChange={this.handleChange.bind(this)} placeholder="Значение R от -3 до 3" name="r" required/>

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
                            <MyCanvas setPoint={this.pointFromCanvas} radius={this.state.r} onRef={ref => this.child = ref}/>
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
    return{
        isAuthorised: state.loginReducer.isAuthorised,
        points: state.pointsReducer.points
    }
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
export default connect(mapStateToProps, mapDispatchToProps)(PointForm);