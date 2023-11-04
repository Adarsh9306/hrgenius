const express = require("express");
const multer = require("multer");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        const filename = `${Date.now()}-${file.originalname}`;
        cb(null, filename);
    },
});

const upload = multer({ storage: storage });

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.post("/api/upload", upload.single("file"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded." });
    }

    const uploadedFile = req.file;
    const candidate = {
        name: "John Doe",
        skills: ["JavaScript", "React", "Node.js"],
        experience: 5,
    };

    res.json(candidate);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
