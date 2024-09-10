var Sol_Battery_State = global.get('sol_battery_state') || 0.1;
var EvnLieferung = global.get('evn_Lieferung') || 0;
var EvnBezug = global.get('evn_Bezug') || 0;
var EvnLeistung = EvnBezug - EvnLieferung;

var Leistungsverbrauch = global.get('leistungsverbrauch') || 0;
var Solmateinjectpower = global.get('solmateinjectpower') || 0;

var Lastmode = global.get('pidmsg.pidmode') || "Initial";

global.set('pidmsg.last_solmatemode', Lastmode);
var Wantpower = Leistungsverbrauch - Solmateinjectpower;

Wantpower = Math.max(Wantpower, 4);

var WantpowerSolmate = 0;

msg.payload = EvnLeistung;

msg.pidmode = "initial" ;

if (Sol_Battery_State <= 9)
{
    msg.solbattminimumconfig = 90;
    msg.pidmode = "BatterieNiedrig";
    msg.battstate = String(Sol_Battery_State);
}
else
{
    if (Solmateinjectpower >= Leistungsverbrauch) {
         msg.pidmode = "Liefern" ;
    }
    else
    {
        if (Math.round(EvnBezug) > 5) {
            msg.pidmode = "Liefern";
        }

        if (Math.round(EvnLieferung) > 20) {
            msg.pidmode = "Aufladen";
        }
    }
}

global.set('pidmsg.wantpower', msg.payload.pidwantpower);
global.set('pidmsg.wantpowersolmate', msg.payload.pidwantpowersolmate);
global.set('pidmsg.pidmode', msg.pidmode);

return msg;

