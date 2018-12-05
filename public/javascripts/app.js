// var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var request = new XMLHttpRequest();
function call() {
    request.open('GET', 'http://192.168.43.163:5000/runner');
    request.onload = function () {
        // console.log(this.responseText);
        var data = JSON.parse(this.responseText);
        console.log(data);
        $('#voltageR').text(data["Line Voltages V RY"].toFixed(3));
        $('#currentR').text(data["Line Current IR"].toFixed(3));
        // // $('#currentY').text(1 + 'A');
        // // $('#voltageB').text(2+ 'V');
        // // $('#currentB').text();
        // // $('#powerKWH').text();
        // // $('#pvoltageR').text();
        // // $('#lcurrentR').text();
        // // $('#pvoltageY').text();
        // // $('#lcurrentY').text();
        // // $('#pvoltageB').text();
        // // $('#lcurrentB').text();
        // $('#KVAH').text();
    }
    request.send();
}
setInterval(call, 3000);