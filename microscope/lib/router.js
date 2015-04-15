/**
 * Created by Huynh on 4/15/2015.
 */
/*In the client, we need to subscribe to the publication
 * Name must be the same as the one in /server/publication.js */
Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    waitOn: function() { return Meteor.subscribe('posts');}
});
//Name of the route will look for a template with the same name - postsList in this case
Router.route('/', {name: 'postsList'});