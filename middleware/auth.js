import jwt from "jsonwebtoken";

// ✅ Verify Token (protect routes)
export const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json("Access denied. No token provided");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // store user info
    next();
  } catch (err) {
    return res.status(403).json("Invalid token");
  }
};

// ✅ Admin Only Access
export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json("Admin access only");
  }
  next();
};