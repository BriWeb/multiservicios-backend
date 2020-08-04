const {Schema, model} = require ('mongoose');

const GallerySchema = new Schema ({
    description: { 
        type: String, 
        required: true
    },
    photos: {
        type: Array,
        required: true
    },
    collaborators: {
        type: Array
    }
}, {
    timestamps: true
})

module.exports = model('Gallery', GallerySchema)