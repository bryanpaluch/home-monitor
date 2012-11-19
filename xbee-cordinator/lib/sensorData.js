module.exports =  {
  1 : {
    sensorType: 'thermostat',
    payloadPattern: [
      "b8 => type",
      "b32 => currentTemp",
      "b32 => setTemp",
      "b8 => state"
    ]
  }
}

