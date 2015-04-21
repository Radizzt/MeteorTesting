/**
 * Created by Huynh on 4/21/2015.
 */
Template.postPage.helpers({
    comments: function() {
        return Comments.find({postId: this._id});
    }
});