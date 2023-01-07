import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getDatabase ,ref} from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyCT4b8Kj37lDAa4C1pe9NId1wZmj4ZPVb0",
  authDomain: "form-2298c.firebaseapp.com",
  projectId: "form-2298c",
  storageBucket: "form-2298c.appspot.com",
  messagingSenderId: "1038493227627",
  appId: "1:1038493227627:web:920c7de370743ba5dcef2e"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase();
export const chatsRef=ref(database,"chats")
export {auth ,database}