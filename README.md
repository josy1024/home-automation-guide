# home-automation-guide

* Eine Sammlung, was alles mit Haus Automatisierungen alles möglich ist.
* die eingesetzten Komponenten sind eher "LOW TECH" und es funktioniert alles/Vieles auch ohne "schnick/schnack"
* die Automatisierungen ermöglichen "optimierungen" und "einsparungen" sowie "Einblicke" ins ganze System

## docs

## Software
* [Home Assistant](https://www.home-assistant.io/)
  * MQTT: [Mosquitto MQTT](https://mosquitto.org/)
  * Zigbee2MQTT https://github.com/zigbee2mqtt/hassio-zigbee2mqtt
  * ZWave https://www.home-assistant.io/integrations/zwave_js/
  * Node-Red als "LOW CODE" Javascript Fuctions Programmierung https://nodered.org/
  * HACS für Inoffizielle Erweiterungen https://hacs.xyz/
  * tailscale vpn
  * plotly-graph
   
## Geräte (SERVER)
* Rasperry 4 (Home Assistant OS)
  * Ayotec Z Stick 7 Zwave USB
  * Conbee 2 USB (Zigbee)
    
* raspi zero 2w (EVN, python custom codes)
  * EET Solmate 2 MQTT API in/out https://github.com/josy1024/eet2mqtt
  * ENV Netz NÖ SmartMeter Serial 2 MQTT https://github.com/josy1024/SmartMeterEVNSagemcom-T210-D

## Geräte (AKTOREN)
* Herstellerunabhängigkeit mit Zigbee und Zwave Gateway (Ikea, Sonoff, Ayotec, Fibaro, Ledvance(ehem. Osram), TPLink, Tapo, Fronius, Rika, Tasmota ...)
 
## Prozesse / Aufgaben
* Infrarot Heizungssteuerung
* WarmwasserBoilder Steuerung abhängig von PV Leistung
* AlexaIntegration fürs Licht, Schaltbare Steckdosen, ...

## Photovoltaik
* EET Solmate G Wechselrichter mit AKKU, hat eigenen [py SDK](https://github.com/eet-energy/solmate-sdk)
* Fronius Gen24
* 

## scripts

## links
* Tipps/Inspirationen: [simon42](https://www.simon42.com/)https://www.simon42.com/
