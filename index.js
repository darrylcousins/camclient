'use strict';

const WebSocket = require('ws');
const NodeWebcam = require( "node-webcam" );
require("dotenv").config();

const Webcam = NodeWebcam.create();

const ws = new WebSocket(`ws://${process.env.SERVER}`);

let id;

ws.on('open', function open() {
  id = setInterval(function () {
    if (ws.readyState === WebSocket.OPEN) {
      NodeWebcam.capture( "cam", {callbackReturn: "base64"}, (err, data) => {
        ws.send(JSON.stringify(data), err => {
          if (err) console.log("error:", err);
        });
      });
    };
  }, 200);
  console.log('started client interval');
});
