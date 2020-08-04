const {unlink} = require('fs-extra');
const path = require('path');

const ContactForm = require('../model/ContactForm');

const ContactFormController = () => {};

ContactFormController.Add = async (req, res) => {
    try {
        console.log("entró")
        const {name, lastname, location, email, phone, message} = req.body;

        const date = new Date();

        const writedAt = {
            hour: date.getHours(),
            minute: date.getMinutes(),
            day: date.getDay(),
            date: date.getDate(),
            month: date.getMonth(),
            year: date.getFullYear()
        }

        const contactForm = new ContactForm({                   
            name : name,
            lastname : lastname,
            location : location,
            email : email,
            phone : phone,
            message : message,
            writedAt : writedAt
        });
        
        const id = contactForm._id;
        await contactForm.save();
        res.status(200).json(id);
    } catch (error) {
        res.status(400).json(error);
    }
}

ContactFormController.AddPhoto = async (req, res) => {
    try {
        const id = req.params.id;
        const imagePath = '/uploads/' + req.file.filename;
        const result = await ContactForm.updateOne({"_id" : id}, {$push: {"photos": imagePath}});  
        res.json(result);
    } catch (error) {
        res.status(400).json(error);
    }
}

ContactFormController.FindAll = async (req, res) => {
    try {
        const formularies = await ContactForm.find();
        res.json(formularies);
    } catch (error) {
        res.status(400).json(error);
    }
}

ContactFormController.FindAllReadeds = async (req, res) => {
    try {
        const readeds = await ContactForm.find({}, {"read" : 1});
        res.json(readeds);
    } catch (error) {
        res.status(400).json(error);
    }
}

ContactFormController.DeleteById = async (req, res) => {
    try {
        const id = req.params.id;
        const formulary = await ContactForm.find({"_id" : id}, {"photos" : 1});
        const photos = formulary[0].photos;
        photos.map( photo => unlink(path.resolve('./src/public' + photo)));
        const result = await ContactForm.deleteOne({"_id" : id});
        res.json(result);
    } catch (error) {
        res.status(400).json(error);
    }
}

ContactFormController.UpdateRead = async (req, res) => {
    try{
        const id = req.params.id;
        const formulary = await ContactForm.find({"_id" : id}, {"read" : 1});
        console.log(formulary)
        const newBoolean = !formulary[0].read;
        const result = await ContactForm.updateOne({"_id" : id}, {$set: {"read" : newBoolean}});
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json(error);
    }
}

module.exports = {
    ContactFormController
};
