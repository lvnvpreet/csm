import { User } from '../models/user';
import { AppDataSource } from '../config/db';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

export class AuthService {
    private userRepository = AppDataSource.getRepository(User);
    private JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

    public async register(email: string, password: string, role: "admin" | "user" = "user"): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = this.userRepository.create({
            email,
            password: hashedPassword,
            role
        });
        return await this.userRepository.save(user);
    }

    public async login(email: string, password: string): Promise<string | null> {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) return null;

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return null;

        return jwt.sign(
            { userId: user.id, email: user.email, role: user.role },
            this.JWT_SECRET,
            { expiresIn: '1h' }
        );
    }
}