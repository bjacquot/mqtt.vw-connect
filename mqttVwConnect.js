var mqtt = require('mqtt');
        client  = mqtt.connect('mqtt://192.168.0.9')

        client.on('connect', function () {
            client.subscribe('presence', function (err) {
                if (!err) {
                    client.publish('presence', 'Hello mqtt')
                }
            })
        })

        client.on('message', function (topic, message) {
            // message is Buffer
            console.log(message.toString())
        })

class ProcessMqtt
{
    constructor()
    {
    }

    process(p1,p2)
    {
        //console.log("test !");
        if (p1.includes("batteryStatusData.stateOfCharge.content"))
        {
           var  Topic = 'vehicule/'+p1.split('.')[0]+'/battery/state';
            console.log(Topic+' '+p2);
            client.publish(String(Topic), String(p2))
        }
        else if (p1.includes("charger.status.cruisingRangeStatusData.primaryEngineRange.content"))
        {
            var Topic = 'vehicule/'+p1.split('.')[0]+'/battery/autonomy';
            console.log(Topic+' '+p2);
            client.publish(String(Topic), String(p2))
        }
    }
}

mqttProcess=new ProcessMqtt();

car=require('./main.js')()

car.mqttProcess=mqttProcess;



car.onReady();
