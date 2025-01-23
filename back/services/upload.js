
import fs from 'fs';
import util from 'util';
import { pipeline } from 'stream';
import sharp from 'sharp';

const pump = util.promisify(pipeline)

export const uploadService = {
uploadFiles: async(request)=>{
    const parts = request.files();
    const width_300 = 300;
    const width_700 = 700;
    const arr_resized_300 = []
    for await (const part of parts) {
     
          
       await pump(part.file, fs.createWriteStream(`./public/upload/${part.filename}`))
       const resized = resizeFile(part.filename, width_300, width_700)
       async function resizeFile(filename, width_300, width_700) {
         await sharp(`./public/upload/${filename}`).resize(width_300).toFile(`./upload/resized_300-${filename}`);
         await sharp(`./public/upload/${filename}`).resize(width_700).toFile(`./upload/resized_700-${filename}`);
          arr_resized_300.push(`resized_300-${filename}`)
       console.log('arr_resized_300', arr_resized_300)
       return arr_resized_300
       }
       return arr_resized_300
     }
    console.log('filesUpload')
    return arr_resized_300
}

}