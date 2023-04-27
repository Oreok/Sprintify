import jwt from "jsonwebtoken";
import User from "../../models/user.js";

export const encodeRegistrationToken = async (email) => {

  //find user with email to get the unique id
  const user = await User.findOne({ email: email }).exec();
  //create payload with id
  const payload = { id: user._id };
  //sign id with a jwt
  const token = await jwt.sign(payload, process.env.JWT_TOKEN, {
    expiresIn: "15m",
  });
  return token;
};

export const decodeRegistrationToken = (token) => {
  try {
    //decode&verify the token to get the user id
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    // User registered in time
    return decoded;
  } catch (err) {
    return { error: err.message };
  }
};
