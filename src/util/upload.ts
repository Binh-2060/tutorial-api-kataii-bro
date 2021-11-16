import * as multer from 'multer';
import {diskStorage} from 'multer';
import {join} from 'path';


const upload = (directory: string = '') => multer({
    storage: diskStorage({
        destination: join(__dirname, '..', '..', `uploads/${directory}`),
        filename: (req, file, cb) => {
            const newFileName = file.originalname.trim().replace(' ', '').replace(',', '');
            cb(null, `${Date.now()}-${newFileName}`);
        }
    }),
});

export default upload;