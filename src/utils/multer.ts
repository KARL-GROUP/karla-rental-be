import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    // async code using `req` and `file`
    // ...
    return {
      folder: "karl-rental/cars",
      format: file.mimetype.split('/')[1],
      public_id: new Date().toISOString() + "-" + file.originalname,
    };
  },
});

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, new Date().toISOString() + "-" + file.originalname);
//   },
// });

const fileFilter = (req: any, file: any, cb: any) => {
  if (ACCEPTED_IMAGE_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      {
        message: `Unsupported file format! File must be one of [${ACCEPTED_IMAGE_TYPES.join(
          ", "
        )}]`,
      },
      false
    );
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

export default upload;
