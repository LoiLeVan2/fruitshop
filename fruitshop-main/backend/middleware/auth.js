import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not Authorized. Login Again"
            });
        }

        const token_parts = token.split(" ");

        if (token_parts.length !== 2 || token_parts[0] !== "Bearer") {
            return res.status(401).json({
                success: false,
                message: "Invalid token format"
            });
        }

        const decoded = jwt.verify(
            token_parts[1],
            process.env.JWT_SECRET
        );

        req.body.userId = decoded.id;

        next();
    } catch (error) {
        console.log(error);

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};

export default authMiddleware;