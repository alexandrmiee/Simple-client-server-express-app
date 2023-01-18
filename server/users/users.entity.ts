import { Document, Types, Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

export interface User {
  id?: string;
  login: string;
  password: string;
  accessToken?: string;
  refreshToken?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type UserModel = Document<unknown, any, User> &
  User & {
    _id: Types.ObjectId;
  };

const usersSchema = new Schema<User>(
  {
    login: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    accessToken: { type: String, required: false },
    refreshToken: { type: String, required: false },
  },
  {
    timestamps: true,
  },
);

usersSchema.pre('save', async function (next) {
  const user = this;
  const hash = await bcrypt.hash(user.password, 10);
  user.password = hash;
  next();
});

export const usersModel = model<User>('Users', usersSchema);
