import jwt from "jsonwebtoken";

//this function is used to check if the user has the right permissions to access a route
const checkAccess = (permission) => {
  return async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];

      const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
      const { id, firstName, lastName, email, role } = decodedToken;

      if (permission.roles.includes(role)) return next();
      if (!permission?.admin)
        return res
          .status(401)
          .json({ success: false, message: "Zugriff verweigert!" });

      const isAdmin = await permission.admin(req);
      if (isAdmin === true) return next();
      if (isAdmin === false)
        return res
          .status(401)
          .json({ success: false, message: "Zugriff verweigert!" });
      res.status(500).json({
        success: false,
        message: "Authentifizierung fehlgeschlagen!",
      });
    } catch (error) {
      console.log(error);
      res.status(401).json({
        success: false,
        message: "Authentifizierung fehlgeschlagen!",
      });
    }
  };
};

export default checkAccess;
