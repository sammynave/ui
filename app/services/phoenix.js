import PhoenixSocket from 'phoenix/services/phoenix-socket';
import Ember from 'ember';
import config from 'ui/config/environment';

const {
  inject,
  get
} = Ember;

export default PhoenixSocket.extend({
  session: inject.service(),

  connect() {
    const myjwt = get(this, 'session.session.content.authenticated.access_token');
    this._super(config.DS.ws, {
      params: { guardian_token: myjwt }
    });
  }
});
