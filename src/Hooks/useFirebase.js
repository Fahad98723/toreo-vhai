
import { getAuth, signInWithPopup, GoogleAuthProvider,onAuthStateChanged,createUserWithEmailAndPassword,signOut ,signInWithEmailAndPassword,updateProfile, sendEmailVerification } from "firebase/auth";
import { useEffect, useState } from "react";
import firebaseInitializing from "../Firebase/firebase.init";

firebaseInitializing()
const  useFirebase =  () => {
    const auth = getAuth()
    const googleProvider = new GoogleAuthProvider()
    const [isLoading,setIsLoading] = useState(true)
    const [user,setUser] = useState({})
    const [error, setError] = useState('')
    const  [isAdmin, setIsAdmin] = useState(false)

    //google sign in 
    const googleSignIn = () => {
       return signInWithPopup(auth,googleProvider)        
    }
    //with email and pass sign in
    const loginWithEmailAndPass = (email, password) => {
        return signInWithEmailAndPassword(auth ,email, password)     
    }

    //signup with email and pass
    const signupWithEmailAndPass = (email,password,name, history) => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((result) => {           
            const newUser = {email, displayName:name}
            setUser(newUser)
            saveUser(email, name, 'POST')
            updateProfile(auth.currentUser, {
                displayName: name,
              })
              sendEmailVerification(auth.currentUser)
                .then((result) => {
                    console.log(result);
                });
            setError('')
            history('/')
        })
        .catch((error) => {
            setError(error.message)
        });    
    }
    //user data set
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {            
            if (user) {
                setUser(user)
            }
            else {
                setUser({})
            }
            setIsLoading(false)
        })
        
    },[auth])

    //log out
    const logOut = () => {
        signOut(auth).then(() => {
            setUser({})
          }).catch((error) => {
            setError(error.message)
          })
          .finally(() => {
            setIsLoading(false)
          })
    }
    
    //saving user data
    const saveUser = (email, name, method) => {
        const user =  {email, name}
        fetch('http://localhost:5000/users', {
            method : method,
            headers : {
                'content-type' : 'application/json'
            },
            body : JSON.stringify(user)
        })
    }

    
    useEffect( () => {
        fetch(`http://localhost:5000/users/${user?.email}`)
        .then(res => res.json())
        .then(data =>  setIsAdmin(data?.admin))
    },[user?.email])

    return {googleSignIn,user,error, isLoading,signupWithEmailAndPass,loginWithEmailAndPass,logOut,setIsLoading,setError,setUser,saveUser,  isAdmin}
}

export default useFirebase