import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export interface AuthRequest extends Request {
    userId?: string;
}

export const authenticateToken = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): void => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

    if (!token) {
        res.status(401).json({ message: 'Access token missing' });
        return;
    }

    jwt.verify(token, JWT_SECRET, (err, decoded: any) => {
        if (err) {
             res.status(403).json({message: 'Invalid token'});
            return;
        }

        req.userId = decoded.userId;
        next();
    });
};
