const {Schema, model} = require('mongoose');

const InfoSchema = new Schema({
    avatar : {
        type: String,
        required : true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date : {
        type: String,
        required: false
    },
    wallpaper : {
        type: String,
        required: true
    }
})

module.exports = model("Info", InfoSchema);