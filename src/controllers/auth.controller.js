const status = require("http-status");
const authService = require("../services/auth.service");

const authController = {
  login: async (req, res) => {
    const { username, password } = req.body;

    const token = await authService.generateToken(username, password);
    res.status(status.OK).json({ token });
  },

  register: async (req, res) => {
    const { email, username, password, address, name } = req.body;
    await authService.register(email, username, password, address, name);

    res.status(status.OK).json({ message: "Registered successfully" });
  },
};

module.exports = authController;
