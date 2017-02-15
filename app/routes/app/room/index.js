import Ember from 'ember';

const {
  inject,
  get
} = Ember;

export default Ember.Route.extend({
  phoenix: inject.service(),
  model() {
    let roomRouteModel = this.modelFor('app.room');
    get(this, 'phoenix').connect(roomRouteModel.room.id);
    return roomRouteModel.room;
  }
});
