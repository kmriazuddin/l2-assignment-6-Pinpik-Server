import { Request, Response } from "express";
import { uploadImageToImgur } from "./upload.service";

export const uploadImage = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    const buffer = req.file.buffer;
    const { response, result } = await uploadImageToImgur(buffer);

    if (response.ok) {
      return res.json(result);
    } else {
      return res.status(response.status).json(result);
    }
  } catch (error) {
    return res.status(500).json({ error: "Upload failed" });
  }
};
