from flask import Flask 
from pyModbusTCP.client import ModbusClient
from pyModbusTCP import utils
from flask import jsonify
from flask_cors import CORS, cross_origin
from flask_restful import Resource, Api
# import grovepi 
import json

app = Flask(__name__)
cors = CORS(app)
api = Api(app)
app.config['CORS_HEADERS'] = 'Content-Type'


def make_summary():
    SERVER_HOST = "192.168.43.239"
    SERVER_PORT = 502
    SERVER_UNIT_ID = 8

    c = ModbusClient()
    c.host(SERVER_HOST)
    c.port(SERVER_PORT)
    c.unit_id(SERVER_UNIT_ID)
    if not c.is_open():
            if not c.open():
                print("cannot connect ....")

    if c.is_open():
    # read 54 registers at address 0, store result in regs list
            regs = c.read_input_registers(0,54)
    # if success change register value to float
            if regs:
                abc = [utils.decode_ieee(f) for f in utils.word_list_to_long(regs)]
                data = {
                "Power KWH" : "%0.3f"%abc[0],
                "Power KVAH" : "%0.3f"%abc[1],
                "Power KVArP" : "%0.3f"%abc[2],
                "Power KVArN" : "%0.3f"%abc[3],
                "Line Voltages V RY" : "%0.3f"%abc[4],
                "Line Voltages V YB" : "%0.3f"%abc[5],
                "Line Voltages V BR" : "%0.3f"%abc[6],
                "Line Current IR" : "%0.3f"%abc[7],
                "Line Current IY" : "%0.3f"%abc[8],
                "Line Current IB" : "%0.3f"%abc[9],
                "Active Power Consumed" : "%0.3f"%abc[10],
                "Reactive Power Consumed" : "%0.3f"%abc[11],
                "Apparent Power Consumed" : "%0.3f"%abc[12],
                "Phase Voltages VRN" : "%0.3f"%abc[13],
                "Phase Voltages VYN" : "%0.3f"%abc[14],
                "Phase Voltages VBN" : "%0.3f"%abc[15],
                "Power Factor" : "%0.3f"%abc[16],
                "Frequency" : "%0.3f"%abc[17],
                "Real Power on R" : "%0.3f"%abc[18],
                "Real Power on Y" : "%0.3f"%abc[19],
                "Real Power on B" : "%0.3f"%abc[20],
                "Reactive Power on R" : "%0.3f"%abc[21],
                "Reactive Power on Y" : "%0.3f"%abc[22],
                "Reactive Power on B" : "%0.3f"%abc[23],
                "Apparent Power on R" : "%0.3f"%abc[24],
                "Apparent Power on Y" : "%0.3f"%abc[25],
                "Apparent Power on B" : "%0.3f"%abc[26] 
                }
                return data
    # return ({'A': 1, 'B': 2})
    



@app.route('/runner')
@cross_origin()
def runner():
    data = make_summary()
    response = app.response_class(
        response=json.dumps(data),
        status=200,
        mimetype='application/json'
    )
    return response

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=90, debug=True)