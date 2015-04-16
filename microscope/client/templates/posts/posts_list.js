/**
 * Created by MAC1 on 2015-04-14.
 * Pulling data from the database and returning the value to postData
 */
Template.postsList.helpers({
    post: function() {
        return Posts.find({}, {sort: {submitted: -1}});
    }
});