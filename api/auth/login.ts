import { NextApiRequest, NextApiResponse } from 'next';

// Hardcoded user for testing
const MOCK_USER = {
  email: 'meli@test.com',
  password: '123456',
  name: 'Liam Marega',
  id: '1'
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email y contraseña son requeridos' });
  }

  // Check against hardcoded credentials
  if (email === MOCK_USER.email && password === MOCK_USER.password) {
    // Return user data without password
    const { email, name, id } = MOCK_USER;
    return res.status(200).json({ email, name, id });
  }

  return res.status(401).json({ message: 'Credenciales inválidas' });
} 