import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import redis from "../lib/redis.js";
// generate tokens using jwt
const generateToken = (userId) => {
  const access_token = jwt.sign({ userId }, process.env.SECRET_ACCESS_TOKEN, {
    expiresIn: "15m",
  });
  const refresh_token = jwt.sign({ userId }, process.env.SECRET_REFRESH_TOKEN, {
    expiresIn: "7d",
  });
  return {
    access_token,
    refresh_token,
  };
};
// store refresh_token in redis
const storeToken = async (userId, refresh_token) => {
  return redis.set(
    `refresh_token:${userId}`,
    refresh_token,
    "EX",
    7 * 24 * 60 * 60,
  );
};
// set cookies
const setCookies = (res, access_token, refresh_token) => {
  res.cookie("access_token", access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000,
  });
  res.cookie("refresh_token", refresh_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};
/* ----------------------------------------------- sign up ------------------------------------------ */
export const signup = async (req, res) => {
  //1
  const { name, email, password } = req.body;

  try {
    //2
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "user already exists" });
    }
    //3
    const user = await User.create({ name, email, password });
    //4
    const { access_token, refresh_token } = generateToken(user._id);
    //5
    await storeToken(user._id, refresh_token);
    //6
    setCookies(res, access_token, refresh_token);
    //7
    res.status(201).json({
      id: user._id,
      name,
      email,
      role: user.role,
    });
  } catch (error) {
    console.log("error in sign up", error.message);
    res.status(500).json({ message: error.message });
  }
};
/* ----------------------------------------------- login ------------------------------------------ */
export const login = async (req, res) => {
  //1
  const { email, password } = req.body;

  try {
    //2
    const user = await User.findOne({ email });
    if (!(user && (await user.comparePassword(password)))) {
      return res.status(400).json({ message: "invalid email or password" });
    }
    //4
    const { access_token, refresh_token } = generateToken(user._id);
    //5
    await storeToken(user._id, refresh_token);
    //6
    setCookies(res, access_token, refresh_token);
    //7
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.log("error in login", error.message);
    res.status(500).json({ message: "error in server" });
  }
};
/* ----------------------------------------------- logout ------------------------------------------ */
export const logout = async (req, res) => {
  //1
  const refresh_token = req.cookies.refresh_token;

  try {
    //2
    if (refresh_token) {
      try {
        const decoded = jwt.verify(
          refresh_token,
          process.env.SECRET_REFRESH_TOKEN,
        );
        await redis.del(`refresh_token:${decoded.userId}`);
      } catch (error) {
        console.log("refresh_token is not valid or maby expired");
      }
    }
    res.clearCookie("access_token", {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
    res.clearCookie("refresh_token", {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
    res.status(200).json({ message: "logged out successfully" });
  } catch (error) {
    console.log("error in logout", error.message);
    res.status(500).json({ message: "error in server" });
  }
};
/* ----------------------------------------------- refresh token ------------------------------------------ */
export const refreshToken = async (req, res) => {
  const refresh_token = req.cookies.refresh_token;
  try {
    if (!refresh_token) {
      return res.status(401).json({ message: "no refresh token provided" });
    }
    const decoded = jwt.verify(refresh_token, process.env.SECRET_REFRESH_TOKEN);
    const storedToken = await redis.get(`refresh_token:${decoded.userId}`);
    if (storedToken !== refresh_token) {
      return res.status(401).json({ message: "invalid refresh token" });
    }
    const access_token = jwt.sign(
      { userId: decoded.userId },
      process.env.SECRET_ACCESS_TOKEN,
      {
        expiresIn: "15m",
      },
    );
    res.cookie("access_token", access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });
    res.status(200).json({ message: "Token refreshed successfully" });
  } catch (error) {
    res
      .status(401)
      .json({ message: "Invalid or expired refresh token refresh token" });
    console.log("invalid Error in refreshToken controller:", error.message);
  }
};
/* ----------------------------------------------- profile ------------------------------------------ */
export const profile = async (req, res) => {
  try {
    res.status(201).json(req.user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.log("invalid Error in profile controller:", error.message);
  }
};
