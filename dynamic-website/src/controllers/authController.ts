import { Request, Response } from 'express';
import { AuthService } from '../services/authService';

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    public async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            console.log('Login attempt with email:', email);
            
            if (!email || !password) {
                return res.status(400).json({ message: 'Email and password are required' });
            }

            const token = await this.authService.login(email, password);
            
            if (!token) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            res.cookie('jwt', token, { 
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 3600000 // 1 hour
            });

            if (req.xhr || req.headers.accept?.includes('application/json')) {
                res.json({ success: true, redirect: '/admin/dashboard' });
            } else {
                res.redirect('/admin/dashboard');
            }
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({ message: 'Server error during login' });
        }
    }

    public async register(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            console.log('Registration attempt with email:', email);

            if (!email || !password) {
                return res.status(400).json({ message: 'Email and password are required' });
            }

            await this.authService.register(email, password);

            if (req.xhr || req.headers.accept?.includes('application/json')) {
                res.json({ success: true, redirect: '/login' });
            } else {
                res.redirect('/login');
            }
        } catch (error) {
            console.error('Registration error:', error);
            res.status(500).json({ message: 'Server error during registration' });
        }
    }

    public logout(req: Request, res: Response) {
        res.clearCookie('jwt');
        res.redirect('/login');
    }
}