'use strict';

const MCSBaseClient = require('./MCSBaseClient');
const MCSTransactionManager = require('./MCSTransactionManager');

const JoinMessage = require('./messages/join');
const LeaveMessage = require('./messages/leave');
const PublishAndSubscribeMessage = require('./messages/publishAndSubscribe');
const UnpublishAndUnsubscribeMessage = require('./messages/unpublishAndUnsubscribe');
const GetRoomsMessage = require('./messages/getRooms');
const GetUsersMessage = require('./messages/getUsers');
const GetUserMediasMessage = require('./messages/getUserMedias');
const MuteMessage = require('./messages/mute');
const UnmuteMessage = require('./messages/unmute');
const AddIceCandidateMessage = require('./messages/addIceCandidate');
const PublishMessage = require('./messages/publish');
const UnpublishMessage = require('./messages/unpublish');
const SubscribeMessage = require('./messages/subscribe');
const UnsubscribeMessage = require('./messages/unsubscribe');
const SetVolumeMessage = require('./messages/setVolume');
const ConnectMessage = require('./messages/connect');
const DisconnectMessage = require('./messages/disconnect');
const OnEvent = require('./messages/onEvent');
const DTMF = require('./messages/dtmf');
const StartRecordingMessage = require('./messages/startRecording');
const StopRecordingMessage = require('./messages/stopRecording');

/**
 * This class handles connection to Media Control Server application
 * @extends module:mcs-js.MCSBaseClient
 * @memberof module:mcs-js
 * @fires {@link module:mcs-js#event:joined joined}
 */
class MCSClient extends MCSBaseClient {
  /**
   * Create a client for the Media Control Server specified by the given URI
   * @param  {String}   uri      The WebSocket URI of the Media Control Server
   */
  constructor (uri) {
    super();
    this.createConnection(uri);
  }

  deferTransaction (message) {
    MCSTransactionManager.addTransaction(message);
    this.send(message);
    return message.promise;
  }

  /**
   * Join MCS room
   * @param  {String}   roomId  The id of the room
   * @param  {String}   username The name of this user
   * @param  {Object}   params   Additional parameters
   */
  join (roomId, type, params) {
    if (!roomId || typeof(roomId) !== 'string') {
      throw new Error('Error : Invalid roomId');
    }

    if(!type || typeof(type) !== 'string') {
      throw new Error('Error : Invalid type');
    }

    const message = new JoinMessage(roomId, type, params);
    if (message) {
      return this.deferTransaction(message);
    }
  }

  /**
   * Publish stream to Media Control Server and subscribe to the media specified
   * by the mediaId
   * @param  {String}   sourceId The source where user is subscribing to
   * @param  {String}   mediaId The id of the media where user is subscribing to
   * @param  {String}   type    The type of media/stream that user is going to
   *   use to comunicate with the server (WEBRTC or RTP)
   * @param  {module:mcs-js#PublishAndSubscribeParams}   params
   *   Additional parameters
   */
  publishAndSubscribe (user, room, source, type, params) {
    if (!user || typeof(user) !== 'string') {
      throw new Error('Error : Invalid user');
    }

    if (!room || typeof(room) !== 'string') {
      throw new Error('Error : Invalid media room');
    }

    if (!source || typeof(source) !== 'string') {
      throw new Error('Error : Invalid media source');
    }

    if (!type || typeof(type) !== 'string') {
      throw new Error('Error : Invalid media type');
    }

    const message =
      new PublishAndSubscribeMessage(user, room, source, type, params);

    if (message) {
      return this.deferTransaction(message);
    }
  }

  /**
   * Stop publishing and subscribing to/from the stream given by mediaId
   * @param  {String}   mediaId The id of the media that it is unsubcribing to
   * @param  {Object}   [params]   Additional parameters
   */
  unpublishAndUnsubscribe (mediaId, params) {
    if (!mediaId || typeof(mediaId) !== 'string') {
      throw new Error('Error : Invalid mediaId');
    }

    const message =
      new UnpublishAndUnsubscribeMessage(mediaId, params);

    if (message) {
      return this.deferTransaction(message);
    }
  }

  /**
   *  TODO docs
   */
  publish (user, room, type, params) {
    if (!user || typeof(user) !== 'string') {
      throw new Error('Error : invalid user');
    }

    if (!room || typeof(room) !== 'string') {
      throw new Error('Error : invalid room');
    }

    const message =
      new PublishMessage(user, room, type, params);

    if (message) {
      return this.deferTransaction(message);
    }
  }

  /**
   * TODO docs
   */
  unpublish (userId, mediaId) {
    if (!userId || typeof userId !== 'string') {
      throw new Error('Error: invalid userId');
    }

    if (!mediaId || typeof mediaId !== 'string') {
      throw new Error('Error: invalid mediaId');
    }

    const message =
      new UnpublishMessage(userId, mediaId);

    if (message) {
      return this.deferTransaction(message);
    }
  }

  /**
   *  TODO docs
   */
  subscribe (user, source, type, params) {
    if (!user || typeof(user) !== 'string') {
      throw new Error('Error : invalid user');
    }

    if (!source || typeof(source) !== 'string') {
      throw new Error('Error : invalid source media ID');
    }

    if (!type || typeof type !== 'string') {
      throw new Error('Error: invalid type');
    }

    const message =
      new SubscribeMessage(user, source, type, params);

    if (message) {
      return this.deferTransaction(message);
    }
  }

  /**
   * TODO docs
   */
  unsubscribe (userId, mediaId) {
    if (!userId || typeof userId !== 'string') {
      throw new Error('Error: invalid userId');
    }

    if (!mediaId || typeof mediaId !== 'string') {
      throw new Error('Error: invalid mediaId');
    }

    const message =
      new UnsubscribeMessage(userId, mediaId);

    if (message) {
      return this.deferTransaction(message);
    }
  }

  /**
   * Leave a room of Media Control Server
   * @param  {String}   The user ID that is going to leave BECAUSE THIS SHOULD BE STATELESS
   * @param  {String}   roomId The id of the room
   * @param  {Object}   params   Additional parameters
   */
  leave (userId, roomId, params) {
    if (!userId || typeof userId !== 'string') {
      throw new Error('Invalid userId');
    }

    if (!roomId || typeof roomId !== 'string') {
      throw new Error('Invalid roomId');
    }

    const message = new LeaveMessage(userId, roomId, params);

    if (message) {
      return this.deferTransaction(message);
    }
  }

  /**
   * Gets IDs from active rooms in the system
   */
  getRooms () {
    const message = new GetRoomsMessage();

    if (message) {
      return this.deferTransaction(message);
    }
  }

  /**
   * Gets active users from a room
   * @param  {String}   roomId The id of the room
   */
  getUsers (roomId) {
    if (!roomId || typeof(roomId) !== 'string') {
      throw new Error('Invalid roomId');
    }

    const message = new GetUsersMessage(roomId);

    if (message) {
      return this.deferTransaction(message);
    }
  }

  /**
   * Gets medias from a user of the Media Control Server
   * @param  {String}   userId The id of theuser
   */
  getUserMedias (userId) {
    if (!userId || typeof(userId) !== 'string') {
      throw new Error('Invalid userId');
    }

    const message = new GetUserMediasMessage(userId);
    if (message) {
      return this.deferTransaction(message);
    }
  }

  /**
   * Mute a media of the Media Control Server
   * @param  {String}   mediaId The id of media to be muted
   */
  mute (mediaId) {
    if (!mediaId || typeof(mediaId) !== 'string') {
      throw new Error('Invalid mute mediaId');
    }

    const message = new MuteMessage(mediaId);
    if (message) {
      return this.deferTransaction(message);
    }
  }

  /**
   * Unmute a media of the Media Control Server
   * @param  {String}   mediaId The id of media to be unmuted
   */
  unmute (mediaId) {
    if (!mediaId || typeof(mediaId) !== 'string') {
      throw new Error('Invalid unmute mediaId');
    }

    const message = new UnmuteMessage(mediaId);
    if (message) {
      return this.deferTransaction(message);
    }
  }

  /**
   * Change volume of a media of the Media Control Server
   * @param  {String}   mediaId The id of media to be changed
   * @param  {Number}   volume New volume of the media
   */
  setVolume (mediaId, volume) {
    if (!mediaId || typeof(mediaId) !== 'string') {
      throw new Error('Invalid setVolume mediaId');
    }
    if (volume === null || typeof(volume) !== 'number') {
      throw new Error('Invalid volume type');
    }
    if (volume < 0 || volume > 100) {
      throw new Error('Invalid volume value');
    }

    const message = new SetVolumeMessage(mediaId, volume);
    if (message) {
      return this.deferTransaction(message);
    }
  }

  /**
   * Connect sourceMediaId to every mediaId present in sinkMediaIds in Media Control Server.
   * Any data in the source media will be redirected to the sinks
   * @param  {String}   sourceMediaId The id of the source media
   * @param {Array<String>}  mediaSinkIds destination media ids
   */
  connect (sourceMediaId, sinkMediaIds) {
    if (!sourceMediaId || typeof(sourceMediaId) !== 'string') {
      throw new Error('Invalid connect sourceMediaId');
    }
    if (sinkMediaIds === null || typeof(sinkMediaIds) !== 'object') {
      throw new Error('Invalid connect sinkMediaIds type');
    }
    sinkMediaIds.forEach(sinkId => {
      if (sinkId === null || typeof (sinkId) !== 'string') {
        throw new Error('Error : Invalid connect Sink Media ID');
      }
    });

    const message = new ConnectMessage(sourceMediaId, sinkMediaIds);
    if (message) {
      return this.deferTransaction(message);
    }
  }

  /**
   * Disconnect sourceMediaId from every mediaId present in sinkMediaIds in Media Control Server.
   * @param  {String}   sourceMediaId The id of the source media
   * @param {Array<String>}  mediaSinkIds destination media ids
   */
  disconnect (sourceMediaId, sinkMediaIds) {
    if (!sourceMediaId || typeof(sourceMediaId) !== 'string') {
      throw new Error('Invalid disconnect sourceMediaId');
    }
    if (sinkMediaIds === null || typeof(sinkMediaIds) !== 'object') {
      throw new Error('Invalid disconnect sinkMediaIds type');
    }
    sinkMediaIds.forEach(sinkId => {
      if (sinkId === null || typeof (sinkId) !== 'string') {
        throw new Error('Error : Invalid disconnect Sink Media ID');
      }
    });

    const message = new DisconnectMessage(sourceMediaId, sinkMediaIds);
    if (message) {
      return this.deferTransaction(message);
    }
  }

  /*
   * TODO docs
   */
  addIceCandidate (mediaId, candidate) {
    if (!mediaId || typeof(mediaId) !== 'string') {
      throw new Error('Error : invalid mediaId');
    }

    if (!candidate || typeof(candidate) !== 'object') {
      throw new Error('Error : invalid ICE candidate');
    }

    const message =
      new AddIceCandidateMessage(mediaId, candidate);

    if (message) {
      return this.deferTransaction(message);
    }
  }

  /*
   * TODO docs
   */
  onEvent (eventName, identifier, callback) {
    if (!eventName || typeof(eventName) !== 'string') {
      throw new Error('Error : invalid event name');
    }

    const message =
      new OnEvent(eventName, identifier);

    this._addEventCallback(eventName, identifier, callback);

    if (message) {
      return this.deferTransaction(message);
    }
  }

  /**
   *  TODO docs
   */
  dtmf (mediaId, digit) {
    if (!mediaId || typeof(mediaId) !== 'string') {
      throw new Error('Error : invalid event name');
    }

    if (!mediaId || typeof digit !== 'number') {
      throw new Error('Error: invalid digit');
    }

    const message =
      new DTMF(mediaId, digit);

    if (message) {
      return this.deferTransaction(message);
    }
  }

  startRecording (sourceMediaId, mediaId, recPath) {
    if (!sourceMediaId || typeof(sourceMediaId) !== 'string') {
      throw new Error('Invalid startRecording sourceMediaId');
    }
    if (!mediaId || typeof(mediaId) !== 'string') {
      throw new Error('Invalid startRecording mediaId');
    }
    if (!recPath || typeof(recPath) !== 'string') {
      throw new Error('Invalid startRecording recPath');
    }

    const message = new StartRecordingMessage(sourceMediaId, mediaId, recPath);
    if (message) {
      return this.deferTransaction(message);
    }
  }

  stopRecording (sourceMediaId) {

    if (!sourceMediaId || typeof(sourceMediaId) !== 'string') {
      throw new Error('Invalid startRecording sourceMediaId');
    }

    const message = new StopRecordingMessage(sourceMediaId);
    if (message) {
      return this.deferTransaction(message);
    }
  }
}

/**
 * @ignore
 */
MCSClient.prototype.send;

/**
 * @ignore
 */
MCSClient.prototype.createConnection;

module.exports = MCSClient;
