var _ = require('underscore');

function jsonPacker(data, structure, opts){

  this.structure = structure;
  this.data = data;
  this.bufferSize = opts.size || 100;
  this.buffer = new Buffer(100);
  this.mark = 0;

}

jsonPacker.prototype.pack(){
  this.packers.uint8(this.structure.type); 
  _.each(this.structure.keys, function(element, i){
    this.packers[element.valuetype](this.data[element.name]); 
  });
  return this.buffer;
}

jsonPacker.prototype.packers = { 
	uint8: function (value) { 
    this.buffer.writeUInt8(value, this.marker);
    this.marker =+1;},
	uint16: function (value){
    this.buffer.writeUInt16BE(value, this.marker)
    this.marker =+2;},
	uint32: function (value){ 
    this.buffer.writeUInt32BE(value, this.marker)
    this.marker =+4;},
	int8: function (value) { 
    this.buffer.writeInt8(value, this.marker)
    this.marker =+1;},
	int16: function (value) { 
    this.buffer.writeInt16BE(value, this.marker)
    this.marker =+2;},
	int32: function (value) { 
    this.buffer.writeInt32BE(value, this.marker)
    this.marker =+4;},
	float32: function (value) { 
    this.buffer.writeFloatBE(value, this.marker)
    this.marker =+4;},
	float64: function (value) { 
    this.buffer.writeDoubleBE(value, this.marker)
    this.marker =+8;}
  string: function(value){
    this.marker =+ this.buffer.write(value, this.marker);}
}
modules.export= jsonPacker;
