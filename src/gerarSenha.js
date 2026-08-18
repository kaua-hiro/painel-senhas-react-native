let contadorNormal = 1;
let contadorPrioridade = 1;

export function gerarSenha(nome, idade, sexo, especialidade) {
  const isPrioridade = parseInt(idade, 10) >= 60;
  let numeroSenha = '';

  if (isPrioridade) {
    numeroSenha = `P-${contadorPrioridade.toString().padStart(3, '0')}`;
    contadorPrioridade++;
  } else {
    numeroSenha = `N-${contadorNormal.toString().padStart(3, '0')}`;
    contadorNormal++;
  }

  return {
    id: Math.random().toString(),
    senha: numeroSenha,
    nome,
    idade,
    sexo,
    especialidade,
    isPrioridade,
  };
}