function autenticarUsuario(usuario, senha, contas) {
  if (!contas || contas.length === 0) return 'Não há usuários registrados.';
  if (!usuario) return 'Preencha o campo de usuário';

  const conta = contas.find(c => c.usuario === usuario);
  if (!conta) return 'Nome de usuário inválido.';
  if (!senha) return 'Digite a senha.';
  if (conta.senha !== senha) return 'Senha incorreta.';

  return 'sucesso';
}

module.exports = autenticarUsuario;
