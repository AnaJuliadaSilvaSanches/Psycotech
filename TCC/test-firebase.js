// Importar Firebase
const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");

// Configurar Firebase usando as variáveis de ambiente do GitHub Actions
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

// Inicializar Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();

// Usuário de teste (não precisa existir no Firebase; você pode criar um manualmente)
const testEmail = "example@test.com";
const testPassword = "123456";

// Função principal
async function runTest() {
  try {
    console.log("▶ Iniciando teste Firebase...");

    // Tentando login
    const userCredential = await auth.signInWithEmailAndPassword(
      testEmail,
      testPassword
    );

    console.log("✓ Autenticação bem-sucedida!");

    const user = userCredential.user;

    // Gravando no Firestore
    await db.collection("ci_cd_test").doc(user.uid).set({
      message: "Teste realizado com sucesso",
      timestamp: new Date().toISOString()
    });

    console.log("✓ Firestore gravou dados com sucesso!");

    console.log("🎉 TESTE FINALIZADO COM ÊXITO!");

  } catch (error) {
    console.error("❌ Erro durante o teste:", error);
    process.exit(1); // Força falhar no GitHub Actions
  }
}

runTest();
