var mongoose = require('mongoose');
var schema = mongoose.Schema;

var tvshowSchema = new schema({
    title: {
        type:String,
        length:250,
        minlength:3,
        required:true
    },
    year: {
        type:Number
    },
    country: {
        type: String
    },
    seasons: {
        type:String
    },
    genre: {
        type:String,
        enum:["Drama", "Fantasy", "Comedy"]
    },
    summary: {
        type:String
    },
    creationdate: {
        type:Date,
        default: new Date()
    }

});

module.exports = mongoose.model("TVShow", tvshowSchema);
