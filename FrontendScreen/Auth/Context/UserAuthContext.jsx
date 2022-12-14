import { createContext, useContext, useEffect, useState } from "react";
import {
    RecaptchaVerifier,
    onAuthStateChanged,
    signInWithPhoneNumber,

} from "firebase/auth";
import { auth } from "../../../config/firebase";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
    const [user, setUser] = useState({});
    const [authentication,setAuthentication]=useState(false);
  

    function setUpRecaptha(number) {
        const recaptchaVerifier = new RecaptchaVerifier(
            "recaptcha-container",
            {},
            auth
        );
        recaptchaVerifier.render();
        return signInWithPhoneNumber(auth, number, recaptchaVerifier);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
            setUser(currentuser);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(()=>{
        setAuthentication(JSON.parse(localStorage.getItem(import.meta.env.VITE_USER_AUTH))?.token?true:false)
    })

    return (
        <userAuthContext.Provider
            value={{
                user,
                setUpRecaptha,
                authentication,
                setAuthentication
            }}
        >
            {children}
        </userAuthContext.Provider>
    );
}

export function useUserAuth() {
    return useContext(userAuthContext);
}
