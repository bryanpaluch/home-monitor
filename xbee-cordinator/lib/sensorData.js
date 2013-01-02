module.exports =  {
  1 : {
    sensorType: 'thermostat',
    payloadPattern: {
            type : 'uint8',
            currentTemp : 'float32',
            setTemp: 'float32',
            state : 'uint8'
    }
  }
}

