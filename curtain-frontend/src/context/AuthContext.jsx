import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

const AuthContext = createContext();

const API_URL = "http://localhost:5000/api/auth";

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    // ==========================================
    // VERIFY AUTHENTICATION
    // ==========================================

    const verifyAuthentication = async () => {

        const savedToken = localStorage.getItem("token");

        // No token means user is not logged in
        if (!savedToken) {

            localStorage.removeItem("user");

            setUser(null);
            setLoading(false);

            return;
        }


        try {

            const response = await fetch(`${API_URL}/profile`, {
                method: "GET",

                headers: {
                    Authorization: `Bearer ${savedToken}`
                }
            });


            const data = await response.json();


            if (response.ok) {

                // Token is valid
                setUser(data.user);

                // Keep user information synchronized
                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );

            } else {

                // Token is invalid or expired
                localStorage.removeItem("token");
                localStorage.removeItem("user");

                setUser(null);
            }

        } catch (error) {

            console.error(
                "Authentication verification error:",
                error
            );

            localStorage.removeItem("token");
            localStorage.removeItem("user");

            setUser(null);

        } finally {

            setLoading(false);
        }
    };


    // ==========================================
    // CHECK AUTHENTICATION WHEN APP LOADS
    // ==========================================

    useEffect(() => {

        verifyAuthentication();

    }, []);


    // ==========================================
    // LOGIN
    // ==========================================

    const login = async (email, password) => {

        try {

            const response = await fetch(`${API_URL}/login`, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email,
                    password
                })
            });


            const data = await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message || "Login failed"
                );
            }


            // Save JWT token
            localStorage.setItem(
                "token",
                data.token
            );


            // Save user information
            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );


            // Update React authentication state
            setUser(data.user);


            return data;

        } catch (error) {

            console.error(
                "Login error:",
                error
            );

            throw error;
        }
    };


    // ==========================================
    // REGISTER
    // ==========================================

    const register = async (
        name,
        email,
        password
    ) => {

        try {

            const response = await fetch(`${API_URL}/register`, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            });


            const data = await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message || "Registration failed"
                );
            }


            // Save JWT token
            localStorage.setItem(
                "token",
                data.token
            );


            // Save user information
            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );


            // Update React authentication state
            setUser(data.user);


            return data;

        } catch (error) {

            console.error(
                "Registration error:",
                error
            );

            throw error;
        }
    };


    // ==========================================
    // LOGOUT
    // ==========================================

    const logout = () => {

        // Remove authentication information
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        // Clear React authentication state
        setUser(null);
    };


    // ==========================================
    // AUTH CONTEXT PROVIDER
    // ==========================================

    return (
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


// ==========================================
// USE AUTH HOOK
// ==========================================

export function useAuth() {

    return useContext(AuthContext);
}