export function chamarProximaSenha(fila) {
  const indexPrioridade = fila.findIndex(paciente => paciente.isPrioridade);
  
  if (indexPrioridade !== -1) {
    const pacienteChamado = fila[indexPrioridade];
    const novaFila = fila.filter((_, i) => i !== indexPrioridade);
    return { pacienteChamado, novaFila };
  }

  if (fila.length > 0) {
    const pacienteChamado = fila[0];
    const novaFila = fila.slice(1);
    return { pacienteChamado, novaFila };
  }

  return { pacienteChamado: null, novaFila: fila };
}