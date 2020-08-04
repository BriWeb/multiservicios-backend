const path = require('path');
const {unlink} = require('fs-extra'); //npm i fs-extra

const Gallery = require('../model/Gallery');
const GalleryController = () => {};

GalleryController.Add = async(req, res) => { 
    try{                         
        const {description, collaborators} = req.body;                                  
        const gallery = new Gallery({                   
            description,
            collaborators
        })
        const id = gallery._id;
        await gallery.save();
        res.status(201).json(id);
    }catch (error) {
        res.status(400).json(error);
    }
}

GalleryController.DeleteByDescription = async(req, res) => { 
    try {
        const {description} = req.params;
        const gallery = await Gallery.find({"description" : description});
        const photos = gallery[0].photos;
        photos.map( photo => unlink(path.resolve('./src/public' + photo)));
        const result = await Gallery.deleteOne({"description" : description});
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(error);
    }
}

GalleryController.FindAll = async (req, res) => {
    try {
        const galleries = await Gallery.find();
        if(galleries){
            res.status(200).json(galleries);
        }else{
            throw new Error("Lista de galerías no encontrada")
        }
    } catch (error) {
        console.log(error.message)
        res.status(404).json(error.message);
    }
}

GalleryController.FindOneByDescription = async (req, res) => {
    try {
        const {description} = req.params;
        const result = await Gallery.findOne({"description" : description}, {"createdAt" : 0, "updatedAt" : 0});
        if(result){
            res.status(200).json(result);
        }else{
            throw new Error("Galería no encontrada")
        }
    } catch (error) {
        console.log(error.message)
        res.status(404).json(error.message);
    }
}

GalleryController.AddPhotos = async (req, res) => {
    try {   
        const {_idGallery} = req.params;
        let imagePath = '/uploads/' + req.file.filename;
        await Gallery.updateOne({"_id" : _idGallery}, {$push: {"photos": imagePath}});  
        res.status(201).json({mensaje : "satisfactorio"});
    } catch (error) {
        res.status(400).json(error);
    }
}

GalleryController.DeletePhotos = async (req, res) => {
    try{
        const {_idGallery} = req.params;
        const {filesToDelete} = req.body;
        const result = await Gallery.updateOne({"_id" : _idGallery}, {$pullAll : {"photos" : filesToDelete}});
        filesToDelete.map( file => {
            unlink(path.resolve('./src/public' + file), () => console.log(`${file} borrado`)); 
        })
        res.status(201).json(result);
    }catch(error){
        res.status(400).json(error);
    }
}

GalleryController.AddCollaborators = async (req, res) => {
    try {
        const {_idGallery} = req.params;
        const {collaborators} = req.body;
        const result = await Gallery.updateOne({'_id' : _idGallery}, {$push: {'collaborators' : {$each: collaborators}}});
        res.status(201).json(result);

    } catch (error) {
        res.status(400).json(error);
    }
}

GalleryController.DeleteCollaborators = async (req, res) => {
    try {
        const {_idGallery} = req.params;
        const {collaborators} = req.body;
        const result = await Gallery.updateOne({'_id' : _idGallery}, {$pullAll: {'collaborators' : collaborators}});
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json(error);
    }
}

GalleryController.UpdateDescription = async (req, res) => {
    try {
        const {_idGallery} = req.params;
        const {description} = req.body;
        const result = await Gallery.updateOne({"_id" : _idGallery}, {$set:{"description" : description}});
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(error);
    }
}

module.exports = {
    GalleryController
};