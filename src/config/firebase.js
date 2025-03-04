
export const firebaseConfig = {
    apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectID,
  storageBucket: import.meta.env.VITE_MessagingSenderId,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
}

console.log(firebaseConfig)

