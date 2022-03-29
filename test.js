var GtfsRealtimeBindings = require("gtfs-realtime-bindings");
var request = require("request");
fs = require('fs');
var data = '';


var requestSettings = {
  method: "GET",
  url: "https://api.cityofkingston.ca/gtfs-realtime/tripupdates.pb",
  encoding: null,
};
request(requestSettings, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(body);
    feed.entity.forEach(function (entity) {
      if (entity.tripUpdate) {
        data = JSON.stringify(entity.tripUpdate);
      }
    });
    fs.writeFile('realtimeData.json', data, function (err) {
      if (err) return console.log(err);
      console.log('Hello World > helloworld.txt');
    });
  }
});

