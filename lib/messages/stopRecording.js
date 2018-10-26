'use strict';

const MCSMessage = require('./MCSMessage');

class StartRecording extends MCSMessage {
  constructor(sourceMediaId) {
    super();
    this.body.source_id = sourceMediaId;
  }
}

module.exports = StartRecording;
