import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";


const AuthContext = createContext();



export function AuthProvider({children}){


    const [user,setUser] = useState(null);

    const [loading,setLoading] = useState(true);



    // Load saved user when app starts

    useEffect(()=>{


        const savedUser =
        localStorage.getItem("user");


        if(savedUser){

            setUser(
                JSON.parse(savedUser)
            );

        }


        setLoading(false);


    },[]);




    // Login function

    const login = (userData)=>{


        localStorage.setItem(
            "user",
            JSON.stringify(userData)
        );


        setUser(userData);


    };




    // Register function

    const register = (userData)=>{


        localStorage.setItem(
            "user",
            JSON.stringify(userData)
        );


        setUser(userData);


    };





    // Logout function

    const logout = ()=>{


        localStorage.removeItem(
            "user"
        );


        setUser(null);


    };




    return(

        <AuthContext.Provider
        value={{
            user,
            login,
            register,
            logout,
            loading
        }}
        >

            {children}

        </AuthContext.Provider>

    );

}





export function useAuth(){

    return useContext(AuthContext);

}