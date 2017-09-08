'use strict'

const MCSMessage = require('./MCSMessage');

class PublishAndSubscribe extends MCSMessage {
  constructor(media_id, sdp, params) {
    super();
    this.body.media_id = media_id;
    this.body.sdp = sdp;
    this.body.params = params;
  }
}

module.exports = PublishAndSubscribe;