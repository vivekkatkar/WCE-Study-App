const express = require('express');
const { signUp, sendOtp,login, changePassword } = require('../controllers/Auth');
const {resetPasswordToken, resetPassword} = require('../controllers/ResetPassword');
const { createCategory, showAllCategories, categoryPageDetails } = require('../controllers/Category');
const { auth, isInstructor ,isAdmin, isStudent} = require('../middlewares/Auth');
const { createCourse, showAllCourses, getCourseById, editCourse, updateCourseStatus, deleteCourse, studentEnrolledCourses, getFullCourseDetails, getInstructorCourses } = require('../controllers/Course');
const { getAllUserDetails, updateProfile, updateProfileImage, DeleteProfile, instructorDashboard } = require('../controllers/Profile');
const { createSection, deleteSection, updateSection } = require('../controllers/Section');
const { createSubSection, deleteSubSection, updateSubSection } = require('../controllers/SubSection');
const { createRating, getAllRating } = require('../controllers/RatingAndReview');
const { ContactUs } = require('../controllers/ContactUs');
const { verifyPayment, capturePayment, sendPaymentSuccessEmail } = require('../controllers/Payment');
const { updateCourseProgressDetails } = require('../controllers/courseProgress');

const router = express.Router();

router.post('/signup', signUp);
router.post('/sendotp',sendOtp);
router.post('/login',login);
router.post('/resetPasswordToken',resetPasswordToken);
router.post('/resetPassword',resetPassword);
// only admin creat categories 

router.post('/createCategory',auth, isAdmin , createCategory);

router.get('/getAllCategories',showAllCategories);
router.post('/getCategoryPageDetails',categoryPageDetails);
router.post('/createCourse',auth,isInstructor,createCourse);
router.post('/editCourse',auth,isInstructor,editCourse);
router.post('/updateCourseStatus',updateCourseStatus);
router.get('/showAllCourses',showAllCourses);
router.post('/deleteCourse',deleteCourse);
router.post('/getFullCourseDetails',auth,isStudent,getFullCourseDetails);
// router.get('/getAllCourses',showAllCourses);
router.get('/getAllUserDetails',auth,getAllUserDetails);

router.post('/updateProfile',auth,updateProfile);

router.post('/createSection',createSection);
router.post('/updateSection',updateSection);
router.post('/deleteSection',deleteSection);


router.post('/createSubSection',createSubSection);
router.post('/deleteSubSection',deleteSubSection);
router.post('/updateSubSection',updateSubSection);

router.delete('/deleteSection/:id',deleteSection);
router.post('/getCourseById',getCourseById);
router.post('/changePassword',auth,changePassword);
router.post('/createRating',auth,createRating);
router.post('/contact-us',ContactUs);
router.post('/updateProfileImage',auth,updateProfileImage)
router.delete('/delete-profile',auth,DeleteProfile);
//Payment
router.post('/verifySignature',auth,isStudent,verifyPayment);
router.post('/capturePayment',auth,isStudent,capturePayment);
router.post('/sendPaymentSuccessEmail',auth,isStudent,sendPaymentSuccessEmail);
router.get('/getReview',getAllRating);
//course Progress
router.post('/updateCourseProgressDetails',auth,isStudent,updateCourseProgressDetails);
router.post('/instructorDashboard',auth,instructorDashboard);
router.get('/getInstructorCourses',auth,getInstructorCourses);
//student enrolled courses
router.post('/studentEnrolledCourses',auth,isStudent,studentEnrolledCourses);
module.exports = router;



