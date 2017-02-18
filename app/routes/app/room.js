import Ember from 'ember';

const {
  get,
  inject,
  RSVP: { hash }
} = Ember;

export default Ember.Route.extend({
  flashMessages: inject.service(),
  phoenix: inject.service(),
  actions: {
    sendMessage() {
      let msg = this.get('currentModel.newMessage');
      let messageRecord = this.store.createRecord('message', {
        body: msg,
        room: this.get('currentModel.room')
      });
      messageRecord.save().then(() => {
        this.set('currentModel.newMessage', '');
      }).catch(() => {
        this.get('flashMessages').danger('problem posting message');
      });
    },
  },
  model() {
    return hash({
      room: this._super(...arguments),
      newMessage: ''
    });
  },
  afterModel(model) {
    this._super(...arguments);
    const socket = this.get('phoenix').connect();
    const channel = this.get('phoenix').joinChannel(`rooms:${get(model, 'room.id')}`);

    channel.on('ignore', () => console.log("auth_error"));
    channel.on('ok', () => console.log("join ok"));

    channel.on('new:message', (payload) => {
      let message = get(this, 'store').push(payload);
      this.get('currentModel.room.messages').addObject(message);
    });

    channel.on("user:entered", (msg) => {
      console.log('user:entered');
      console.log(msg);
    });
    return channel;
  }
});
