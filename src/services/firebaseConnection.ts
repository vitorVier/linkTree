import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCjXySb-Opkw5yCNa0Bfs_LGUPp3JFuUzg",
  authDomain: "linktree-d9a1c.firebaseapp.com",
  projectId: "linktree-d9a1c",
  storageBucket: "linktree-d9a1c.firebasestorage.app",
  messagingSenderId: "515666228981",
  appId: "1:515666228981:web:803ab42c49e578f34cf7bc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };