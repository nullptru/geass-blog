import fs from 'fs';
import multer from 'koa-multer';

export default (() => {
  const storage = multer.diskStorage({
    destination(req, file, cb) {
      const disk = '/Users/Geass/Desktop/Project/personal/front-end/blog/blog-server/imgs';
      const exists = fs.existsSync(disk);
      if (!exists) {
        fs.mkdir(disk, () => {
          cb(null, disk);
        });
      } else {
        cb(null, disk);
      }
    },
    filename(req, file, cb) {
      const fileFormat = (file.originalname).split('.');
      cb(null, `${Date.now()}.${fileFormat[fileFormat.length - 1]}`);
    },
  });
  return multer({ storage });
})();
