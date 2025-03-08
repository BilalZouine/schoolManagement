import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuthRedirect = (role) => {
    const navigate = useNavigate();

    useEffect(() => {
        // if (authenticated) {
        //     StudentApi.getStudent()
        //         .then(({ data }) => {
        //             const { role } = data;
        //             setStudent(data);
        //             setAuthenticated(true);

        //             if (role !== "parent") {
        //                 navigate(`/${role}`); // Assuming roles map to route prefixes
        //             }
        //         })
        //         .catch(() => {
        //             contextLogout();
        //         });
        // } else {
        //     navigate(LOGIN_ROUTER);
        // }
        console.log(role);
        
    }, [role, navigate]);
};

export default useAuthRedirect;
