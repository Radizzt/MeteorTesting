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
        return [
            Meteor.subscribe('currentUser'),
            Meteor.subscribe('notifications')
        ]
    }
});

PostsListController = RouteController.extend({
    template: 'postsList',
    increment: 5,
    postsLimit: function() {
        return parseInt(this.params.postsLimit) || this.increment;
    },
    findOptions: function() {
        return {sort: this.sort, limit: this.postsLimit()};
    },
    subscriptions: function() {
        this.postsSub = Meteor.subscribe('posts', this.findOptions());
    },
    posts: function() {
        return Posts.find({}, this.findOptions());
    },
    data: function() {
        var hasMore = this.posts().count() === this.postsLimit();
        return {
            posts: this.posts(),
            ready: this.postsSub.ready,
            nextPath: hasMore ? this.nextPath() : null
        };
    }
});
NewPostsController = PostsListController.extend({
    sort: {submitted: -1, _id: -1},
    nextPath: function() {
        return Router.routes.newPosts.path({postsLimit: this.postsLimit() + this.increment})
    }
});
BestPostsController = PostsListController.extend({
    sort: {votes: -1, submitted: -1, _id: -1},
    nextPath: function() {
        return Router.routes.bestPosts.path({postsLimit: this.postsLimit() + this.increment})
    }
});

ClickedPostsController = PostsListController.extend({
    sort: {clicks: -1, submitted: -1, _id: -1},
    nextPath: function() {
        return Router.routes.clickedPosts.path({postsLimit: this.postsLimit() + this.increment})
    }
});

Router.route('/', {
    name: 'home',
    controller: NewPostsController
});
Router.route('/new/:postsLimit?', {name: 'newPosts'});
Router.route('/best/:postsLimit?', {name: 'bestPosts'});
Router.route('/clicked/:postsLimit?', {name: 'clickedPosts'});

//Name of the route will look for a template with the same name - postsPage in this case
Router.route('/posts/:_id', {
    name: 'postPage',
    waitOn: function() {
        return [
            Meteor.subscribe('singlePost', this.params._id),
            Meteor.subscribe('comments', this.params._id)
        ];
    },
    data: function() { return Posts.findOne(this.params._id); }
});

//Post Edit
Router.route('/posts/:_id/edit', {
    name: 'postEdit',
    waitOn: function() {
        return Meteor.subscribe('singlePost', this.params._id);
    },
    data: function() { return Posts.findOne(this.params._id); }
});


//Submit Route
Router.route('/submit', {name: 'postSubmit'});

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

Router.route('/feed.xml', {
    where: 'server',
    name: 'rss',
    action: function() {
        var feed = new RSS({
            title: "New Microscope Posts",
            description: "The latest posts from Microscope, the smallest news aggregator."
        });

        Posts.find({}, {sort: {submitted: -1}, limit: 20}).forEach(function(post) {
            feed.item({
                title: post.title,
                description: post.body,
                author: post.author,
                date: post.submitted,
                url: '/posts/' + post._id
            })
        });

        this.response.write(feed.xml());
        this.response.end();
    }
});

Router.route('/api/posts', {
    where: 'server',
    name: 'apiPosts',
    action: function() {
        var parameters = this.request.query,
            limit = !!parameters.limit ? parseInt(parameters.limit) : 20,
            data = Posts.find({}, {limit: limit, fields: {title: 1, author: 1, url: 1, submitted: 1 }}).fetch();
        this.response.write(JSON.stringify(data));
        this.response.end();
    }
});

Router.route('/api/posts/:_id', {
    where: 'server',
    name: 'apiPost',
    action: function() {
        var post = Posts.findOne(this.params._id);
        if(post){
            this.response.write(JSON.stringify(post));
        } else {
            this.response.writeHead(404, {'Content-Type': 'text/html'});
            this.response.write("Post not found.");
        }
        this.response.end();
    }
});

if (Meteor.isClient){
    Router.onBeforeAction('dataNotFound', {only: 'postPage'});
    Router.onBeforeAction(requireLogin, {only: 'postSubmit'});
}