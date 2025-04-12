import express from "express";
import { body } from 'express-validator';
import { infoUser, updateUser, changePassword, changeImage } from "../controllers/user.controller.js";
import { requireToken } from "../middlewares/requireToken.js";

const router = express.Router();

router.get('/info', requireToken,infoUser);//✅
router.patch('/update', requireToken,updateUser);//✅
router.put('/change-password', requireToken, changePassword);//✅
router.put('/change-image', requireToken, changeImage);//✅

export default router;

