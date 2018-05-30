var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise; 

var systemSuperSubSchema = {
    delay: Number,
    iteration: Number,
    threshold: Number,
    port: String,
    processName: String,
    signal: String
}

var protocolSuperSubSchema = {
    interface: String, 
    port: String,
    iteration: Number,
    delay: Number
} 

var interfacesSuperSubSchema = {
    interface: String,
    delay: Number,
    msdealy: String,
    iteration: Number,
    variation: String
}

var systemSubSchema = [systemSuperSubSchema];
var protocolSubSchema = [protocolSuperSubSchema];
var interfacesSubSchema = [interfacesSuperSubSchema];

var systemSchema = {init6: systemSubSchema, reboot: systemSubSchema};
var protocolSchema  = {radius: protocolSubSchema};
var interfacesSchema = {packetDelay: interfacesSubSchema, packetLoss: interfacesSubSchema};

var componentSchema = new Schema({
    name: String,
    system: systemSchema,
    protocol: protocolSchema,
    interfaces: interfacesSchema
});

module.exports = mongoose.model('components', componentSchema);