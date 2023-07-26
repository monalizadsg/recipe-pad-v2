import jwt from "jsonwebtoken";

export default function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).send({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    let message = "Invalid token provided";
    if (error.name === "TokenExpiredError") {
      message = "Expired token provided";
    }
    res.status(400).send({ message });
  }
}
