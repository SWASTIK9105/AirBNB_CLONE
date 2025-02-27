const express =require('express');
const router=express.Router();
const multer  = require('multer');
const {storage}=require('../cloudConfig.js')
const upload = multer({ storage});
const AsyncWrap=require('../utility/wrapAsync.js');
const { isLoggedIn, isOwner,validateListing } = require('../middleware.js');
const  ListingController = require('../controllers/listing.js');
router.route('/').get(AsyncWrap(ListingController.index)).post(isLoggedIn,upload.single('listing[image]'),validateListing,AsyncWrap(ListingController.CreateListing));
router.get('/new',isLoggedIn,ListingController.newListing);
router.route('/:id').get(AsyncWrap(ListingController.showListing)).put(isLoggedIn,isOwner,upload.single('listing[image]'),validateListing,AsyncWrap(ListingController.EditedListing)).delete(isLoggedIn,isOwner,AsyncWrap(ListingController.DeleteListing));
router.get('/:id/edit',isLoggedIn,isOwner,AsyncWrap(ListingController.EditListing));
module.exports=router;