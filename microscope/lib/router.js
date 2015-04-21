/**
 * Created by Huynh on 4/15/2015.
 */
/*In the client, we need to subscribe to the publication
 * Name must be the same as the one in /server/publication.js */
Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function() {
        return [Meteor.subscribe('notifications')]
    }
});

PostsListController = RouteController.extend({
    template: 'postsList',
    increment: 5,
    postsLimit: function() {
        return parseInt(this.params.postsLimit) || this.increment;
    },
    findOptions: function() {
        return {sort: {submitted: -1}, limit: this.postsLimit()};
    },
    waitOn: function() {
        return Meteor.subscribe('posts', this.findOptions());
    },
    data: function() {
        return {posts: Posts.find({}, this.findOptions())};
    }
});

//Name of the route will look for a template with the same name - postsList in this case
Router.route('/posts/:_id', {
    name: 'postPage',
    waitOn: function() {
        return Meteor.subscribe('comments', this.params._id);
    },
    data: function() { return Posts.findOne(this.params._id); }
});

//Post Edit
Router.route('/posts/:_id/edit', {
    name: 'postEdit',
    data: function() { return Posts.findOne(this.params._id); }
});


//Submit Route
Router.route('/submit', {name: 'postSubmit'});

Router.route('/:postsLimit?', {
    name: 'postsList'
});

var requireLogin = function() {
    if (! Meteor.user()) {
        if (Meteor.loggingIn()) {
            this.render(this.loadingTemplate);
        } else {
            this.render('accessDenied');
        }
    } else {
        this.next();
    }
}

Router.onBeforeAction('dataNotFound', {only: 'postPage'});
Router.onBeforeAction(requireLogin, {only: 'postSubmit'});