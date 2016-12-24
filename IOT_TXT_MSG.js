var http = require('http');
/**Add your IFTTT secretkey from your applet 
*/
var iftttMakerSecretKey = 'XXXXXXXXXXXXXXX';

/**
 * When invoked from an IOT Button press the event payload contains the following:
    {
        "serialNumber": "GXXXXXXXXXXXXXXXXX",
        "batteryVoltage": "xxmV",
        "clickType": "SINGLE" | "DOUBLE" | "LONG"
    }
 */
exports.handler = (event, context) => {
    console.log('Received event:', event.clickType);
    
    /**
     * To allow the use of multiple IOT Buttons with three distinct functions per Button we'll compose our 
     * Maker event name from the device serial and the click type ("SINGLE" | "DOUBLE" | "LONG")
     */
    //var iftttMakerEventName = 'iot_' + event.serialNumber +'_'+ event.clickType;
    var iftttMakerEventName = 'AWS-' + event.clickType;
    
    // Compose the final Maker url
    var iftttMakerUrl =
    'http://maker.ifttt.com/trigger/'
    + iftttMakerEventName
    + '/with/key/'
    + iftttMakerSecretKey;
    
    // Make the http request
    console.log('start request to ' + iftttMakerUrl)
    http.get(encodeURI(iftttMakerUrl), function(res) {
        console.log("Got response: " + res.statusCode);
        context.succeed('SUCCESS');
        }).on('error', function(e) {
        console.log("Got error: " + e.message);
        context.done(null, 'FAILURE');
    });
    
};