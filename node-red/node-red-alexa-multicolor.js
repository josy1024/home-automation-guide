
var device = msg.alexadevice
//var device = "light.pirat"

var onoff = msg.payload
if (onoff == "brightness_move_up")
{
    onoff == "on"
}

if (onoff == "brightness_move_down") {
    onoff == "off"
}

if (msg.on == false)
{
    msg.payload =
    {
        "entity_id": device,
        "s": "turn_" + onoff
    }
}
else
{
    var data = { "xy_color": [msg.xy[0], msg.xy[1]],
        "brightness_pct": msg.percentage }
    
    msg.payload =
    {
        "entity_id": device,
        "s": "turn_" + onoff,
        "data": data,
        "brightness_pct": msg.percentage
    }

}
    
return msg;

