/**
 * Created by Huynh on 4/15/2015.
 *
 * setup Posts to be published in its entirety.
 * name does not need to be 'posts'
 */
Meteor.publish('posts', function(options) {
    check(options, {
        sort: Object,
        limit: Number
    });
    return Posts.find({}, options);
});

Meteor.publish('comments', function(postId) {
    check(postId, String);
    return Comments.find({postId: postId});
});

Meteor.publish('notifications', function() {
    return Notifications.find({userId: this.userId, read: false});
});