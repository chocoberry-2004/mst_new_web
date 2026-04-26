import jwt from "jsonwebtoken"
import bcrypt from 'bcryptjs'
import User from '../models/users.js'

export const registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = User.findOne({ email })
    if (existingUser) return res.status(400).json({ message: "Email already exist!" })

    const newUser = User({
      username,
      email,
      password: generateHashPassword(password)
    })

    await newUser.save();

    const token = generateTokenForRegister(newUser)

    res.status(201).json({
      message: "New User account registered successfully",
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email
      }
    })
    
  } catch (error) {
    res.status(500).json({
      error: `Error while creating user account: ${error.message}`
    })
  }
}

const generateTokenForRegister = (newUser) => {
  const token = jwt.sign(
    { id: newUser._id, email: newUser.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  )

  return token
}

const generateHashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  return hashedPassword
}