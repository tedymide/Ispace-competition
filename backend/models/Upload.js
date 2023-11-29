import mongoose from 'mongoose';

const uploadSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  // video: {
  //   type: String,
  //   required: true,
  // },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  user: {
     type: mongoose.Schema.Types.ObjectId,
      ref: 'User', 
      required: true 
    },
},
{
  timestamps: true,
}
);

const Upload = mongoose.model('Upload', uploadSchema);

export default Upload;