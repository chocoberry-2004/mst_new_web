import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    default: 'Admin',
    unique: true,
    trim: true,
    minlength: 4
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'lecturer', 'student', 'user'],
    default: 'user'
  }
}, { timestamps: true })

const userModel = mongoose.model('User', userSchema)
export default userModel;