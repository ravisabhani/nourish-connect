import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) =>{

    const [token , settoken ] = useState(localStorage.getItem("token"));
    // for user details
    const [user,setuser] = useState("");

    const settokeninls = (servertoken) =>{
        settoken(servertoken)
        return localStorage.setItem("token",servertoken);
    };
    
    let isloggedin = !!token;
    const authtoken = token

    // log out function 

    const logoutuser = () =>{
        settoken("");
        return localStorage.removeItem("token");
    }

    // jwt verify user 

    const isverify = async () =>{
        const response = await fetch("http://localhost:5000/user",{
            method:"GET",
            headers:{
                Authorization:`Bearer ${token}`,
            },
        });

        if(response.ok){
            const data = await response.json();
            setuser(data.msg)
        }
    }

    useEffect(() => {
        if (isloggedin) {
            isverify();
        } else {
            setuser(""); 
        }
    }, [isloggedin]); 

    return <AuthContext.Provider value={{isloggedin,settokeninls,logoutuser,user,authtoken}} >
        {children}
    </AuthContext.Provider>
};

export const  useAuth = () =>{
    const authvalue = useContext(AuthContext);
    if(!authvalue){
        throw new Error("useAuth used outside of the provider");
    }
    return authvalue ;
}