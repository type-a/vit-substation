// var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var request = new XMLHttpRequest();
function call() {
    request.open('GET', 'http://0.0.0.0:90/runner');
    request.onload = function () {
        // console.log(this.responseText);
        var data = JSON.parse(this.responseText);
        console.log(data);
        $('#voltageR').text(data['Line Voltages V RY']);
        $('#currentR').text(data["Line Current IR"]);
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