/**
 * Created by Huynh on 4/15/2015.
 *
 * setup Posts to be published in its entirety.
 * name does not need to be 'posts'
 */
Meteor.publish('posts', function() {
    return Posts.find();
});