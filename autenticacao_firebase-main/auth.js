// auth.js
const firebase = require('firebase-admin');
const config = require('./auth-firebase-70f47-firebase-adminsdk-mqz7l-75a9cf2dde.json');

firebase.initializeApp({
  credential: firebase.credential.cert(config),
});

const auth = firebase.auth();

async function listUsers() {
  try {
    const listUsersResult = await auth.listUsers();
    const users = listUsersResult.users;
    return users;
  } catch (error) {
    throw new Error(`Erro ao listar usuários: ${error.message}`);
  }
}

module.exports = {
  auth,
  listUsers,
};

