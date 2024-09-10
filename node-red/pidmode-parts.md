# modes

## PID TESTING

```js
msg.noreturn = true;
    
return msg;
```

## LOWBATT

```js
    msg.solbattminimumconfig = 90;
    msg.payload = 3;
    msg.State = "BattLimit: " + msg.battstate;
    msg.delay = 2000;
    msg.noreturn == true;
    
    global.set('msg.PID-integral', 0);

return msg;
```

## Aufladen
```js
    var EvnLieferung = global.get('evn_Lieferung') || 0;

    msg.MinInj = 4;
    msg.payload =  4;

    if (Math.round(EvnLieferung) > 100) {
        msg.solbattminimumconfig = 90;
    }
    msg.State = "HighLieferung" 

    global.set('msg.PID-integral', 0);

    return msg;
```

## MSG Delay

```js

var MinInj = global.get('sol_min_injection') || 0;

// wenn sich der neue einspeise-wert Verringert,
//   dann max wert nacher setzen

if (MinInj < Math.round(msg.payload))
{
    msg.delay = 8000;
}


return msg;
```

## msg.payload + 1

```js
// m
msg.payload = Math.round(msg.payload) + 1;
return msg;
```

## solbattminimumconfig

```js
if (msg.solbattminimumconfig == null) {
    return null;
}
else {
    var Solmate_set_inject_user_minimum_battery_percentage = global.get('solmate_set_inject_user_minimum_battery_percentage');
    
    if (Solmate_set_inject_user_minimum_battery_percentage == msg.solbattminimumconfig)
    {
        return null;
    }
    
    var User_minimum_battery_percentage = global.get('user_minimum_battery_percentage');

    if (msg.solbattminimumconfig > 100)
    {
        msg.solbattminimumconfig = 90
    }
    
    global.set('solbattminimumconfig', msg.solbattminimumconfig);
    msg.payload = msg.solbattminimumconfig;
    return msg;

}

```
