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
            const token = await this.authService.login(email, password);
            
            if (!token) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            res.cookie('jwt', token, { httpOnly: true });
            res.redirect('/admin/dashboard');
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    }

    public async register(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            await this.authService.register(email, password);
            res.redirect('/login');
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    }

    public logout(req: Request, res: Response) {
        res.clearCookie('jwt');
        res.redirect('/login');
    }
}