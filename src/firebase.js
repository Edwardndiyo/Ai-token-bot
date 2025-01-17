import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCWM9X1Y5Pbfn-QtUC-BrjkwznY-AafKAM",
  authDomain: "ai-token-63d78.firebaseapp.com",
  projectId: "ai-token-63d78",
  storageBucket: "ai-token-63d78.firebasestorage.app",
  messagingSenderId: "30734759069",
  appId: "1:30734759069:web:2f99607c559079cd1c5074",
  measurementId: "G-MCKEBSK833"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };