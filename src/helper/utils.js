import multer from "multer";
const jwt = require('jsonwebtoken');
/**
 * @author NinhDang
 * @param {string} token 
 * @returns {Promise}
 */
const verifyJwtToken = (token, secretKey) => { //verifyJwtToken là một hàm dùng để xác thực token JWT
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                return reject(err);
            } else {
                resolve(decoded);
            }
        })
    })
}
/**
 * @description use multer library to upload image
 * @author NinhDang
 * @param {string} token 
 * @returns {Promise}
 */
const storageImg = multer.diskStorage({ // multer.diskStorage được sử dụng để cấu hình vị trí lưu trữ file và cách đặt tên cho các file được tải lên bằng cách sử dụng phương thức destination và filename:
    destination: function(req, file, cb) {
        cb(null, './public/images');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const storageVideo = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/videos');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
});

// fileFilterImg  hàm xác định loại file được phép upload. Nó là một middleware được sử dụng trong multer để xác định loại file được phép upload.
const fileFilterImg = (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
        cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
}

const fileFilterVideo = (req, file, cb) => {
    if(file.mimetype === 'video/mp4'){
        cb(null,true);
    }else{
        cb({message: 'Unsupported File Format'}, false)
    }
};

const uploadImage = multer({
    storage: storageImg,
    limits: {
        fileSize: 4096*4096,
    },
    fileFilter: fileFilterImg
}).single("image");

const uploadVideo = multer({
    storage: storageVideo,
    fileFilter: fileFilterVideo
}).single("video");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  }
});

// change the allowed upload type
const setAllowUploadType = (type) => {
  if (type === 'image') {
    uploadImage
  } else if (type === "video") {
    uploadVideo
  } else {
    throw new Error('Invalid upload type. Must be either image or video.');
  }
};
module.exports = { 
    verifyJwtToken,
    uploadImage,
    uploadVideo,
    setAllowUploadType
};
