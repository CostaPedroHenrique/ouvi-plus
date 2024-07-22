import { compare, hash } from 'bcrypt';
import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import prisma from '../models/prisma';
dotenv.config();

const saltRounds = 10;
const JWT_SECRET = process.env.JWT_SECRET!;

export const createUser = async (
  name: string,
  email: string,
  password: string,
) => {
  const hashedPassword = await hash(password, saltRounds);
  return await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });
};

export const updateUser = async (
  id: number,
  name?: string,
  email?: string,
  password?: string,
) => {
  const data = {};

  // eslint-disable-next-line
  // @ts-ignore
  if (name) data.name = name;
  // eslint-disable-next-line
  // @ts-ignore
  if (email) data.email = email;
  // eslint-disable-next-line
  // @ts-ignore
  if (password) data.password = await hash(password, saltRounds);
  return await prisma.user.update({ where: { id }, data });
};

export const validateUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (user && (await compare(password, user.password))) {
    return user;
  }
  return null;
};

export const login = async (email: string, password: string) => {
  const user = await validateUser(email, password);
  if (user) {
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);
    return { user, token };
  }
  return null;
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};
export const getAllUsers = async () => {
  return await prisma.user.findMany();
};

export const getUserById = async (id: number) => {
  return await prisma.user.findUnique({ where: { id } });
};
