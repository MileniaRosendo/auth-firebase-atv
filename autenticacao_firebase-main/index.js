const express = require('express');
const auth = require('./auth');
const app = express();
app.use(express.json());



app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const userCredential = await auth.signInWithEmailAndPassword(
      email,
      password
    );
    const user = userCredential.user;
    res.json({ message: 'Login bem-sucedido', user });
  } catch (error) {
    res.status(401).json({ message: 'Credenciais inválidas' });
  }
});

app.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    const userCredential = await auth.createUser({
      email,
      password,
    });
    const user = userCredential.user;
    res.status(201).json({ message: 'Usuário criado com sucesso', user });
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Erro ao criar usuário', error: error.message });
  }
});

app.get('/logout', (req, res) => {
  auth
    .signOut()
    .then(() => {
      res.json({ message: 'Logout bem-sucedido' });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/', async (req, res) => {
  try {
    // Obtém a lista de usuários no momento autenticados
    const listUsersResult = await auth.listUsers();
    const users = listUsersResult;

    // Verifica se há usuários autenticados
    if (users.length > 0) {
      // Retorna o primeiro usuário autenticado
      res.json({ message: 'Primeiro usuário logado', user: users[0] });
    } else {
      throw new Error('Nenhum usuário logado');
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Erro ao obter o primeiro usuário logado', error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor executando na porta ${PORT}`);
});