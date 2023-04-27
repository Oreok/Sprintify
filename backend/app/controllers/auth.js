import tryCatch from "./utils/tryCatch.js";
import { decodeRegistrationToken } from "./utils/authUtils.js";
import User from "../models/user.js";

//verify the user (email) and set his active tag on true
export const verify = tryCatch(async (req, res) => {
  const decode = decodeRegistrationToken(req.params.token);
  if (decode.toString().includes("Unexpected token") || decode.error !== undefined) {
    return res
      .status(400)
      .json({ success: false, message: "Dieser Link ist ungültig", result: "link_invalid" });
  } else if (decode.toString().includes("TokenExpiredError")) {
    return res
      .status(400)
      .json({ success: false, message: "Dieser Link ist abgelaufen", result: "token_expired" });
  } else {
    //check if token is expired
    if (!decode.expired) {
      //find the user by Id in the database an set this active tag on true
      const ver = await User.findByIdAndUpdate(decode.id, { active: true });
      return res.status(201).json({ success: true, message: "activated", result: "activated" });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Token expired", result: "token_expired" });
    }
  }
});
