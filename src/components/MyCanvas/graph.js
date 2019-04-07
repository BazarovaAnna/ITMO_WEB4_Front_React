var canvas;
var width;
var height;
var originalRadius = 0.1;
var radius;
var dots = [];

window.onload = function () {
    canvas = document.getElementById("graph");
    canvas.onclick = a;
    canvas.width = 300;
    width = canvas.width;
    canvas.height = 300;
    height = canvas.height;
    radius = width / 2 - 30;
    drawGraph();

};

drawGraph = function () {

    dots = [];

    rows = document.getElementById("resultTable").getElementsByTagName("tr");

    for (i = 1; i < rows.length; i++) {
        x = rows[i].getElementsByTagName("td")[0].innerHTML;
        y = rows[i].getElementsByTagName("td")[1].innerHTML;
        dots.push(x);
        dots.push(y);
    }
    let context = canvas.getContext("2d");
    context.fillStyle = "rgba(255, 255, 255, 1)";
    context.fillRect(0, 0, width, height);
    context.strokeStyle = "black";

    context.lineWidth = 0.7;
    context.font = "15px Lobster";
    context.fillStyle = "#0a6aaa";

    // originalRadius = PF('sp').value;
    originalRadius = document.getElementById("inputForm:r").value;

    let R = (originalRadius).toString(10);
    let R2 = (originalRadius / 2).toString(10);
    let mR = (-originalRadius).toString(10);
    let mR2 = (-originalRadius / 2).toString(10);
    // rectangle
    context.fillRect(width / 2, height / 2, -radius / 2, radius);

    context.beginPath();
    context.moveTo(width / 2, height / 2);
    context.lineTo(width / 2, height / 2 - radius);
    context.lineTo(width / 2 - radius, height / 2);
    context.fill();

    context.beginPath();
    context.arc(width / 2, height / 2, radius / 2, Math.PI / 2, 2 * Math.PI, true);
    context.lineTo(width / 2, height / 2);
    context.closePath();
    context.fill();

    context.fillStyle = "black";

    context.beginPath();
    context.moveTo(width / 2, 0);
    context.lineTo(width / 2, height);
    context.stroke();

    context.beginPath();
    context.moveTo(width / 2 - 7, 7);
    context.lineTo(width / 2, 0);
    context.lineTo(width / 2 + 7, 7);
    context.stroke();

    context.beginPath();
    context.moveTo(0, height / 2);
    context.lineTo(width, height / 2);
    context.stroke();
    context.beginPath();

    context.moveTo(width - 7, height / 2 + 7);
    context.lineTo(width, height / 2);
    context.lineTo(width - 7, height / 2 - 7);
    context.stroke();

    for (let i = 0; i < dots.length; i += 2) {
        if (checkHit(dots[i], dots[i + 1], originalRadius))
            context.strokeStyle = "green";
        else
            context.strokeStyle = "red";
        // context.strokeStyle = "red";
        context.beginPath();
        context.arc(width / 2 + dots[i] / originalRadius * radius, height / 2 - dots[i + 1] / originalRadius * radius, 1, 0, 2 * Math.PI, true);
        //context.arc(width/2 + 10, height/2 + 10, 4, 0, 2*Math.PI, true);
        context.stroke();
    }
    context.strokeStyle = "black";
    context.fillText("x", width - 10, height / 2 - 10);
    context.fillText("y", width / 2 + 10, 10);

    //y labels

    {
        context.beginPath();
        context.moveTo(width / 2 - 5, height / 2 - radius);
        context.lineTo(width / 2 + 5, height / 2 - radius);
        context.stroke();
        context.fillText(R, width / 2 + 10, height / 2 - radius + 5);

        context.beginPath();
        context.moveTo(width / 2 - 5, height / 2 - radius / 2);
        context.lineTo(width / 2 + 5, height / 2 - radius / 2);
        context.stroke();
        context.fillText(R2, width / 2 + 10, height / 2 - radius / 2 + 5);

        context.beginPath();
        context.moveTo(width / 2 - 5, height / 2 + radius / 2);
        context.lineTo(width / 2 + 5, height / 2 + radius / 2);
        context.stroke();
        context.fillText(mR2, width / 2 + 10, height / 2 + radius / 2 + 5);

        context.beginPath();
        context.moveTo(width / 2 - 5, height / 2 + radius);
        context.lineTo(width / 2 + 5, height / 2 + radius);
        context.stroke();
        context.fillText(mR, width / 2 + 10, height / 2 + radius + 5);
    }

    //x labels
    {
        context.beginPath();
        context.moveTo(width / 2 + radius, height / 2 - 5);
        context.lineTo(width / 2 + radius, height / 2 + 5);
        context.stroke();
        context.fillText(R, width / 2 + radius - 5, height / 2 - 10);

        context.beginPath();
        context.moveTo(width / 2 + radius / 2, height / 2 - 5);
        context.lineTo(width / 2 + radius / 2, height / 2 + 5);
        context.stroke();
        context.fillText(R2, width / 2 + radius / 2 - 5, height / 2 - 10);

        context.beginPath();
        context.moveTo(width / 2 - radius, height / 2 - 5);
        context.lineTo(width / 2 - radius, height / 2 + 5);
        context.stroke();
        context.fillText(mR, width / 2 - radius - 5, height / 2 - 10);

        context.beginPath();
        context.moveTo(width / 2 - radius / 2, height / 2 - 5);
        context.lineTo(width / 2 - radius / 2, height / 2 + 5);
        context.stroke();
        context.fillText(mR2, width / 2 - radius / 2 - 5, height / 2 - 10);

    }
};

checkHit = function (x, y, r) {
    if (x <= 0 && x >= -r / 2 && y <= 0 && y >= -r)
        return true;
    if (x >= 0 && y <= 0 && x * x + y * y <= r / 2 * r / 2)
        return true;
    if (x <= 0 && y >= 0 && y <= x + r)
        return true;

    return false;
};

a = function () {

    let x = event.pageX - canvas.getBoundingClientRect().left - window.scrollX;
    let y = event.pageY - canvas.getBoundingClientRect().top - window.scrollY;

    x = (x - width / 2) / radius * originalRadius;
    y = (height / 2 - y) / radius * originalRadius;

    document.getElementById("hiddenForm:hidden_x").value = x;
    document.getElementById("hiddenForm:hidden_y").value = y;
    document.getElementById("hiddenForm:hidden_r").value = originalRadius;

    document.getElementById("hiddenForm:hidden_button").click();
    drawGraph();

};
