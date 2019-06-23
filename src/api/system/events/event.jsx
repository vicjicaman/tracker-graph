import _ from 'lodash'
const uuidv4 = require('uuid/v4');
export const LISTENER_DATA = {};

export const send = (stream, event, cxt) => {

  //console.log("EVENT SEND")
  const {event: evName, keyid, payload} = event;
  const id = uuidv4()
  const ev = {
    id,
    eventid: id,
    event: evName,
    keyid,
    timestamp: new Date().getTime(),
    payload: payload || {},
    stream
  };

  for (const listenerid in LISTENER_DATA) {
    //console.log("ADD EVENT TO LISTENER " + listenerid)
    const {events} = LISTENER_DATA[listenerid];

    events.push(ev);
  }

  return ev;
}
