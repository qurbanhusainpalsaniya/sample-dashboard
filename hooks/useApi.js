import { ApiContext } from "context/ApiContext";
import { useContext } from "react";

const useApi = () => {
    const context = useContext(ApiContext);
    if (!context) throw new Error("Api context must be use inside AuthProvider");

    return context;
};

export default useApi;
