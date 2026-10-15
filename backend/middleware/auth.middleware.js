import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
export const protectRoute = async (req, res, next) => {
  //1
  try {
    const access_token = req.cookies.access_token;
    //2
    if (!access_token) {
      return res.status(401).json({ message: "no access token provided" });
    }
    const decoded = jwt.verify(access_token, process.env.SECRET_ACCESS_TOKEN);
    const user = await User.findById(decoded.userId).select("-password");
    //3
    if (!user) {
      return res.status(401).json({ message: "user not found" });
    }
    //4
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectRoute middleware", error.message);
    res.status(401).json({ message: "Unauthorized - Access token expired" });
  }
};
export const adminRoute = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Access denied - Admin only" });
  }
};
