/**
 * Created by Huynh on 4/15/2015.
 */
Router.configure({
    layoutTemplate: 'layout'
});
//Name of the route will look for a template with the same name - postsList in this case
Router.route('/', {name: 'postsList'});