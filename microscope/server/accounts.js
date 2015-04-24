/**
 * Created by MAC1 on 2015-04-24.
 */
Accounts.onCreateUser(function(options, user) {
    user.intercomHash = IntercomHash(user, '727f3eabea43a284210c98ca2728b7464a7cb3c3');

    if (options.profile)
        user.profile = options.profile;

    return user;
});