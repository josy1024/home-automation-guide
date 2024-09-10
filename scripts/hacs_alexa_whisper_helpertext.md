

#  multi channel notification with Home-Assistant

* trigger on input_text.whispermessage
  * Alexa (with HACS) 
  * Telegram (with Node-Red Integration)

```yaml

service: notify.alexa_media_room
data:
  message: >-
     [ "<amazon:effect name="whispered">", ] 
     {{states('input_text.whispermessage') }} 
     [ "</amazon:effect>", ]
  data:
    type: tts

```

## Node-Red Function

```js
var text = msg.payload;
msg.payload = {};

msg.payload.content = "";
msg.payload.content += text;
msg.payload.content += "\n---\n HomeAssistant";

msg.payload.chatId = -#REPLACECHATID#
msg.payload.parse_mode ="MarkdownV2" 
msg.payload.type = "message";
return msg;
```