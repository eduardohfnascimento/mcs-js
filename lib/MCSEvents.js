/**
 * Events for Media Control Server
 * @memberof module:mcs-js
 */

/**
 * @event module:mcs-js#MCSEvent
 * @type {Object}
 */

 /**
  * @event module:mcs-js#open
  * @type {module:mcs-js#event:MCSEvent}
  */

 /**
  * @event module:mcs-js#connection
  * @type {module:mcs-js.MCSResponseClient}
  */


 /**
  * @event module:mcs-js#join
  * @property {String} room_id The id of the room
  * @property {String} user_name The name of the user
  * @property {Object} params Additional parameters
  * @type {module:mcs-js#event:MCSEvent}
  */

/**
 * @event module:mcs-js#joined
 * @property {String} user_id The id of the user
 * @property {Object} params Additional parameters
 * @type {module:mcs-js#event:MCSEvent}
 */

 /**
   * @event module:mcs-js#publishAndSubscribe
   * @property {String} media_id The id of the media to subscribe
   * @property {String} sdp The Session Descriptor (SDP)
   * @property {Object} params Additional parameters
   * @type {module:mcs-js#event:MCSEvent}
   */


 /**
   * @event module:mcs-js#unpublishAndUnsubscribe
   * @property {String} media_id The id of the media to unsubscribe
   * @property {Object} params Additional parameters
   * @type {module:mcs-js#event:MCSEvent}
   */

/**
  * @event module:mcs-js#leave
  * @property {String} user_id The id of the user
  * @property {Object} params Additional parameters
  * @type {module:mcs-js#event:MCSEvent}
  */