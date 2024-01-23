const jwt = require("jsonwebtoken");
const { error } = require("../utils/responseWrapper");
const User = require("../models/User");
 

module.exports = async (req, res, next) => {
  //console.log("I am inside middleware");
  if (
    !req.headers ||
    !req.headers.authorization ||
 !req.headers.authorization.startsWith("Bearer")   
  ) {
    return res
      .status(401)
      .send("Unauthorized : authorization header not found");
  }
  const accessToken = req.headers.authorization.split(" ")[1];

  try {
    const  decoded  = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET) 
    
    req._id = decoded._id;
    const user = await User.findById(req._id)
    if (!user)
      return res.send(error(404,'user not found'))
    next();
  } catch (e) {
    console.log(e);
    return res.send(error(500, e.message));
  }

};

//* request contain multiple data like header, body, params, query
