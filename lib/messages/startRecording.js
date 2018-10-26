'use strict';

const MCSMessage = require('./MCSMessage');

class StartRecording extends MCSMessage {
  constructor(sourceMediaId, mediaId, recPath) {
    super();
    this.body.source_id = sourceMediaId;
    this.body.media_id = mediaId;
    this.body.recording_path = recPath;
  }
}

module.exports = StartRecording;
