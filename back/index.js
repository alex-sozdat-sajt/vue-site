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

const pump = util.promisify(pipeline)

const fastify = Fastify({
  logger: true
})
fastify.register(multipart)
const dirname = path.dirname(fileURLToPath(import.meta.url));
fastify.register(staticF, { root: path.join(dirname, 'public') });
 
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
fastify.get('/', async function handler (request, reply) {
  
  return { hello: 'world' }

}) 
fastify.get('/getFhotoFromDb', async function handler (request, reply) {


  try {
    const data = fs.readFileSync('./upload/undefined.jpg', 'utf8');
    console.log(data);
    return data  
  } catch (err) {
    console.error(err);
  }

  console.log('test.txt', data); 


  console.log('foto2', foto); 
  reply.send({ hello: 'foto' }) 
 

}) 

fastify.post('/singleFile', async function handler (request, reply) {
 
  const data = await request.file()
  console.log('data', data)
  
  
  console.log('${path.resolve(./upload/)}', `${path.resolve('./upload/')}`)
  console.log('${path.resolve(./public/upload/)}', `${path.resolve('./public/upload/')}`)

  await pump(data.file, fs.createWriteStream(`./upload/${data.filename}`))

  
  
  
    return { hello: 200 }

})                

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


  const dataFromFormShema = new mongoose.Schema({
            pageName: String,
            headlineOne: String,
            initialText: String,
            headlineTwo: String,
            articleText: String,
            headlineThree: String,
            sectionText: String,
   


  });
  const dataFromFormModel = mongoose.model('dataFromFormModel', dataFromFormShema);
  


  