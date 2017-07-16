import mongoose, { Schema } from 'mongoose';
import validator from 'validator';
import { hashSync, compareSync } from 'bcrypt-nodejs';
import { passwordReg } from './user.validations';

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required'],
    trim: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: '{VALUE} is not a vaild email!',
    },
  },
  firstName: {
    type: String,
    required: [true, 'FirstName is Required!'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'LastName is Required!'],
    trim: true,
  },
  userName: {
    type: String,
    required: [true, 'userName is Required!'],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required!'],
    trim: true,
    minlength: [6, 'Password need to be longer!'],
    validate: {
      validator(password) {
        return passwordReg.test(password);
      },
      message: '{VALUE} is not a valid password!',
    },
  },
});

UserSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = this._hashPassword(this.password);
  }

  return next();
});

UserSchema.methods = {
  _hashPassword(password) {
    return hashSync(password);
  },
  authenticateUser(password) {
    return compareSync(password, this.password);
  },
};

export default mongoose.model('User', UserSchema);
