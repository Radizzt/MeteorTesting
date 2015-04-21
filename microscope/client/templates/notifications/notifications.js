/**
 * Created by Huynh on 4/21/2015.
 */
Template.notifications.helpers({
    notifications: function() {
        return Notifications.find({userId: Meteor.userId(), read: false});
    },
    notificationCount: function(){
        return Notifications.find({userId: Meteor.userId(), read: false}).count();
    }
});
Template.notificationItem.helpers({
    notificationPostPath: function() {
        return Router.routes.postPage.path({_id: this.postId});
    }
});
Template.notificationItem.events({
    'click a': function() {
        Notifications.update(this._id, {$set: {read: true}});
    }
});