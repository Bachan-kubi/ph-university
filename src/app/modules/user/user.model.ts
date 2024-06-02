
import { Schema, model } from "mongoose";
import { Tuser } from "./user.interface";
import config from "../../config";
import bcrypt from 'bcrypt';

const userSchema = new Schema<Tuser>({
    id: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    needPasswordChange: {type: Boolean, default: true},
    role: {type: String, enum: ['student', 'faculty', 'admin']},
    status: {type: String, enum: ['in-progress', 'blocked'], default: 'in-progress',
      },
    isDeleted: {type: Boolean, default: false}
},{
    timestamps: true
});
// 
userSchema.pre('save', async function (next) {
    // console.log(this, ' we will save pre hook')
    const user = this;
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_round),
    );
    next();
  });
  
  userSchema.post('save', function (doc, next) {
    // console.log(this, ' we saved pre hook')
    console.log(doc);
    // passwors should not be revealed, below process to protect
    doc.password = '';
    next();
  });
export const User = model<Tuser>('User', userSchema);