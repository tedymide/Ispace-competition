
import express from 'express';
import cloudinary from '../lib/cloudinary.js';
import multer from 'multer';
import Upload from '../models/Upload.js';
import { isAuth } from '../lib/utils.js'
import expressAsyncHandler from 'express-async-handler';

const router = express.Router();


        async function handleUpload(file) {
          const res = await cloudinary.uploader.upload(file, {
            resourse_type: "video",
            upload_preset:"images_preset",
            max_file_size: 500000000,
        });
        return res;

        }
        
        const storage = new multer.memoryStorage()
        const image = multer({
          storage,
        })

        router.post('/images', image.single("my_file"), isAuth, async (req, res) => {
            const name = req.body.name
            const description = req.body.description
          try {
            const b64 = Buffer.from(req.file.buffer).toString("base64");
            let dataURI = "data:" + req.file.mimetype + ";base64," + b64
            const cldRes = await handleUpload(dataURI);
            if(cldRes){
              const upload = new Upload({
                    image: cldRes.secure_url || '',
                    name: name || '',
                    description: description || '',
                    user: req.user._id,
                
        })
        const savedUploads = await upload.save()
        res.status(200).send(savedUploads)
            }

          } catch (error) {
            console.log(error)

            
          }
        })





const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fieldNameSize: 200,
    fileSize: 500 * 1024 * 1024, // 500 MB limit for video size
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(
        {
          message: 'Unsupported File Format. Please upload a video file.',
        },
        false
      );
    }
  },
}).single('video');

router.post('/video', async (req, res) => {
  try {
    await new Promise((resolve, reject) => {
      upload(req, res, (err) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });

    if (!req.file) {
      return res.status(400).send({ error: 'No video file uploaded.' });
    }

    const fileBuffer = req.file.buffer.toString('base64')

    const cldRes = cloudinary.uploader.upload(fileBuffer, {
      resource_type: 'video',
      upload_preset: 'videos_preset', // Replace with your upload preset name
    });

    const result = cldRes.secure_url

    const newUpload = new Upload({
      video: result || '',

    });

    const savedUpload = await newUpload.save();

    res.status(200).send(savedUpload);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});


router.get('/getUploads', async(req, res) =>{
    try {
        const uploads = await Upload.find({})
        res.status(200).send(uploads)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }

})


router.get('/getUpload', async(req, res) =>{
  try {
      const upload = await Upload.find({})
      res.status(200).send(upload)
  } catch (error) {
      console.log(error)
      res.status(500).send(error)
  }

})


router.delete(
  '/:id',
async (req, res) => {
    const upload = await Upload.findById(req.params.id);
    if (upload) {
      await upload.remove();
      res.send({ message: 'Upload Deleted' });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  });

  router.get(
    '/mine',
    isAuth,
    expressAsyncHandler(async (req, res) => {
      const uploads = await Upload.find({ user: req.user._id });
      res.send(uploads);
    })
  );

export default router;


