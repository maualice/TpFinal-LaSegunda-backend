const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
  const user = await User.create({ ...req.body })
  const token = user.createJWT()
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
}

// checking for roles 
/*const roles = async (req, res) => {
if (roles) {
  const foundRoles = await Role.find({ name: { $in: roles } });
  newUser.roles = foundRoles.map((role) => role._id);
} else {
  const role = await Role.findOne({ name: "user" });
  newUser.roles = [role._id];
}
}*/

const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password')
  }
  const user = await User.findOne({ email })
  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials')
  }
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials')
  }
  // compare password
  const token = user.createJWT()
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token })

  const cookiesOptions = {
    expire: new Date(Date.now()+process.env.TOKEN_EXPIRES * 24 * 60 * 60 * 1000),
    httpOnly: true
  }
  res.cookie('jwt', token , cookiesOptions)
}


const logOut = async (req, res, next) => {
  //Eliminar cookie jwt
  res.clearCookie('jwt')
  //Redirigir a la vista de login
  return res.redirect('/login')
};

module.exports = {
  register,
  login,
  logOut,
}
