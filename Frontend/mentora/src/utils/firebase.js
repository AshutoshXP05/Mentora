import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "loginmentora-8825a.firebaseapp.com",
  projectId: "loginmentora-8825a",
  storageBucket: "loginmentora-8825a.firebasestorage.app",
  messagingSenderId: "17750395339",
  appId: "1:17750395339:web:097d798247991680a44e4e"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export { auth, provider };