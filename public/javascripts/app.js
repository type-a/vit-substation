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
        $('#lvoltageR').text(data["Phase Voltages VRN"]+"V");
        $('#lvoltageY').text(data["Phase Voltages VYN"]+"V");
        $('#lvoltageB').text(data["Phase Voltages VBN"]+"V");
        $('#KW_R').text(data["Real Power on R"] + "W");
        $('#KW_Y').text(data["Real Power on Y"] + "W");
        $('#KW_B').text(data["Real Power on B"] + "W");
        $('#KV_R').text(data["Reactive Power on R"] + "VAr");
        $('#KV_Y').text(data["Reactive Power on Y"] + "VAr");
        $('#KV_B').text(data["Reactive Power on B"] + "VAr");
        $('#apKV_R').text(data["Apparent Power on R"] + "VA");
        $('#apKV_Y').text(data["Apparent Power on Y"] + "VA");
        $('#apKV_B').text(data["Apparent Power on B"] + "VA");
        $('#KW').text(data["Active Power Consumed"] + "W");
        $('#KVAr').text(data["Reactive Power Consumed"] + "VAr");
        $('#KV').text(data["Apparent Power Consumed"] + "VA");
        $('#freq').text(data["Frequency"]);
        $('#pf').text(data["Power Factor"]);
        $('#KWh').text(data["Power KWH"]);
        $('#KVArh').text(data["Power KVArP"]);
        $('#KVh').text(data["Power KVAH"]);
    }
    request.send();
}
setInterval(call, 3000);