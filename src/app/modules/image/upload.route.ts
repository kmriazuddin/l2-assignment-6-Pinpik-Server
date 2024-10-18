import express from "express";
import multer from "multer";
import { uploadImage } from "./upload.controller";

const router = express.Router();

const upload = multer();

router.post('/upload', upload.single('image'), uploadImage)

export const uploadImageRoute = router;
