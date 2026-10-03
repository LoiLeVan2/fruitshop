import express from "express";
import multer from "multer";
import { addFood, listFood, removeFood } from "../controllers/foodController.js";
import authMiddleware from "../middleware/auth.js";

const foodRouter = express.Router();

// Image Storage Engine

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})

const upload = multer({ storage: storage })

foodRouter.post("/add", authMiddleware, upload.single("image"), addFood);
foodRouter.post("/remove", authMiddleware, removeFood);
foodRouter.get("/list", listFood);




export default foodRouter;




