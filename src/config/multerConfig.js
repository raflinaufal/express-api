import multer from "multer";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";

// Mensimulasikan __dirname dalam modul ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mendefinisikan konfigurasi penyimpanan
const storage = multer.diskStorage({
  // Menentukan direktori tujuan untuk upload
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/uploads"));
  },
  // Menentukan format nama file yang di-upload
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err);
      cb(null, raw.toString("hex") + path.extname(file.originalname));
    });
  },
});

// Mendefinisikan batasan upload file dan validasi tipe file
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Batas ukuran file 5MB
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("Hanya gambar yang diperbolehkan"));
  },
});

export default upload;
