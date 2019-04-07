import React from "react";
import PropTypes from 'prop-types';
import {setAuthorised, setUnAuth} from "../../actions/login";
import {setPoints} from "../../actions/setPoints";
import connect from "react-redux/es/connect/connect";
import ReactDOM from "react-dom";

class MyCanvas extends React.Component {
    constructor(props){
        super(props);

        this.state ={x:0, y:0}
    }


    componentDidMount() {
        this.props.onRef(this);
        this.updateCanvas(this.props.radius);
    }


    updateCanvas(r) {
        const ctx = this.refs.canvas.getContext('2d');
        let width=this.props.width;
        let w;
        if(width==="w>1176"){//TODO need to think, how big these widths will be
            w=400;//ЕСЛИ ЧТО НУЖНО БЫЛО МЕНЯТЬ ТОЛЬКО
        }else if(width==="829<w<1175"){
            w=200;//ЭТИ ЦИФЕРКИ
        }else if(width==="x<828"){
            w=100//И НИЧЕГО БОЛЬШЕ, И ТАКИЕ ЖЕ В МЕТОДЕ С TODO внизу
        }else {w=400}
        let all = true;
        this.drawBG(ctx, r, w);
        // this.props.points.map(
        //     point => {
        //         return(
        //             all &= this.drawPoint(ctx, point.x, point.y, r, w)
        //         )
        //     }
        // );

        if(!all){
            ctx.fillStyle="red";
            ctx.font = "14px Times New Roman";
            ctx.fillText('Некоторые точки за пределами графика', 0.12*w, 0.96*w);
        }
    }

    drawBG(ctx, symbol, w){
        ctx.clearRect(0,0, w, w);//w=500
        ctx.fillStyle = "lightsteelblue";
        ctx.fillRect(0, 0 , w, w);

        //triangle
        ctx.beginPath();
        ctx.strokeStyle = "#00009a";
        ctx.fillStyle = "lightskyblue";
        ctx.moveTo(w/2, w/10);
        ctx.lineTo(w/10, w/2);//w/2=250
        ctx.lineTo(w/2, w/2);//w/10=50
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        //прямоугольник done
        ctx.beginPath();
        ctx.moveTo(w*3/10, w/2);//w*3/10=150
        ctx.lineTo(w*3/10, w*9/10);//w*9/10=450
        ctx.lineTo(w/2, w*9/10);
        ctx.lineTo(w/2, w/2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        //сектор done
        ctx.beginPath();
        ctx.arc(w/2, w/2, w/5, 2*Math.PI, 5*Math.PI/2,false);//w/5=100
        ctx.lineTo(w/2, w/2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        //оси
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.lineWidth = "2";
        ctx.moveTo(0, w/2);
        ctx.lineTo(w, w/2);
        ctx.moveTo(w/2, 0);
        ctx.lineTo( w/2, w);
        ctx.stroke();

        //отметки
        ctx.beginPath();
        ctx.moveTo(49*w/100, w/10);//49*w/100=245
        ctx.lineTo(51*w/100, w/10);//51*w/100=255
        ctx.moveTo(49*w/100, 3*w/10);
        ctx.lineTo(51*w/100, 3*w/10);
        ctx.moveTo(49*w/100, 7*w/10);
        ctx.lineTo(51*w/100, 7*w/10);//7*w/10=350
        ctx.moveTo(49*w/100, 9*w/10);
        ctx.lineTo(51*w/100, 9*w/10);

        ctx.moveTo(w/10, 49*w/100);
        ctx.lineTo(w/10, 51*w/100);
        ctx.moveTo(3*w/10, 49*w/100);
        ctx.lineTo(3*w/10, 51*w/100);
        ctx.moveTo(7*w/10, 49*w/100);
        ctx.lineTo(7*w/10, 51*w/100);
        ctx.moveTo(9*w/10, 49*w/100);
        ctx.lineTo(9*w/10, 51*w/100);
        ctx.closePath();
        ctx.stroke();

        ctx.fillStyle="black";
        ctx.font = w*0.04+"px Times New Roman bold";

        if((!isNaN(parseFloat(symbol)))&&(parseFloat(symbol)!=0)){
            ctx.fillText("-"+symbol, 2*w/25, 11*w/20);//2*w/25=40 11*w/20=275
            ctx.fillText("-"+ (symbol/2), w*0.26, 11*w/20);//w*0.26=130
            ctx.fillText(symbol/2, w*0.68, 0.55*w);//340 275
            ctx.fillText(symbol, 0.89*w, 0.55*w);//445 275

            ctx.fillText(symbol, 0.53*w, 0.106*w);
            ctx.fillText(symbol/2, 0.53*w, 0.306*w);
            ctx.fillText("-"+(symbol/2), 0.53*w, 0.706*w);
            ctx.fillText("-"+symbol, 0.53*w, 0.906*w);
            ctx.stroke();
        }
        else{
            ctx.fillText("-R", 0.08*w, 0.55*w);
            ctx.fillText("-R/2", 0.26*w, 0.55*w);
            ctx.fillText("R/2", 0.68*w, 0.55*w);
            ctx.fillText("R", 0.89*w, 0.55*w);

            ctx.fillText("R", 0.53*w, 0.106*w);
            ctx.fillText("R/2", 0.53*w, 0.306*w);
            ctx.fillText("-R/2", 0.53*w, 0.706*w);
            ctx.fillText("-R", 0.53*w, 0.906*w);
            ctx.stroke();
        }
    }

    drawPoint(ctx, x, y, radius, w) {

        if(this.check(x, y, radius)) ctx.fillStyle = "green";
        else ctx.fillStyle = "red";
        if(Math.abs(x)/radius > 1.25 || Math.abs(y)/radius >1.25) return false;
        ctx.beginPath();
        ctx.arc(w/2 + ((x / radius) * 0.4*w), w/2 - ((y / radius) * 0.4*w), 3, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fill();
        return true;
    }

    check(x, y, r) {
        return ((x <= 0 && x >= -(r / 2)) && (y <= 0 && y >= -r) //прямоугольник
            || (x <= 0 && y >= 0) && (y <= x + r) //треугольник
            || (x >= 0 && y <= 0) && (x * x + y * y <= (r/2) * (r/2)));
    }

    _onMouseMove(e){
        this.setState({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
    }

    interactiveCanvas(e){
        let width=this.props.width;
        let w;//TODO
        if(width==="w>1176"){
            w=400;
        }else if(width==="829<w<1175"){
            w=200;
        }else if(width==="x<828"){
            w=100
        }else {w=400}
        let r = this.props.radius;
        let x = (((this.state.x - w/2) * r) / 0.4*w);
        let y = (((-this.state.y + w/2) * r) / 0.4*w );
        this.props.setPoint(x, y, r);
    }


    render() {
        let width=this.props.width;
        let w;
        if(width==="w>1176"){
            w=400;
        }else if(width==="829<w<1175"){
            w=200;
        }else if(width==="x<828"){
            w=100
        }else {w=400}
        return (
            <canvas onClick={this.interactiveCanvas.bind(this)} onMouseMove={this._onMouseMove.bind(this)} ref="canvas" width={w} height={w}/>
        );
    }
}

MyCanvas.propTypes ={
  radius: PropTypes.string.isRequired,
    setPoint: PropTypes.func.isRequired
};

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

export default connect(mapStateToProps, mapDispatchToProps)(MyCanvas);