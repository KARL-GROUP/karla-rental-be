import multer from 'multer';

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './uploads/')
  },
  filename: function(req, file, cb){
    cb(null, new Date().toISOString() + '-' +file.originalname);
  }
});

const fileFilter = (req: any,file: any, cb: any) =>{
  if(ACCEPTED_IMAGE_TYPES.includes(file.mimetype)){
    cb(null,true)
  }else{
    cb({message: 'Unsupported file format'}, false);
  }

}

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
})

export default upload;