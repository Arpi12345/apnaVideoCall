import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCallback } from "react";



export  const  AuthContext = createContext(null);

const client = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/api/v1/users`,
});

client.interceptors.request.use((config) => {

    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});


export const AuthProvider = ({children}) => {
        const router = useNavigate();
    const [userData, setUserData] = useState(null);
     const [loading, setLoading] = useState(true);

    useEffect(() =>{
        const token = localStorage.getItem("token");
        if(token){
            setUserData({token});
        }
          setLoading(false);
    }, []);

    const handleRegister = async(name, username , password ) =>{
        try {
            let request = await client.post("/register", {
                name: name,
                username: username,
                password:password
            });
            if(request.status === 200){
                return request.data.message;
            }
        } catch (err) {
            throw err;
        }
    };
   const  handleLogin  = async(username, password)  =>{
    try {
        let request = await client.post("/login", {
            username,
            password,
        });
        const token = request.data.token;
      
            localStorage.setItem("token", token);
            setUserData({token});
            router("/home");
            return "Login successful";
        
        
    } catch (error) {
        throw error;
    }
   };
const getHistoryOfUser = useCallback(async () => {
    try {
        const res = await client.post("/get_all_activity");

        console.log("API RESPONSE:", res.data);

        return res.data || [];

    } catch (e) {
        console.error("History API Error:", e.response?.data || e);
        return [];
    }
}, []);

const addToUserHistory = async (meetingCode) => {
    return await client.post("/add_to_activity", {
        meeting_code: meetingCode
    });
};
const data = {
    userData,
    setUserData,
    handleRegister,
    handleLogin,
    loading,
    addToUserHistory,
    getHistoryOfUser
};

 return(
    <AuthContext.Provider value={data}>
        {children}

    </AuthContext.Provider>
 );

     
};

export const useAuth = () => useContext(AuthContext);
