import { createContext, useContext, useEffect, useState } from 'react'
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '../config/firebase.js'
import{
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from 'firebase/auth'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)


// 1. Create Context
const AuthContext = createContext({
    currentUser:'',
    signIn: () => {},
    registerUser:() => {},
    signUpProvider: () => {},
    logOut: () => {},
    forgotPassword: () => {},

})

// 2. Create Context Provider
export const AuthProvider = ({ children}) => {
    const navigate =useNavigate()
    //Create a state to store current user
    const [currentUser, setCurrentUser] = useState(null)

    //Create a User

    const registerUser = async (email, password, displayName) => {
        try{
            await createUserWithEmailAndPassword(auth, email, password)
            await updateProfile(auth.currentUser, { displayName})
            setCurrentUser(auth.currentUser)
            navigate('/')
            toast.success('Registered Successfully')
        } catch (error) {
            console.log(error.message)
        }
    }

    //Sign In User
    const signIn = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
            navigate('/')
            toast.success('Signed In Successfully')
        } catch (error) {
            console.log(error.message)
        }
    }

    const userObserver = () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                 setCurrentUser(user)
            } else {
                setCurrentUser (null)
            }
        })
    }

    useEffect (() => {
        // Start the execution of userObserver when the application rendered for the first time
        userObserver()
    }, [])

    //Google Sign-In
    const signUpProvider = async () => {
        try{
            const provider = new GoogleAuthProvider()
           const result = await signInWithPopup( auth, provider)
            navigate('/')
            toast.success('Signed In Successfully')
        } catch (error){
            console.log(error.message)
        }
    }

    //Sign Out
    const logOut = async () => {
       await signOut(auth)
       setCurrentUser(null)
        console.log('Logged out Successfully!')
        navigate('/')
    }

    //forgot password
    const forgotPassword = async (email) => {
        try{
            await sendPasswordResetEmail(auth, email)
            toast.success('Password reset link sent to your email')
        } catch (error) {
            console.log(error.message)
        }
    }
    
    return (
        <AuthContext.Provider
        value={{
            currentUser,
            signIn,
            registerUser,
            signUpProvider,
            logOut,
            forgotPassword,
        }}
        >
            {children}
        </AuthContext.Provider>
    )

}

//3. Custom hook to use Context
export const useAuth = () => useContext(AuthContext)
