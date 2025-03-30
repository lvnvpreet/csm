import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

interface JwtPayload {
    userId: number;
    email: string;
    role: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.redirect('/login');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as JwtPayload;
        req.user = decoded;
        next();
    } catch (error) {
        res.redirect('/login');
    }
};

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.user?.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied' });
    }
    next();
};