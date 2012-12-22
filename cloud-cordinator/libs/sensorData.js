module.exports =  {
  1 : {
    sensorType: 'thermostat',
    reading:{
      payloadPattern: {
            type : 'uint8',
            currentType : 'float32',
            setTemp: 'float32',
            state : 'uint8'
      }
    },
    actions:[
      {  name: 'set',
        keys:[
          {name: 'state', formtype: 'dropdown', 
            type: 'uint8', settings:['auto', 'off', 'on'], values:[0, 1, 2]},
          {name: 'setTemp', formtype: 'number', type:'float32' }
        ],
        order: ['state', 'setTemp']
      }
    ]
  }
}

