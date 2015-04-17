/**
 * Created by MAC1 on 2015-04-17.
 */
// Local (client- only) collection
Errors = new Mongo.Collection(null);

throwError = function(message){
    Errors.insert({message: message});
};