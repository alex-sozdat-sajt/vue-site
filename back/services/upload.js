
import fs from 'fs';
import util from 'util';
import { pipeline } from 'stream';
import sharp from 'sharp';

const pump = util.promisify(pipeline)

// const getData = async (url) => {
//   const response = await fetch(url);
//   const jsonObj = await response.json();
//   return jsonObj;
     
// }
// const json = getData(url);
// getData(url).then(response => {
// console.log(response);
// });



export const uploadService = {
uploadFiles: async(parts, width_300 = 300, width_700 = 700, arr_resized_300 = [])=>{
    
    // const width_300 = 300;
    // const width_700 = 700;
    // const arr_resized_300 = ['1'];
     let index = 0;
    for await (const part of parts) {
      // console.log('Object.keys(parts).length', Object.keys(parts).length)
  //      for (const [index, num] of nums.entries()) {
  // console.log(`Index: ${index}, Value: ${num}`);}
       
 
       await pump(part.file, fs.createWriteStream(`./public/upload/${part.filename}`))
      //  const resized = resizeFile(part.filename, width_300, width_700)
      // async function resizeFile(filename, width_300, width_700) {
        // function resizeFile(filename, width_300, width_700) {
         await sharp(`./public/upload/${part.filename}`).resize(width_300).toFile(`./upload/resized_300-${part.filename}`);
         await sharp(`./public/upload/${part.filename}`).resize(width_700).toFile(`./upload/resized_700-${part.filename}`);
          arr_resized_300.push(`resized_300-${part.filename}`)
           console.log('arr_resized_300 1', arr_resized_300)
            index = index + 1;
         if (index === 2){
          console.log(`Index: ${index}`);
           return  arr_resized_300  
        }
        

      //  }
      //  console.log('arr_resized_300 2', arr_resized_300.push('2'))
         
     }
    //  console.log('arr_resized_300 3', arr_resized_300)
    // console.log('filesUpload')
    //  return arr_resized_300
}

}