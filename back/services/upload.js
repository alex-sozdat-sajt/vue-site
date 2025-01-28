
import fs from 'fs';
import util from 'util';
import { pipeline } from 'stream';
import sharp from 'sharp';

const pump = util.promisify(pipeline)




export const uploadService = {
uploadFiles: async(parts, filesNum, width_300 = 300, width_700 = 700, arr_resized_300 = [], arr_resized_700 = [])=>{
    
    // const width_300 = 300;
    // const width_700 = 700;
    // const arr_resized_300 = ['1'];
      let index = 0;
    for await (const part of parts) {
      // console.log('Object.keys(parts).length', Object.keys(parts).length)
  //      for (const [index, num] of nums.entries()) {
           console.log('filesNum 0', `${filesNum}`);
       
 
       await pump(part.file, fs.createWriteStream(`./public/upload/${part.filename}`))
      //  const resized = resizeFile(part.filename, width_300, width_700)
      // async function resizeFile(filename, width_300, width_700) {
        // function resizeFile(filename, width_300, width_700) {
         await sharp(`./public/upload/${part.filename}`).resize(width_300).toFile(`./upload/resized_300-${part.filename}`);
         await sharp(`./public/upload/${part.filename}`).resize(width_700).toFile(`./upload/resized_700-${part.filename}`);
          arr_resized_300.push(`resized_300-${part.filename}`)
          arr_resized_700.push(`resized_700-${part.filename}`)
           console.log('arr_resized_300 1', arr_resized_300)
          //  console.log('arr_resized_700 1', arr_resized_700)
            console.log('Index 0:', `${index}`);
            index = index + 1;
         if (index === filesNum){
           console.log(`Index 1:  ${index} `, `filesNum 1:  ${filesNum}`);
           return  {'arr_resized_300': arr_resized_300, 'arr_resized_700': arr_resized_700}
        }
        

      //  }
      //  console.log('arr_resized_300 2', arr_resized_300.push('2'))
         
     }
    //  console.log('arr_resized_300 3', arr_resized_300)
    // console.log('filesUpload')
    //  return arr_resized_300
}

}