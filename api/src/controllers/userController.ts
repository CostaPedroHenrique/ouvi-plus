import { Context } from 'hono';
import {
  createUser as createUserService,
  getAllUsers,
  login,
} from '../services/userService';

export const createUserHandler = async (c: Context) => {
  try {
    const { name, email, password } = await c.req.json();

    if (!name || !email || !password) {
      return c.json({ error: 'Nome, e-mail e senha são obrigatórios.' }, 400);
    }

    const user = await createUserService(name, email, password);
    return c.json(user, 201);
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    return c.json({ error: 'Erro ao criar usuário.' }, 500);
  }
};

export const loginUserHandler = async (c: Context) => {
  try {
    const { email, password } = await c.req.json();

    if (!email || !password) {
      return c.json({ error: 'E-mail e senha são obrigatórios.' }, 400);
    }

    const user = await login(email, password);
    if (user) {
      return c.json({ message: 'Usuário autenticado com sucesso.', user }, 200);
    } else {
      return c.json({ error: 'Credenciais inválidas.' }, 401);
    }
  } catch (error) {
    console.error('Erro ao autenticar usuário:', error);
    return c.json({ error: 'Erro ao autenticar usuário.' }, 500);
  }
};

export const getUsers = async (c: Context) => {
  try {
    const users = await getAllUsers();
    return c.json(users);
  } catch (error) {
    console.error('Erro ao obter usuários:', error);
    return c.json({ error: 'Erro ao obter usuários.' }, 500);
  }
};
