import jwt from "jsonwebtoken";

//this is used to check if the user that tries to change his profileinformation is the user he is sopposed to be
const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
    const { id, firstName, lastName, email } = decodedToken;
    req.user = { id, firstName, lastName, email };
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: "Something is wrong with your authorization!",
    });
  }
};

export default auth;
