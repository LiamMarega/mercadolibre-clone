import { signToken } from '@/lib/auth';
import { NextResponse } from 'next/server';


// Hardcoded user for testing
const MOCK_USER = [{
  id: '1',
  email: 'meli@test.com',
  password: '123456',
  name: 'Liam Marega',
}, 
{
  id: '2',
  email: 'liammarega85@gmail.com',
  password: '123456',
  name: 'Liam Marega',
},
];




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
    const user = MOCK_USER.find((user) => user.email === email);
    if (user && password === user.password) {
      // Return user data without password
      const { email, name, id } = user;
      const token = await signToken({id, email, name});

      return NextResponse.json({token, user: { email, name, id }});

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