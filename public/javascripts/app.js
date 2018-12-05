// var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var request = new XMLHttpRequest();
function call() {
    request.open('GET', 'http://192.168.43.163:90/runner');
    request.onload = function () {
        // console.log(this.responseText);
        var data = JSON.parse(this.responseText);
        console.log(data);
        $('#voltageR').text(data['Phase Voltages VRN']+"V");
        $('#currentR').text(data["Line Current IR"]+"A");
        $('#voltageY').text(data['Phase Voltages VYN']+"V");
        $('#currentY').text(data["Line Current IY"]+"A");
        $('#voltageB').text(data['Phase Voltages VBN']+"V");
        $('#currentB').text(data["Line Current IR"]+"A");
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