import PhoenixSocket from 'phoenix/services/phoenix-socket';
import Ember from 'ember';

const {
  inject,
  get
} = Ember;

export default PhoenixSocket.extend({
  store: inject.service(),
  session: inject.service(),
  init() {
    // You may listen to open, 'close' and 'error'
    this.on('open', () => {
      console.log('Socket was opened!');
    });
  },

  connect(/* id */) {
    const myjwt = get(this, 'session.session.content.authenticated.access_token');
    // connect the socket
    this._super('ws://localhost:4000/socket', {
      params: { token: myjwt }
    });
    // join a channel
    const channel = this.joinChannel(`rooms:lobby`, {
      user: get(this, 'session.currentUser.email')
    });

    channel.on('ignore', () => console.log("auth_error"));
    channel.on('ok', () => console.log("join ok"));

    channel.on('new:message', (msg) => {
      console.log('new:message');
      console.log(msg);
      get(this, 'store').push(msg);
      console.log('push messages into store');
    });

    channel.on("user:entered", (msg) => {
      console.log('user:entered');
      console.log(msg);
    });
  }
});
