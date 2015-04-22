/**
 * Created by Huynh on 4/22/2015.
 */
Template.layout.onRendered(function() {
    this.find('#main')._uihooks = {
        insertElement: function(node, next) {
            $(node)
                .hide()
                .insertBefore(next)
                .fadeIn();
        },
        //remove element method
        removeElement: function(node) {
            $(node).fadeOut(function() {
                $(this).remove();
            });
        }
    }
});