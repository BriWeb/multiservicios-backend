const path = require('path');
const {unlink} = require('fs-extra');

const Info = require('../model/Info');

const InfoController = () => {};

InfoController.Find = async (req, res) => {
    try {
        const result = await Info.find();
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(error);
    }
}

InfoController.UpdateAvatar = async (req, res) => {
    try {
        const avatarToAdd = '/uploads/' + req.file.filename;
        const info = await Info.find({}, {"avatar" : 1});
        const avatarToDelete = info[0].avatar;
        unlink(path.resolve('./src/public' + avatarToDelete));
        const result = await Info.updateOne({}, {$set: {"avatar" : avatarToAdd}});
        res.json(result);
    } catch (error) {
        res.status(400).json(error);
    }
}

InfoController.UpdateWallpaper = async (req, res) => {
    try {
        const wallpaperToAdd = '/uploads/' + req.file.filename;
        const info = await Info.find({}, {"wallpaper" : 1});
        const wallpaperToDelete = info[0].wallpaper;
        unlink(path.resolve('./src/public' + wallpaperToDelete));
        const result = await Info.updateOne({}, {$set: {"wallpaper" : wallpaperToAdd}});
        res.json(result);
    } catch (error) {
        res.status(400).json(error);
    }
}

InfoController.UpdateContent = async (req, res) => {
    try {
        const {datos} = req.body;
        const result = await Info.updateOne({"_id" : datos.id}, {$set: {"name" : datos.name, "description" : datos.description, "date" : datos.date}});
        res.json(result);
    } catch (error) {
        res.status(400).json(error);
    }
}

module.exports = {
    InfoController
};
