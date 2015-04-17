/**
 * Created by MAC1 on 2015-04-17.
 */
Template.postEdit.events({
    'submit form': function(e) {
        e.preventDefault();
        var currentPostId = this._id;
        var postProperties = {
            url: $(e.target).find('[name=url]').val(),
            title: $(e.target).find('[name=title]').val()
        }

        var postWithSameLink = Posts.findOne({url: postProperties.url});
        if (postWithSameLink) {
            alert("Post URL exist");
            Router.go('postPage', {_id: currentPostId});
        }
        else
        {
            Posts.update(currentPostId, {$set: postProperties}, function(error) {
                if (error) {
// display the error to the user
                    alert(error.reason);
                } else {
                    Router.go('postPage', {_id: currentPostId});
                }
            });
        }
    },
    'click .delete': function(e) {
        e.preventDefault();
        if (confirm("Delete this post?")) {
            var currentPostId = this._id;
            Posts.remove(currentPostId);
            Router.go('postsList');
        }
    }
});