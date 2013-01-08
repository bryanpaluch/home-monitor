var jsonPacker = require('../lib/jsonPacker.js');
var JParser = require('jParser');


var assert = require('assert');

var struct = {
        type: 1,
        keys:[
          {name: 'state',  valuetype: 'uint8'},
          {name: 'setTemp', valuetype:'float32'}
        ]
}
var jDataStruct = {type: 'uint8', state: 'uint8', setTemp: 'float32'}
var testbuffers = { 
  1 : new Buffer([0x01, 0x02, 0x00, 0x00, 0x70, 0x42])
}

describe('jsonPacker', function(){
  describe('#pack()', function(){
    it('should return the correct binary value', function(){
      var data = {'setTemp' : 60, state: 2};
      var jp = new jsonPacker(data, struct, {size:6});
      var packed = jp.pack();
      assert.deepEqual(packed, testbuffers['1']);
    });
    it('should correctly use the size option', function(){
      var data = {'setTemp' : 60, state: 2};
      var jp = new jsonPacker(data, struct, {size:6});
      var packed = jp.pack();
      assert.deepEqual(packed.length, 6);
    });
    it('should default to size 100' , function(){
      var data = {'setTemp' : 60, state: 2};
      var jp = new jsonPacker(data, struct);
      var packed = jp.pack();
      assert.deepEqual(packed.length, 100);
    });
    it('binary should compatible with jParser', function(){
        //note type added to data object, but not in keys
        var data = {'setTemp' : 60, state: 2, type: 1};
        var jp = new jsonPacker(data, struct, {size:6});
        var packed = jp.pack();
        var parser = new jParser(packed, {pattern : jDataStruct});
        var packet = parser.parse('pattern');
        assert.deepEqual(data, packet);
    });
  });
});
      

