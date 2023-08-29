import { diskStorage } from 'multer';

export const storage = diskStorage({
  destination: './tmp',
  filename: (req, file, callback) => {
    const extension = file.originalname.split('.').pop();
    const filename = `${Date.now()}.${extension}`;
    callback(null, filename);
  },
});
