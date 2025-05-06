import type { NextApiRequest, NextApiResponse } from 'next';
import { signUp } from '../../../lib/firebase/service';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        await signUp(
            req.body, (success: boolean) => {
                if (success) {
                    res.status(200).json({ status: true, statusCode:200, messages: 'User created successfully' });
                } else {
                    res.status(400).json({ status: false,statusCode:400, messages: 'User already exists' });
                }
            }
        );

    } else {
        res.status(405).json({ status: false, statusCode:405, messages: 'Method not allowed' });
    }
}
