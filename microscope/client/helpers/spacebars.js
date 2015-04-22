/**
 * Created by Huynh on 4/22/2015.
 */
Template.registerHelper('pluralize', function(n, thing) {
// fairly stupid pluralizer
    if (n === 1) {
        return '1 ' + thing;
    } else {
        return n + ' ' + thing + 's';
    }
});