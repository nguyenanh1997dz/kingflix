const multer = require("multer");
const express = require("express");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const storage = require("../config/firebaseStorage");
const router = express.Router();
const { HandleError } = require("../middleware/error");
const upload = multer({
  storage: multer.memoryStorage(),
});
router.post("/", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    if (file) {
      const fileName = `${uuidv4()}${path.extname(file.originalname)}`;
      const blob = storage.file(fileName);
      const blobStream = blob.createWriteStream({
        resumable: false,
        metadata: {
          contentType: file.mimetype,
        },
      });
      blobStream.on("error", (error) => {
        throw new Error(400,`Error uploading file: ${error.message}`);
      });
      blobStream.on("finish", () => {
        const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${storage.name}/o/${fileName}?alt=media`;
        res.json(publicUrl)
      });
      blobStream.end(file.buffer);
    } else {
      throw new Error("No file uploaded.");
    }
  } catch (error) {
    throw new HandleError(400, error.message);
  }
});


router.get("/movie/:fileName", async (req, res) => {
  const { fileName } = req.params;
  try {
    const tempFilePath = path.join(__dirname, fileName)
    const options = {
      destination: tempFilePath
    };
    await storage.file(fileName).download(options);
    res.sendFile(tempFilePath, (err) => {
      if (err) {
        res.status(500).send('Error sending the file');
      } else {
        fs.unlink(tempFilePath, (err) => {
          if (err) {
            console.error('Error deleting the temporary file:', err);
          }
        });
      }
    });
  } catch (error) {
    console.error('Error downloading the file:', error);
    res.status(500).send('Error downloading the file');
  }
});

router.get("/movie/:fileName", async (req, res) => {
  try {
   
  } catch (error) {
    throw new HandleError(400, error.message);
  }
});
module.exports = router;
