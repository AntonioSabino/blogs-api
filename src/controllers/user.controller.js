const { User } = require('../database/models');
const generateJWT = require('../util/generateJWT');

const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const user = await User.create({ displayName, email, password, image });

  const { password: passDB, ...userWithoutPass } = user;

  const token = generateJWT(userWithoutPass);

  return res.status(201).json({ token });
};

module.exports = { createUser };
