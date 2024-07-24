import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import userModel from '../user/user_entity.js';
import { generateToken,verifyToken } from './token/token_handler.js';

class AuthService {
  async registerUser({ email, name, password, role }) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const user = new userModel({ _id: new mongoose.Types.ObjectId(), email, name, hash, salt, role });
    await user.save();
    return { message: 'User created successfully' };
  }

  async loginUser({ email, password }) {
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    const hash = bcrypt.hashSync(password, user.salt);
    if (hash !== user.hash) {
      throw new Error('Invalid credentials');
    }

    const token = generateToken(user);
    return { token };
  }

  async getUserInfo(token) {
    const decoded = verifyToken(token);
    const user = await userModel.findById(decoded._id);
    if (!user) {
      throw new Error('User not found');
    }
    return {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      surname: user.surname,
      phone: user.phone,
    };
  }
}

export default new AuthService();
