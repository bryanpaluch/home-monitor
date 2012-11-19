var _ = require('underscore');


var sensors =  {
  1 : {
    sensorType: 'thermostat',
    payloadPattern: {
      type : 'uint8',
      currentType : 'float32',
      setTemp: 'float32',
      state : 'uint8'
    }
  }
}



module.exports = sensors;
