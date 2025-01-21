import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import Fastify from 'fastify';
import staticF from '@fastify/static';
import multipart from '@fastify/multipart';
import util from 'util';
import { fileURLToPath } from 'url';
import { pipeline } from 'stream';
import sharp from 'sharp'

const pump = util.promisify(pipeline)

const fastify = Fastify({
  logger: true
})
fastify.register(multipart)
const dirname = path.dirname(fileURLToPath(import.meta.url));
fastify.register(staticF, { root: path.join(dirname, 'upload') });
 
fastify.options('/form', async function handler (request, reply) {
  reply.status(200);  
})
fastify.post('/form', function (request, reply) {
  console.log('request.body', request.body)
  const requestBody = request.body
  const dataInput = new dataFromFormModel({
      pageName: request.body.pageName,
      headlineOne: request.body.headlineOne,
      initialText: request.body.initialText,
      headlineTwo: request.body.headlineTwo,
      articleText: request.body.articleText,
      headlineThree: request.body.headlineThree,
      sectionText: request.body.sectionText,
      imageSmallUrl: request.body.imageSmallUrl,
      imageBigUrl: request.body.imageBigUrl,
    });
    dataInput.save();
    reply
     .code(200)
     .header('Content-Type', 'application/json; charset=utf-8')
     .send(request.body)
})
fastify.post('/formProductionTechnology', function (request, reply) {
  console.log('request.body', request.body)
  const requestBody = request.body
  const dataInput = new PageProductionTechnologyModel({
      pageName: request.body.pageName,
      headlineOne: request.body.headlineOne,
      initialText: request.body.initialText,
      headlineTwo: request.body.headlineTwo,
      articleText: request.body.articleText,
      headlineThree: request.body.headlineThree,
      sectionText: request.body.sectionText,
      imageSmallUrl: request.body.imageSmallUrl,
      imageBigUrl: request.body.imageBigUrl,
    });
    dataInput.save();
    reply
     .code(200)
     .header('Content-Type', 'application/json; charset=utf-8')
     .send(request.body)
})



fastify.get('/getpage', async function handler (request, reply) {

  const getpage  = await dataFromFormModel.find();
    reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send(getpage)
 
}) 
fastify.get('/getpageProductionTechnology', async function handler (request, reply) {

  const getpage  = await PageProductionTechnologyModel.find();
    reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send(getpage)
 
}) 

fastify.get('/', async function handler (request, reply) {
  
  return { hello: 'world' }

});


fastify.post('/singleFile', async function handler (request, reply) {
  //  const data = await request.file()
   const data = await request.file()
  console.log('data', data)
  console.log('data.file', data.file)
  console.log('data.fields', data.fields)
  console.log(' data.fieldname',  data.fieldname)
  console.log('data.filename', data.filename)
  console.log('data.encoding', data.encoding)
  console.log('data.mimetype', data.mimetype)
  const filename = data.filename
  
  const width_300 = 300;
  const width_700 = 700;
    // console.log('${path.resolve(./upload/)}', `${path.resolve('./upload/')}`)
  // console.log('${path.resolve(./public/upload/)}', `${path.resolve('./public/upload/')}`)
   await pump(data.file, fs.createWriteStream(`./public/upload/${filename}`))
   const resized = resizeFile(filename, width_300, width_700)
  console.log('resized', resized)
  //  function deleteFile(filename) {
  //   fs.unlinkSync(path.resolve(`./public/upload/${filename}`));
  // }
    async function resizeFile(filename, width_300, width_700) {
    await sharp(`./public/upload/${filename}`).resize(width_300).toFile(`./upload/resized_300-${filename}`);
    await sharp(`./public/upload/${filename}`).resize(width_700).toFile(`./upload/resized_700-${filename}`);
  
    // deleteFile(filename); удаляет загруженный файл, выдает ошибку
    return `resized_300-${filename}`;
  }
 
   // await pump(data.file, fs.createWriteStream(`./public/upload/${data.filename}`))
//  return { hello: 200 }
// return resized
reply.code(200).send({'small': `resized_300-${filename}`, 'big': `resized_700-${filename}`});
});
fastify.post('/uploadFiles', async function handler (request, reply) {
  try {
    const parts = request.files()
    for await (const part of parts) {
      console.log('part.filename', part.filename)
      // await pump(file.file, fs.createWriteStream(path.resolve(`./public/upload/${filename}`)));
       
      await pump(part.file, fs.createWriteStream(part.filename))
      console.log('part.filename', part.filename)
      reply.code(200).send('data');
    }
  } catch (err) {
    reply.send(err);
    console.log('Поймали ошибку! Вот она: ', err.message)
  }
   
  })
 
  
  
  // const data = request.files
  //  console.log('data', data.values())
  //  for (const file of data) {
  //   console.log('file 1', file)
  //   }
    // let filename = file.filename;
    // const uppp =  path.resolve(`./public/upload/${filename}`)
    // console.log('${path.resolve(./public/upload/)}', `${path.resolve('./public/upload/')}`)
   
    // await pump(file.file, fs.createWriteStream(`./public/upload/${filename}`));
     
    // if (width) filename = await resizeFile(filename, width);
    // if (isThumb) await createThumb(filename);

    // filesToUpload.push(filename);
 
  // console.log('request.body', request.body)
  // const filename = data.filename
  // const width_300 = 300;
  // const width_700 = 700;
  //   // console.log('${path.resolve(./upload/)}', `${path.resolve('./upload/')}`)
  // // console.log('${path.resolve(./public/upload/)}', `${path.resolve('./public/upload/')}`)
  //  await pump(data.file, fs.createWriteStream(`./public/upload/${filename}`))
  //  const resized = resizeFile(filename, width_300, width_700)
  // console.log('resized', resized)
  // //  function deleteFile(filename) {
  // //   fs.unlinkSync(path.resolve(`./public/upload/${filename}`));
  // // }
  //   async function resizeFile(filename, width_300, width_700) {
  //   await sharp(`./public/upload/${filename}`).resize(width_300).toFile(`./upload/resized_300-${filename}`);
  //   await sharp(`./public/upload/${filename}`).resize(width_700).toFile(`./upload/resized_700-${filename}`);
  
  //   // deleteFile(filename); удаляет загруженный файл, выдает ошибку
  //   return `resized_300-${filename}`;
  // }
 
   // await pump(data.file, fs.createWriteStream(`./public/upload/${data.filename}`))
//  return { hello: 200 }
// return resized
// reply.code(200).send({'small': `resized_300-${filename}`, 'big': `resized_700-${filename}`});
// reply.code(200).send(data);
// });



try {
  await fastify.listen({ port: 3000 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}
 
console.log(chalk.blue('Hello world!'));
console.log(chalk.green('Hello world!'));
console.log(chalk.red('Hello world!'));
 

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
  console.log(chalk.red('Connected to DB!'));
  
}


  const PageProductionTechnologyShema = new mongoose.Schema({
            pageName: String,
            headlineOne: String,
            initialText: String,
            headlineTwo: String,
            articleText: String,
            headlineThree: String,
            sectionText: String,
            imageSmallUrl: String,
            imageBigUrl: String,


  });
  const dataFromFormShema = new mongoose.Schema({
    pageName: String,
    headlineOne: String,
    initialText: String,
    headlineTwo: String,
    articleText: String,
    headlineThree: String,
    sectionText: String,
    imageSmallUrl: String,
    imageBigUrl: String,


});
  const PageProductionTechnologyModel = mongoose.model('PageProductionTechnologyModel', PageProductionTechnologyShema);
  const dataFromFormModel = mongoose.model('dataFromFormModel', dataFromFormShema);
  


  