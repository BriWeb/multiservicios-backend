const {Router} = require('express');
const router = Router();
const verifyToken = require('./verifyToken');
const validateEncoded = require('./validateEncoded');
const jwt = require('jsonwebtoken');

const User = require('../model/User');
const {GalleryController} = require('../controller/galleryController');
const {InfoController} = require('../controller/infoController');
const {ContactFormController} = require('../controller/contactFormController');


router.post('/login', validateEncoded, async(req, res) => {
    try {
        const {username, password} = req.user;

        const user = await User.findOne({"username" : username, "password" : password});
        if(!user){
            throw new Error("user don't exist")
        }else{
            const token = jwt.sign({id : user._id, name: user.name}, process.env.TOKEN_KEY, {expiresIn: 60 * 60 * 48});
            return res.status(200).json({auth: true, token: token, message: "token created"});
        }
    } catch (error) {
        console.log("error: ", error.message);
        res.status(401).json({auth: false, token: null, message: error.message});
    }
})

router.get('/whoami', verifyToken, async(req, res) => {
        console.log('Aproved user');
        res.status(200).json({auth : true, message: 'Aproved user'});
})

//GALLERY ROUTES
router.post('/gallery/add', verifyToken, GalleryController.Add)
router.delete('/gallery/del/:description', verifyToken, GalleryController.DeleteByDescription)
router.get('/gallery/findAll', GalleryController.FindAll)
router.get('/gallery/findOne/:description', verifyToken, GalleryController.FindOneByDescription)
router.put('/gallery/photo/add/:_idGallery', verifyToken, GalleryController.AddPhotos)
router.put('/gallery/photo/del/:_idGallery', verifyToken, GalleryController.DeletePhotos)
router.put('/gallery/collaborators/add/:_idGallery', verifyToken, GalleryController.AddCollaborators)
router.put('/gallery/collaborators/del/:_idGallery', verifyToken, GalleryController.DeleteCollaborators)
router.put('/gallery/description/upd/:_idGallery', verifyToken, GalleryController.UpdateDescription)

//USER INFO ROUTES
router.get('/info/find', InfoController.Find)
router.put('/info/photo/upd', verifyToken, InfoController.UpdateAvatar)
router.put('/info/wallpaper/upd', verifyToken, InfoController.UpdateWallpaper)
router.put('/info/content/upd', verifyToken, InfoController.UpdateContent)

//CONTACT FORM ROUTES
router.post('/contactForm/add', ContactFormController.Add)
router.put('/contactForm/photo/add/:id', ContactFormController.AddPhoto)
router.get('/contactForm/findAll', verifyToken, ContactFormController.FindAll)
router.get('/contactForm/findAll/readeds', verifyToken, ContactFormController.FindAllReadeds)
router.delete('/contactForm/del/:id', verifyToken, ContactFormController.DeleteById)
router.put('/contactForm/read/upd/:id', verifyToken, ContactFormController.UpdateRead)

module.exports = router;