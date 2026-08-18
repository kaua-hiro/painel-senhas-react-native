export function obterEspecialidades(idade) {
  const idadeNum = parseInt(idade, 10) || 0;
  
  if (idadeNum <= 12) {
    return ['Pediatria', 'Neuropediatria'];
  }
  if (idadeNum <= 18) {
    return ['Endocrinologia Pediátrica', 'Psiquiatria Infantil e Adolescente'];
  }
  if (idadeNum <= 40) {
    return ['Dermatologia', 'Ginecologia/Urologia'];
  }
  if (idadeNum <= 60) {
    return ['Cardiologia', 'Ortopedia'];
  }
  
  return ['Geriatria', 'Oftalmologia'];
}