const express =require('express');
const router=express.Router({mergeParams:true});
const Review=require('../models/review.js');
const AsyncWrap=require('../utility/wrapAsync.js');
const  ReviewController = require('../controllers/reviews.js');
const {isLoggedIn, isReviewAuthor,validateReview}  = require('../middleware.js');
router.post("/",isLoggedIn, validateReview,AsyncWrap(ReviewController.createReview));
router.delete('/:reviewId',isLoggedIn,isReviewAuthor,AsyncWrap(ReviewController.DestroyReview));
module.exports=router;