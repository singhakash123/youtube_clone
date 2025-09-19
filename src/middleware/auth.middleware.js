import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";

export const verifyAccessToken = asyncHandler(async function (req, res, next) {
  const token =
    req.cookies?.accessToken ||
    req.headers.authorization?.replace("Bearer ", "").trim();

  if (!token) {
    throw new ApiError(401, "Access token is missing");
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      throw new ApiError(401, "Access token has expired, please login again");
    }
    if (err.name === "JsonWebTokenError") {
      throw new ApiError(401, "Invalid access token");
    }
    throw new ApiError(401, "Unauthorized access");
  }

  const user = await User.findById(decoded.id).select("-password");
  if (!user) {
    throw new ApiError(401, "User not found with this token");
  }

  req.user = user;
  next();
});

/*
⚡ Fayda:

Expired token → "Access token has expired, please login again"
Tampered/Invalid token → "Invalid access token"
AsyncHandler → error ko global error middleware me bhej dega

*/

/*
🔍 Step-by-Step Kya Ho Raha Hai

Token nikalna

const token =
  req.cookies?.accessToken ||
  req.headers.authorization?.replace("Bearer ", "").trim();
Agar token cookies me hai (frontend ne cookie set ki hai) → use kar lega.
Agar header me Authorization: Bearer <token> hai → usme se token nikal lega.



Token verify karna
const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
Token valid hai ya expire ho gaya check karega.
Agar valid hai, payload (decoded) return karega.


User ko database se find karna
const user = await User.findById(decoded.id).select("-password");
decoded.id ke basis pe user nikal raha hai.
-password ka matlab password field ko skip karna.

User ko request object pe attach karna
req.user = user;
next();

Ab baad ke controllers/middlewares req.user se logged-in user ko access kar sakte hain.
*/