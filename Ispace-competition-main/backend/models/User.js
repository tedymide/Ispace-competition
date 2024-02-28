import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    middlename: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: {type: String, required: true},
    level: { type: String, required: true },
    grade: { type: String, required: true },
    isAdmin: { type: Boolean, default: true, required: true },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);
export default User;