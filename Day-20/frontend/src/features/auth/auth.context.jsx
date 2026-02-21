import { useState, createContext} from "react";
import { signin, register, getMe } from "./services/auth.api";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

      // Assuming you have an 'signin' API call function
    const handleSignin = async (email, password) => {
        setLoading(true);
        try {
            // Replace 'signin' with your actual sign-in API call function
            const response = await signin(email, password); 
            setUser(response.user);
        } catch (err) {
            console.error("Sign-in failed:", err); // Use console.error for errors
            // Optionally, handle error state or display a message to the user
        } finally {
            setLoading(false);
        }
    };

   

    const handleRegister = async (username, email, password) => {
        setLoading(true);
        try {
            const response = await register(username, email, password);
            setUser(response.user);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, handleSignin, handleRegister }}>
            {children}                                
        </AuthContext.Provider>
    );
};