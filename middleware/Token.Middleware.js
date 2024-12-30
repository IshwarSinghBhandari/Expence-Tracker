import jwt from "jsonwebtoken";

const authtoken = (req, res, next) => {
    const authHeader = req.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided or malformed header" });
    }

    const token = authHeader.split("Bearer ")[1];

    try {
        const decoded = jwt.verify(token, process.env.PKEY);
        req.user = decoded.data; 
        next();
    } catch (err) {
        console.error("JWT Verification Error:", err.message);
        res.status(401).json({ message: err.name === "TokenExpiredError" ? "Token expired" : "Invalid token" });
    }
};

export default authtoken;
