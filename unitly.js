  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
  import { getAuth,createUserWithEmailAndPassword,onAuthStateChanged,signOut ,signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
  import { getStorage ,ref ,uploadBytes,getDownloadURL} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-storage.js";
  import { getFirestore ,doc,deleteDoc, setDoc,getDoc,getDocs,arrayRemove, arrayUnion, collection,addDoc,updateDoc,query, where 
  } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
   const firebaseConfig = {
    apiKey: "AIzaSyBjOuL3B3nRaCO9Fo2IvJrkXq3AOdqjg9g",
    authDomain: "my-first-project-8596d.firebaseapp.com",
    projectId: "my-first-project-8596d",
    storageBucket: "my-first-project-8596d.appspot.com",
    messagingSenderId: "549023476953",
    appId: "1:549023476953:web:d356f595e611585e0f62c8",
    measurementId: "G-3LX0PV9JT7"
   };
  

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const storage = getStorage();

  export{
    auth,
    createUserWithEmailAndPassword,
    db,
    doc, 
    setDoc,
    storage,
    ref,
    uploadBytes,
    getDownloadURL,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    getDoc,
    collection,
    addDoc,
    getDocs,updateDoc,arrayRemove, arrayUnion,query, where ,deleteDoc

  }
