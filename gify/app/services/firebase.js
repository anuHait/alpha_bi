import { getApp,getApps,initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "alphabi-3e12a.firebaseapp.com",
  projectId: "alphabi-3e12a",
  storageBucket: "alphabi-3e12a.appspot.com",
  messagingSenderId: "200570627672",
  appId: "1:200570627672:web:6d437075b835efba6f0c2d"
};

// Initialize Firebase
const app = getApps().length?getApp():initializeApp(firebaseConfig);
const auth=getAuth(app);

export{auth}
