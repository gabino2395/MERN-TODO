import { createContext, useContext, useState, useEffect } from "react";
import { loginRequest, registerRequest, verifyTokenRequest } from "../api/auth";
import { toast } from "sonner";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // const signup = async (user) => {
  //   try {
  //     const res = await registerRequest(user);
  //     if (res.status === 200) {
  //       setUser(res.data);
  //       setIsAuthenticated(true);
  //       setErrors(null); // Limpiar los errores si la solicitud tiene éxito
  //     }
  //   } catch (error) {
  //     const errorMessage = error.response.data.message;
  //     setErrors(error);
  //   }
  // };
  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      if (res.status === 200) {
        setUser(res.data);
        setIsAuthenticated(true);
        setErrors(null); // Limpia los errores si la solicitud tiene éxito
      }
    } catch (error) {
      console.error("Error al registrarse:", error);
  
      const errorMessage = error.response && error.response.data
        ? error.response.data.message
        : "An error occurred while signing up.";
  
      setErrors(errorMessage);
    }
  };
  // const signin = async (user) => {
  //   try {
  //     const res = await loginRequest(user);
  //     if (res.status === 200) {
  //       setUser(res.data);
  //       setIsAuthenticated(true);
  //       setErrors(null);
  //     }
  //   } catch (error) {
  //     console.log("esta entradndo en el catch", error.message);
  //     // setErrors(error.message);
  //     const errorMessage = error.message;
  //     const errorMessageData = error.response.data.message;
  //     if (errorMessage) {
  //       console.log("esta entradndo en el catch error message:", errorMessage);

  //       setErrors(errorMessage);
  //       toast.error(errors);
  //     } else {
  //       console.log(
  //         "esta entradndo en el catch error messageData:",
  //         errorMessageData
  //       );

  //       setErrors(errorMessageData);
  //     }
  //   }
  // };
  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      if (res.status === 200) {
        setUser(res.data);
        setIsAuthenticated(true);
        setErrors(null);
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);

      const errorMessage =
        error.message || (error.response && error.response.data.message);

      setErrors(errorMessage || "An error occurred while signing in.");
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const res = await verifyTokenRequest(cookies.token);
        console.log(res);
        if (!res.data) return setIsAuthenticated(false);
        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setLoading(false);
      }
    };
    checkLogin();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        signin,
        isAuthenticated,
        errors,
        loading,
        toast,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
