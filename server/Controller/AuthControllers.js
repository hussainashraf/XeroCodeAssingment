const UserModel = require("../models/UserModel");
const redis = require("redis");
const jwt = require("jsonwebtoken");
const maxAge = 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "hussainashraf", {
    expiresIn: maxAge,
  });
};

const rediscl = redis.createClient();
rediscl.connect();
rediscl.on("connect", function () {
  console.log("Redis plugged in.");
});
const handleErrors = (err) => {
  let errors = { email: "", password: "", name: "" };

  if (err.message === "Incorrect email") {
    errors.email = "That Email is not registered";
  }
  if (err.message === "Incorrect password") {
    errors.password = "Password is not Correct";
  }
  if (err.code === 11000) {
    errors.email = "Email is Already Registered";
    return errors;
  }
  if (err.message.includes("User Validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};
module.exports.register = async (req, res, next) => {
  try {
    const { name, password, email } = req.body;
    const user = await UserModel.create({ name, password, email });
    const token = createToken(user._id);
    console.log("tttt", token);
    rediscl.set(`jwt:${user._id}`, token, "EX", maxAge);
    // res.cookie("jwt", token, {
    //   withCrdentials: true,
    //   httpOnly: false,
    //   maxAge: maxAge * 1000,
    // });
    // rediscl.quit();
    res.status(201).json({ user: user._id, created: true });
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.json({ errors, created: false });
  }
};
module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log("req body", req.body); // Corrected 'req.bodya' to 'req.body'
    console.log(password, email);
    const user = await UserModel.login(email, password);
    const jwtCookie = await rediscl.GET(`jwt:${user._id}`);
    console.log("JWT", jwtCookie);
    if (jwtCookie) {
    //    Create new JWT
    //    const token = createToken(user._id);
    //    rediscl.set(`jwt:${user._id}`, token, "EX", maxAge);
       res.cookie("jwt", jwtCookie, {
         withCredentials: true,
         httpOnly: false,
         maxAge: maxAge * 1000,
       });
    }

    // rediscl.quit();
    res.status(200).json({ user: user._id, created: true });
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.json({ errors, created: false });
  }

  
//   module.exports.hosting=async(req,res,next)=>


};

async function saveDataToMongoDB(userId, option, value) {
    try {
      const savedData = await UserModel.create({
        userId,
        option,
        value,
      });
      return savedData;
    } catch (error) {
      throw error;
    }
  }
  

//   module.exports = 
// // saveDataToMongoDB
    // ... (Other controller functions)