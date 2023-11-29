import express from 'express';
import bcrypt from 'bcryptjs'
import User from '../models/User.js';
import { generateToken } from '../lib/utils.js';

const userRouter = express.Router();



// userRouter.post('/login', async (req, res) => {
//   const user = await User.findOne({ email: req.body.email });
//   if (user) {
//       if (bcrypt.compare(req.body.password, user.password)) {
//         res.send({
//           _id: user._id,
//           name: user.name,
//           email: user.email,
//           isAdmin: user.isAdmin,
//           token: generateToken(user)
//         });
//         return;
//       }
//   }
//      res.status(401).send({message: 'invalid email and password'})
// }
// );


// userRouter.post(
//   "/register",
//  async (req, res) => {
//     const newUser = new User({
//       firstname: req.body.firstname,
//       middlename: req.body.middlename,
//       lastname: req.body.lastname,
//       email: req.body.email,
//       password: bcrypt.hashSync(req.body.password, 10),
//       gender: req.body.gender,
//       level: req.body.level,
//       grade: req.body.grade,
//     });
//     const userExist = await User.findOne({ email: req.body.email });
//     if(userExist){
//       res.status(400).send({message: "Email already exists..."});
//     }

//       const user = await newUser.save();
//       res.send({
//         _id: user._id,
//         firstname: user.firstname,
//         middlename: user.middlename,
//         lastname: user.lastname,
//         email: user.email,
//         gender: user.gender,
//         level: user.level,
//         grade: user.grade,
//         isAdmin: user.isAdmin,

//         token: generateToken(user),
//       });


//   }
// );

userRouter.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
      if (bcrypt.compare(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user)
        });
        return;
      }
  }
     res.status(401).send({message: 'invalid email and password'})
}
);

userRouter.post(
  "/register",
 async (req, res) => {
    const newUser = new User({
      firstname: req.body.firstname,
      middlename: req.body.middlename,
      lastname: req.body.lastname,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      gender: req.body.gender,
      level: req.body.level,
      grade: req.body.grade,
    });
    const userExist = await User.findOne({ email: req.body.email });
    if(userExist){
      res.status(400).send({message: "Email already exists..."});
    }

      const user = await newUser.save();
      res.send({
        _id: user._id,
        firstname: user.firstname,
        middlename: user.middlename,
        lastname: user.lastname,
        email: user.email,
        gender: user.gender,
        level: user.level,
        grade: user.grade,
        isAdmin: user.isAdmin,
        token: generateToken(user),
      });


  }
);

export default userRouter;