/**
 * Created by MAC1 on 2015-04-24.
 */
Tracker.autorun(function(){
    if (Meteor.user() && !Meteor.loggingIn()) {
        var intercomSettings = {
            name: Meteor.user().username,
            email: Meteor.user().emails[0].address,
            created_at: Math.round(Meteor.user().createdAt/1000),
            favorite_color: _.sample(['blue','red','green','yellow']),
            app_id: "qgzveb1w"
        };
        Intercom('boot', intercomSettings);
    }
});

