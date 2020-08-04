const {Schema, model} = require ('mongoose');


const ContactFormSchema = new Schema ({
    name: { 
        type: String,
        maxlength: 30,
        required: true
    },
    lastname: {
        type: String,
        maxlength: 30,
        required: true
    },
    location: {
        type: String,
        maxlength: 30,
        required: true
    },
    email: {
        type: String,
        maxlength: 60,
        required: true
    },
    phone: {
        type: String,
        maxlength: 25,
        required: true
    },
    photos: {
        type: Array,
        maxlength: 10
    },
    message: {
        type: String,
        maxlength: 3000,
        minlength: 50,
        required: true
    },
    read: {
        type: Boolean,
        default: false
    },
    writedAt: {
        type: Object
    }
}, {
    timestamps: true
})

module.exports = model('ContactForm', ContactFormSchema)