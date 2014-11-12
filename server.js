var
  AWS = require("aws-sdk"),
  awsRegion = "us-west-2",
  sqs = {},
  Hapi = require('hapi'),
  Good = require('good'),
  queueUri = 'https://sqs.us-west-2.amazonaws.com/621392439615/a_sample';

var server = new Hapi.Server(process.env.PORT || 3000);

function receiveSqsMessage() {
  "use strict";

  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: awsRegion
  });
  sqs = new AWS.SQS();

}


server.route({
  method: 'POST',
  path: '/hi',
  handler: function (request, reply) {

    server.log('response: ', request.payload);
    server.log('testing1');

    console.log('response: ', request.payload);
    console.log('testing2');

    reply('Hello response' + request.payload);

  }
});

server.pack.register(Good, function (err) {
  if (err) {
    throw err;
  }

  server.start(function () {
    server.log('info', 'Server running at: ' + server.info.uri);
  });
});