import firebaseConfig from "./firebase.config";
import { initializeApp } from "firebase/app";

const firebaseInitializing = () => {
    return initializeApp(firebaseConfig);
}

export default firebaseInitializing