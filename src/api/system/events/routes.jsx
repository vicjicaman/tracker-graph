import _ from 'lodash'
import {wait} from '@nebulario/tracker-process'
import {LISTENER_DATA} from './event'

export const routes = (app, cxt) => {

  app.get('/events/:streamid', async function(req, res) {
    const {streamid} = req.params;
    const listenerid = req.id;

    LISTENER_DATA[listenerid] = {
      listenerid,
      stream: streamid,
      status: "ACTIVE",
      events: []
    };

    const listener = LISTENER_DATA[listenerid];

    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-control": "no-cache" //,
      //'Connection': 'keep-alive'
    });

    //console.log("ADD LISTENER " + listenerid)

    req.on("close", function() {
      //console.log("REMOVE LISTENER " + listener.listenerid)
      listener.status = "INACTIVE";
      if (LISTENER_DATA[listener.listenerid]) {
        delete LISTENER_DATA[listener.listenerid];
      }
    });

    try {
      while (listener.status === "ACTIVE") {
        //const listener = LISTENER_DATA[listenerid];

        const {stream, events} = listener;
        if (events.length > 0) {
          listener.events = [];
          //console.log("LISTENER ACTIVE -----------------------------------------");
          //console.log(JSON.stringify({events}, null, 2))

          const strPld = JSON.stringify({stream, events});
          let msg = "id: " + new Date().getTime() + "\n";
          msg += "event: event." + stream + "\n";
          msg += "data: " + strPld + "\n";

          res.write(msg + "\n\n", 'utf-8');

          //LISTENER_DATA[listenerid].events = [];
        }

        await wait(100);
      }
      //console.log("LISTENER INACTIVE");
    } catch (e) {
      console.log("LISTENER ERROR: " + e.message + " :: " + e.code);
      res.end(JSON.stringify({message: e.message, code: e.code}), 'utf-8')
    }

  });
}
