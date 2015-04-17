/**
 * Created by Huynh on 4/15/2015.
 * Posts is a global variable and also the class for browser terminal
 */
Posts = new Mongo.Collection('posts');

Posts.allow({
    update: function(userId, post) { return ownsDocument(userId, post); },
    remove: function(userId, post) { return ownsDocument(userId, post); }
});

Posts.deny({
    update: function(userId, post, fieldNames) {
// may only edit the following two fields:
        return (_.without(fieldNames, 'url', 'title').length > 0);
    }
});



//starting Meteor methods
Meteor.methods({
    postInsert: function(postAttributes) {
        check(Meteor.userId(), String); //check to see if its a string
        check(postAttributes, {
            title: String,
            url: String
        }); //check to see that it contains a title and url string

        var postWithSameLink = Posts.findOne({url: postAttributes.url});
        if (postWithSameLink) {
            return {
                postExists: true,
                _id: postWithSameLink._id
            }
        }

        var user = Meteor.user();
        //_.extend Underscore package method
        var post = _.extend(postAttributes, {
            userId: user._id,
            author: user.username,
            submitted: new Date()
        });

        var postId = Posts.insert(post);

        return {
            _id: postId
        };
    }
});
