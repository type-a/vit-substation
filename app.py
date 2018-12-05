from flask import Flask 
from pyModbusTCP.client import ModbusClient
from pyModbusTCP import utils
from flask import jsonify
from flask_cors import CORS, cross_origin

import json

app = Flask(__name__)
cors = CORS(app)
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
                "currentR" : abc[5],
                "currentY" : abc[6],
                "currentB" : 0,
                "voltageR"  :2,
                "voltageY" :3,
                "voltageB" :0,
                "powerKWH" :4,
                "powerKVAH" :0,
                "powerKVAR" :0,
                "pvoltageR" :0
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
    app.run()