
import express from 'express'
import dotenv from 'dotenv';
import mongoose from 'mongoose'
import cors from'cors'
import user from './routes/User.js'
import cookieParser from'cookie-parser'
import upload from './routes/Upload.js'
import competition from './routes/Competition.js'
import bodyParser from 'body-parser';
import session from 'express-session';
//import logger from './logger/logger.js';


dotenv.config()


const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
//app.use(session({secret: 'ispace101',saveUninitialized: true,resave: true}));

const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    secret: 'ispace101',
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: true//false 
}));

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use('/user', user)
app.use("/competition", competition)



// connect to mongoDB
const URL = process.env.MONGODB_URL
mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err.message);
  });

// app.get('/',(req, res)=>{
//     res.json({msg:"welcome to home page"})
// })


const PORT = process.env.PORT || 5000
app.listen(PORT, () =>{
    console.log('server is running on port', PORT)
})


app.get('/', (req, res) => {
  res.render('index')
});

app.get('/index', (req, res) => {
  res.render('index')
});

/*
app.get('/success', (req, res) => {
  //logger.info('home route');
  res.render('success')
});
*/

app.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/');
});

app.get('/competitions-details', (req, res) => {
  res.render('competitions-details')
});

app.get('/coding-details', (req, res) => {
  res.render('coding-details')
});

app.get('/ccoding-details', (req, res) => {
  res.render('coding-details')
});

app.get('/design-details', (req, res) => {
  res.render('design-details')
});

app.get('/app-details', (req, res) => {
  res.render('app-details')
});

app.get('/virtual', (req, res) => {
  res.render('virtual')
});

app.get('/contact', (req, res) => {
  res.render('contact')
});

app.get('/intra-school', (req, res) => {
  res.render('intra-school')
});

app.get('/inter-school', (req, res) => {
  res.render('inter-school')
});

app.get('/virtual', (req, res) => {
  res.render('virtual')
});

app.get('/about', (req, res) => {
  res.render('about')
});



app.get('/aboutproject', (req, res) => {
  //logger.info('virtual route');
  res.render('aboutproject')
});


//app.use('/api', require('./routes/routes'));

// request to handle undefined or all other routes
app.get('*', (req, res) => {
  res.render('home');
});
