import { AppDataSource } from '../config/db';

const db = AppDataSource;

export interface Activity {
    id: number;
    type: string;
    description: string;
    user_id: number | null;
    created_at: Date;
}

export class ActivityService {
    public async getRecentActivities(limit: number = 10): Promise<Activity[]> {
        try {
            const result = await db.query(
                `SELECT * FROM activities 
                 ORDER BY created_at DESC 
                 LIMIT $1`,
                [limit]
            );
            return result.rows;
        } catch (error) {
            console.error('Error getting recent activities:', error);
            return [];
        }
    }

    public async logActivity(data: Omit<Activity, 'id' | 'created_at'>): Promise<Activity> {
        try {
            const result = await db.query(
                `INSERT INTO activities (type, description, user_id)
                 VALUES ($1, $2, $3)
                 RETURNING *`,
                [data.type, data.description, data.user_id]
            );
            return result.rows[0];
        } catch (error) {
            console.error('Error logging activity:', error);
            throw error;
        }
    }
}