import express from 'express';
import session from 'express-session';
import bcrypt from 'bcrypt'
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

userRouter.get('/login', async (req, res) => {
  const session=req.session;
  if(session.userid){
		res.redirect('/user/dashboard');
  }else{
	  res.render('login',{message:''})
  }
 
}
);

userRouter.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
      if (bcrypt.compare(req.body.password, user.password)) {
        /*
		res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user)
        });
        return;
		*/
	const data = {
          _id: user._id,
          name: user.lastname+" "+user.middlename+" "+user.firstname,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user)
        }
		console.log(data);
		var session=req.session;
		
        session.userid=user._id;
        session.name=user.lastname+" "+user.middlename+" "+user.firstname;
        session.email=user.email;
        session.gender=user.gender;
        console.log(req.session)
		
		res.redirect('/user/dashboard');
		//res.render('success',{data:data})
       }else{
		    res.render('login',{message:'invalid password'})
	   }
  }else{
     res.render('login',{message:'invalid email or password'})
  }
	// res.status(401).send({message: 'invalid email and password'})
}
);

userRouter.get('/dashboard', async (req, res) => {
  const session=req.session;
  if(session.userid){
		res.render('dashboard',{data:session})
  }else{
	  res.redirect('/user/login');
  }
  
}
);

userRouter.get('/aboutproject', async (req, res) => {
  const session=req.session;
  if(session.userid){
		res.render('aboutproject',{data:session})
  }else{
	  res.redirect('/user/login');
  }
  
}
);




userRouter.get('/register', async (req, res) => {
  const session=req.session;
  //session=req.session;
  if(session.userid){
		res.redirect('/user/dashboard');
  }else{
	  res.render('register',{message:''})
  }
 
}
);


userRouter.post(
  "/register",
 async (req, res) => {
	console.log("body ...")
	console.log(req.body)
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
     // res.status(400).send({message: "Email already exists..."});
	  res.render('register',{message: "Email already exists..."})
    }else{

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
	  
	   res.render('success',{message:''})
	}

  }
);

export default userRouter;