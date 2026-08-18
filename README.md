# Sistema de Triagem e Painel de Senhas Clínicas

Aplicativo mobile desenvolvido em React Native focado na gestão de filas de espera para clínicas médicas. O sistema gerencia o cadastro de pacientes, direcionamento automático de especialidades com base na faixa etária e controle de chamadas em painel com sistema de prioridade legal.

## 🚀 Funcionalidades

* **Gestão de Fila Inteligente:** Sistema de atendimento que prioriza automaticamente pacientes idosos (60+ anos) na chamada do painel, garantindo conformidade com regras de prioridade.
* **Triagem Automatizada:** Cruzamento de dados que sugere as especialidades médicas adequadas imediatamente após a inserção da idade do paciente (ex: Pediatria para crianças, Geriatria para idosos).
* **Painel de Chamadas Dinâmico:** Interface "Single Page" que permite cadastrar pacientes e visualizar a chamada atual simultaneamente, sem necessidade de navegação complexa.
* **Identificação Visual:** Diferenciação visual entre senhas normais (N-001) e prioritárias (P-001).

## 🛠️ Tecnologias e Ferramentas

* React Native
* Expo
* JavaScript (ES6+)

## 📦 Como Executar

Certifique-se de ter o Node.js instalado em sua máquina. Para rodar o projeto localmente, siga os passos abaixo:

1. Clone o repositório:

    git clone https://github.com/SEU_USUARIO/painel-senhas-react-native.git

2. Acesse a pasta do projeto:

    cd painel-senhas-react-native

3. Instale as dependências:

    npm install

4. Inicie o servidor do Expo:

    npx expo start

Utilize o aplicativo Expo Go no seu smartphone para escanear o QR Code gerado no terminal, ou pressione "a" para abrir no emulador Android e "i" para simulador iOS.

## 👨‍💻 Autor

Kauã Hiro dos Santos Mizumoto
Estudante de Desenvolvimento de Software Multiplataforma na Fatec.
