import multer from "multer";
import crypto from "crypto";
import {extname, resolve} from "path";

export default {
    upload(folder: string){
        return {
            storage: multer.diskStorage({
                //destination: resolve(__dirname, '..', '..', 'files', 'img'),
                destination: resolve(__dirname, '..', 'files', 'img'),
                filename: (request, file, callback) => {
                    const fileHash = crypto.randomBytes(16).toString("hex");
                    const fileName = `${fileHash}-${file.originalname}`;

                    return callback(null, fileName);
                }
            })
        }
    }
}
    
    