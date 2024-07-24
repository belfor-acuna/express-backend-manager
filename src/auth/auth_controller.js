import AuthService from './auth_services.js';

// Registro de usuario
export async function register(req, res){
  const { email, name, password, role } = req.body;
  try {
    const result = await AuthService.registerUser({ email, name, password, role });
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Login de usuario
export async function login(req, res){
  const { email, password } = req.body;
  try {
    const result = await AuthService.loginUser({ email, password });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


//getMe
export async function getMe(req, res) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const userInfo = await AuthService.getUserInfo(token);
    res.json(userInfo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
