import React, { useState } from 'react';
import { 
  SafeAreaView, View, Text, TextInput, TouchableOpacity, 
  ScrollView, StyleSheet, Platform, KeyboardAvoidingView 
} from 'react-native';

import { obterEspecialidades } from './src/cadastro';
import { gerarSenha } from './src/gerarSenha';
import { chamarProximaSenha } from './src/chamada';

export default function App() {
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [sexo, setSexo] = useState('');
  const [especialidadeSelecionada, setEspecialidadeSelecionada] = useState('');
  
  const [fila, setFila] = useState([]);
  const [pacienteAtual, setPacienteAtual] = useState(null);
  const [erro, setErro] = useState('');

  const especialidadesDisponiveis = idade !== '' ? obterEspecialidades(idade) : [];

  function handleGerarSenha() {
    if (!nome || !idade || !sexo || !especialidadeSelecionada) {
      setErro('Preencha todos os campos e selecione uma especialidade.');
      return;
    }
    
    setErro('');
    const novoPaciente = gerarSenha(nome, idade, sexo, especialidadeSelecionada);
    
    setFila(prevFila => [...prevFila, novoPaciente]);
    
    setNome('');
    setIdade('');
    setSexo('');
    setEspecialidadeSelecionada('');
  }

  function handleChamarProximo() {
    const { pacienteChamado, novaFila } = chamarProximaSenha(fila);
    
    if (pacienteChamado) {
      setPacienteAtual(pacienteChamado);
      setFila(novaFila);
    } else {
      setErro('Não há pacientes na fila de espera.');
      setTimeout(() => setErro(''), 3000);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scroll}>
          
          <View style={styles.painelCard}>
            <Text style={styles.tituloSecao}>PAINEL DE ATENDIMENTO</Text>
            {pacienteAtual ? (
              <View style={styles.painelInfo}>
                <Text style={[styles.senhaDestaque, { color: pacienteAtual.isPrioridade ? '#ef4444' : '#3b82f6' }]}>
                  {pacienteAtual.senha}
                </Text>
                <Text style={styles.textoInfo}>Paciente: {pacienteAtual.nome}</Text>
                <Text style={styles.textoInfo}>Consultório: {pacienteAtual.especialidade}</Text>
              </View>
            ) : (
              <Text style={styles.textoVazio}>Aguardando chamadas...</Text>
            )}
            
            <TouchableOpacity style={styles.botaoChamar} onPress={handleChamarProximo}>
              <Text style={styles.textoBotaoBranco}>CHAMAR PRÓXIMO DA FILA</Text>
            </TouchableOpacity>
            
            <Text style={styles.infoFila}>Pessoas na fila: {fila.length}</Text>
          </View>

          <View style={styles.cadastroCard}>
            <Text style={styles.tituloSecao}>NOVO CADASTRO</Text>
            
            <Text style={styles.label}>Nome do Paciente</Text>
            <TextInput style={styles.input} value={nome} onChangeText={setNome} placeholder="Digite o nome" />
            
            <View style={styles.linhaDupla}>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>Idade</Text>
                <TextInput style={styles.input} value={idade} onChangeText={setIdade} placeholder="0" keyboardType="numeric" maxLength={3} />
              </View>
              
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.label}>Sexo</Text>
                <View style={styles.linhaBotoesSexo}>
                  <TouchableOpacity style={[styles.botaoSexo, sexo === 'M' && styles.botaoSexoAtivo]} onPress={() => setSexo('M')}>
                    <Text style={[styles.textoBotaoSexo, sexo === 'M' && styles.textoBotaoSexoAtivo]}>M</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.botaoSexo, sexo === 'F' && styles.botaoSexoAtivo]} onPress={() => setSexo('F')}>
                    <Text style={[styles.textoBotaoSexo, sexo === 'F' && styles.textoBotaoSexoAtivo]}>F</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {especialidadesDisponiveis.length > 0 && (
              <>
                <Text style={styles.label}>Selecione a Especialidade</Text>
                <View style={styles.linhaEspecialidades}>
                  {especialidadesDisponiveis.map((esp) => (
                    <TouchableOpacity 
                      key={esp} 
                      style={[styles.botaoEspecialidade, especialidadeSelecionada === esp && styles.botaoEspecialidadeAtivo]}
                      onPress={() => setEspecialidadeSelecionada(esp)}
                    >
                      <Text style={[styles.textoEspecialidade, especialidadeSelecionada === esp && styles.textoEspecialidadeAtivo]}>
                        {esp}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            )}

            {erro ? <Text style={styles.textoErro}>{erro}</Text> : null}

            <TouchableOpacity style={styles.botaoGerar} onPress={handleGerarSenha}>
              <Text style={styles.textoBotaoBranco}>GERAR SENHA</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f1f5f9' },
  scroll: { padding: 20, paddingTop: Platform.OS === 'android' ? 40 : 20 },
  painelCard: { backgroundColor: '#1e293b', borderRadius: 16, padding: 20, marginBottom: 20, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 5 },
  tituloSecao: { fontSize: 16, fontWeight: 'bold', color: '#94a3b8', marginBottom: 15, textAlign: 'center', letterSpacing: 1 },
  painelInfo: { alignItems: 'center', marginBottom: 20 },
  senhaDestaque: { fontSize: 56, fontWeight: '900', marginBottom: 10, textShadowColor: 'rgba(0, 0, 0, 0.5)', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 2 },
  textoInfo: { fontSize: 18, color: '#f8fafc', marginBottom: 4, fontWeight: '500' },
  textoVazio: { fontSize: 16, color: '#64748b', marginBottom: 20, fontStyle: 'italic' },
  botaoChamar: { backgroundColor: '#10b981', paddingVertical: 14, paddingHorizontal: 24, borderRadius: 12, width: '100%', alignItems: 'center' },
  infoFila: { marginTop: 12, color: '#94a3b8', fontSize: 14 },
  cadastroCard: { backgroundColor: '#ffffff', borderRadius: 16, padding: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 6, elevation: 3 },
  label: { fontSize: 14, fontWeight: '600', color: '#334155', marginBottom: 8, marginTop: 10 },
  input: { backgroundColor: '#f8fafc', borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 10, padding: 12, fontSize: 16, color: '#0f172a' },
  linhaDupla: { flexDirection: 'row', justifyContent: 'space-between' },
  linhaBotoesSexo: { flexDirection: 'row', gap: 10 },
  botaoSexo: { flex: 1, backgroundColor: '#f8fafc', borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 10, padding: 12, alignItems: 'center' },
  botaoSexoAtivo: { backgroundColor: '#3b82f6', borderColor: '#2563eb' },
  textoBotaoSexo: { fontSize: 16, fontWeight: '600', color: '#64748b' },
  textoBotaoSexoAtivo: { color: '#ffffff' },
  linhaEspecialidades: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  botaoEspecialidade: { backgroundColor: '#f8fafc', borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 8, paddingVertical: 8, paddingHorizontal: 12 },
  botaoEspecialidadeAtivo: { backgroundColor: '#8b5cf6', borderColor: '#7c3aed' },
  textoEspecialidade: { fontSize: 14, color: '#475569', fontWeight: '500' },
  textoEspecialidadeAtivo: { color: '#ffffff', fontWeight: 'bold' },
  textoErro: { color: '#ef4444', textAlign: 'center', marginTop: 15, fontWeight: '600' },
  botaoGerar: { backgroundColor: '#3b82f6', paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginTop: 20 },
  textoBotaoBranco: { color: '#ffffff', fontWeight: 'bold', fontSize: 15, letterSpacing: 0.5 },
});