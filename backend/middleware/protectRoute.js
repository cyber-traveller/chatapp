import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
	try {
		const token = req.cookies.jwt;

		if (!token) {
			return res.status(401).json({ error: "Unauthorized - No Token Provided" });
		}

		if (!process.env.JWT_SECRET) {
			console.error("JWT_SECRET is not defined in environment variables");
			return res.status(500).json({ error: "Server configuration error" });
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const user = await User.findById(decoded.userId).select("-password");

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		req.user = user;
		next();
	} catch (error) {
		if (error.name === "JsonWebTokenError") {
			return res.status(401).json({ error: "Invalid token - Please login again" });
		} else if (error.name === "TokenExpiredError") {
			return res.status(401).json({ error: "Token expired - Please login again" });
		}
		console.error("Error in protectRoute middleware:", error);
		res.status(500).json({ error: "Internal server error" })
	}
};

export default protectRoute;
