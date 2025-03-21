import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import userModel from '../user/user_entity.js';
import PasswordResetToken from './recoveryRequest_entity.js';
import { generateToken, verifyToken } from './token/token_handler.js';
import sendEmail from "../mailer/mailerService.js"
import crypto from 'crypto';
class AuthService {
  async registerUser({ email, name, password, role }) {
    const salt = bcrypt.genSaltSync(12);
    const hash = bcrypt.hashSync(password, salt);
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      throw new Error('Ya existe una cuenta asociada a este correo electrónico');
    }
    const user = new userModel({ _id: new mongoose.Types.ObjectId(), email, name, hash, salt, role });
    await user.save();
    return { message: 'User created successfully' };
  }

  async loginUser({ email, password }) {
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error('No existe una cuenta con este correo electrónico');
    }

    const isMatch = bcrypt.compareSync(password, user.hash);
    if (!isMatch) {
      throw new Error('Credenciales incorretas');
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

  async createRecoveryFlow(email) {
    const user = await userModel.findOne({ email });
    if (user) {
      // Verificar si ya existe un token activo
      const activeToken = await PasswordResetToken.findOne({
        email,
        expiresAt: { $gt: new Date() }
      });
  
      if (activeToken) {
        return {
          message: `Ya se ha enviado un correo electrónico al correo ${email} recientemente. Por favor revisa tu bandeja o inténtalo más tarde.`,
          status: 200,
          requestId: activeToken._id
        };
      }
      
      // Si no existe un token activo, creamos uno nuevo
      const token = crypto.randomBytes(6).toString("hex"); // Token aleatorio
      const salt = bcrypt.genSaltSync(12);
      const hash = bcrypt.hashSync(token, salt);
  
      // Guardar nuevo token en la BD con expiración de 15 min
      const resetToken = new PasswordResetToken({
        email,
        hash,
        salt,
        expiresAt: new Date(Date.now() + 1000 * 60 * 15), // 15 min
      });
  
      await resetToken.save();
  
      sendEmail(email, token);
      return {
        message: `Se ha enviado un correo electrónico al correo ${email} con el código verificador`,
        status: 200,
        requestId: resetToken._id
      };
    } else {
      return { message: `No existe un usuario con este email: ${email}`, status: 500 };
    }
  }
  

  async validateToken(code, _id) {
    const passwordRecoveryRequest = await PasswordResetToken.findById(_id);
    if (passwordRecoveryRequest) {
      const isMatch = bcrypt.compareSync(code, passwordRecoveryRequest.hash);
      if (isMatch) {
        return { message: "Se ha autorizado el cambio de contraseña para esta cuenta", status: 200 }
      } else {
        return { message: "El código para esta solicitud es incorrecto.", status: 500 }
      }
    } else {
      return { message: "Esta solicitud de recuperar contraseña es inválida" }
    }
  }

  async updatePassword(email, password) {
    const userFound = await userModel.findOne({ email });
    if (userFound) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      userFound.hash = hash;
      userFound.salt = salt;
      await userFound.save();
      await PasswordResetToken.deleteMany({ email });
      return { message: 'Contraseña actualizada con éxito !', status: 200 };
    } else {
      return { message: `No existe un usuario con este email ${email}`, status: 500 }
    }
  }

}


export default new AuthService();
