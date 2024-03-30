const express=require('express');
const router=express.Router();                                         // the router converts the hhtp into get or post etc.
const User=require('../models/User');
const bcrypt = require('bcrypt');                                    // for hashing the password
const { body, validationResult } = require('express-validator');    // files included for using express validate
const jwt = require('jsonwebtoken');                                //Used to make webjson token
var fetchuser=require('../middleware/fetchuser')
const JWT_SECRET='fortoken';                                        //this is special code which will be added to token this code will identify that it is your special token and token will also contain data and other data with this secret code
// _SECRET is a fucntion which makes the associated code disappear so that no one can see it




// Route 1: creating a user using post. Doesn't require auth.. using post request
router.post('/createuser',[
// here we have use code form the express validate
  body('email').isEmail()
,body('password').isLength({ min: 5 }),
body('name').isLength({ min: 3 })],
async(req,res)=>{
  let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(40).json({ success,errors: errors.array() });
    }
// till this line whole code is copied from the website

// here we have made a user which is stored
let user=await User.findOne({email:req.body.email})
if(user){
  return res.status(400).json({success,error:"This email is already taken"})
}

const salt = bcrypt.genSaltSync(10);                //password hashing starts here
const hash = bcrypt.hashSync(req.body.password, salt);

try{
user=await User.create({
  name:req.body.name,
  password:hash,
  email:req.body.email
})

const data={
  user:{
    id:user.id
  }
}
const authtoken = jwt.sign(data,JWT_SECRET);     //in this we have made code which contains data which is id of the new user to identify the user from the token and JWT_SECRET which is used to identify that token is given or made by me



// THIS IS WRITTEN WHEN WE ARE NOT USING AWAIT FUNCTION AND USING ONLY BRUTE WAY TO DO THINGS
// .then(user=>res.json(user))
// .catch(err=>{console.log(err)
// res.json({error:'please enter a unique value for email'})})
success=true;
res.json({success,authtoken})   // this is written to get token as response and '{}' is used so that we get response as the object of the authjson

} catch (error){
  console.error(error.message);
  res.status(500).send("some error occured");
}
}
)


// Route 2:Authenticating a user using post using "api/auth/login". Doesn't require auth.. using post request
// that is here we are authenticating credentials of user who is trying to login the application

router.post('/login',[
  // here we have use code form the express validate
  body('email','enter a valid email').isEmail(),
  body('password','Password cannot be blank').exists()],
  async(req,res)=>{
  
    // if there are errors, return bad request and the errors 
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
  // till this line whole code is copied from the website

  const {email,password}= req.body;
  try{
    let user=await User.findOne({email});
    if(!user){
      const success=false;
      return res.status(400).json({success,errror:"Invalid email enter valid credentials"});}

    const passwordCompare=await bcrypt.compare(password,user.password);
    if(!passwordCompare){
      const success=false;
      return res.status(400).json({success,errror:"password Enter valid credentials"});}

    const data={          // here we have make a const named data in which we have stored computergeneterated id of user so we can make token for the user. you will be able to see tthis id when you are going to run this request on thunder client
      user:{
        id:user.id
      }
    }
    const authtoken = jwt.sign(data,JWT_SECRET);
    const success=true;
    res.json({success,authtoken})

  } catch (error){ 
    console.error(error.message);
    res.status(500).send("Internal server error occured");
  }
  }
  )

  // Route 3: get login user detail using: POST api/auth/getuser does require authentication
  router.post('/getuser',fetchuser,async (req,res)=>{      // here fetchuser is a middleware which is extratcing user data form the token and is calling next function 
  try{
    userId=req.user.id;          // the id of the user information is random and is assigned by the computer only not by ourselves it is same id which we used for making token for the user
    const user=await User.findById(userId).select("-password")
    res.send(user)
  }catch (error){
    console.error(error.message);
    res.status(500).send("Internal error occured");
  }
})
module.exports=router
