import fs from 'fs';
import multer from 'koa-multer';

export default (() => {
  const storage = multer.diskStorage({
    destination(req, file, cb) {
      const exists = fs.existsSync('/tmp/my-uploads');
      if (!exists) {
        fs.mkdir('/tmp/my-uploads', () => {
          cb(null, '/tmp/my-uploads');
        });
      } else {
        cb(null, '/tmp/my-uploads');
      }
    },
    filename(req, file, cb) {
      const fileFormat = (file.originalname).split('.');
      cb(null, `${Date.now()}.${fileFormat[fileFormat.length - 1]}`);
    },
  });
  return multer({ storage });
})();
