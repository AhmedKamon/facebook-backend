const uploader = require('../utiltels/imageUpload');

function imageUpload(req, res, next) {
  const upload = uploader(
    'images',
    ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'],
    10000000,
    'Only .jpg, jpeg and .png, .pdf format allowed!'
  );

  // call the middleware function
  upload.any()(req, res, (err) => {
    if (err) {
      res.status(500).json({
        errors: {
          img: {
            msg: err,
          },
        },
      });
    } else {
      next();
    }
  });
}

module.exports = imageUpload;
