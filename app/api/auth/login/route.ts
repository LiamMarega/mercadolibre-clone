import { NextResponse } from 'next/server';

// Hardcoded user for testing
const MOCK_USER = {
  email: 'meli@test.com',
  password: '123456',
  name: 'Liam Marega',
  id: '1'
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email y contraseña son requeridos' },
        { status: 400 }
      );
    }

    // Check against hardcoded credentials
    if (email === MOCK_USER.email && password === MOCK_USER.password) {
      // Return user data without password
      const { email, name, id } = MOCK_USER;
      return NextResponse.json({ email, name, id });
    }

    return NextResponse.json(
      { message: 'Credenciales inválidas' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Error del servidor' },
      { status: 500 }
    );
  }
} 