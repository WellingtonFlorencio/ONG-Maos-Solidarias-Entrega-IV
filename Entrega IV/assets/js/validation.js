// validation.js - validação completa de formulário

function validarCPF(cpf) {
  cpf = cpf.replace(/\D/g, '');
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
  let soma = 0;
  for (let i = 0; i < 9; i++) soma += parseInt(cpf[i]) * (10 - i);
  let resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf[9])) return false;
  soma = 0;
  for (let i = 0; i < 10; i++) soma += parseInt(cpf[i]) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf[10])) return false;
  return true;
}

function validarTelefone(t) {
  return /^\(?\d{2}\)?\s?\d{4,5}\-?\d{4}$/.test(t);
}

function validarCEP(c) {
  return /^\d{5}-?\d{3}$/.test(c);
}

function idadeValida(data) {
  const hoje = new Date();
  const nasc = new Date(data);
  let idade = hoje.getFullYear() - nasc.getFullYear();
  const m = hoje.getMonth() - nasc.getMonth();
  if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) idade--;
  return idade >= 16;
}

export function handleFormInit() {
  const form = document.getElementById('form-cadastro');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Pega todos os valores
    const nome = form.nome.value.trim();
    const nascimento = form.nascimento.value;
    const email = form.email.value.trim();
    const cpf = form.cpf.value.trim();
    const telefone = form.telefone.value.trim();
    const cep = form.cep.value.trim();
    const endereco = form.endereco.value.trim();
    const cidade = form.cidade.value.trim();
    const estado = form.estado.value.trim();

    let erros = [];

    if (nome.length < 3) erros.push('O nome deve ter pelo menos 3 letras.');
    if (!idadeValida(nascimento)) erros.push('Idade mínima de 16 anos.');
    if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) erros.push('E-mail inválido.');
    if (!validarCPF(cpf)) erros.push('CPF inválido.');
    if (!validarTelefone(telefone)) erros.push('Telefone inválido.');
    if (!validarCEP(cep)) erros.push('CEP inválido.');
    if (!endereco) erros.push('Endereço é obrigatório.');
    if (!cidade) erros.push('Cidade é obrigatória.');
    if (!estado) erros.push('Selecione um estado.');

    if (erros.length > 0) {
      alert('⚠️ Corrija os seguintes erros:\n\n- ' + erros.join('\n- '));
      return;
    }

    // Salva localmente (simula banco de dados)
    const cadastro = {
      nome, nascimento, email, cpf, telefone, cep, endereco, cidade, estado,
      criadoEm: new Date().toLocaleString()
    };
    const lista = JSON.parse(localStorage.getItem('cadastros') || '[]');
    lista.push(cadastro);
    localStorage.setItem('cadastros', JSON.stringify(lista));

// Mostra mensagem de sucesso
const modal = document.getElementById('modal-sucesso');
if (modal) {
  modal.classList.add('ativo');
  setTimeout(() => modal.classList.remove('ativo'), 3000);
  if (typeof confetti === 'function') {
    confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
  }
}
    // Limpa formulário
    form.reset();
  });
}
