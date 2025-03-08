import { createContext, useContext, useState } from "react";
import { ParentApi } from "../service/api/student/parentApi";

export const ParentStateContext = createContext({
    parents: {},
    addParent: (parent) => { },
    removeParent: (id) => { },
    updateParent: (parent) => { },
    getAllParents: () => { },
    setParents: () => { },
})

export const ParentContext = ({ children }) => {

    const [parents, setParents] = useState([]);


    const getAllParents = async () => {
        try {
            const response = await ParentApi.allParent();
            return response.data; // Return data if needed for further processing
          } catch (error) {
            console.error("Error fetching parent data:", error.message); // Handle and log errors
            throw error; // Optional: rethrow the error for upstream handling
          }

    };

    const addParent = async (payload) => {
            return await ParentApi.create(payload);
    };


    const removeParent = async (parentId) => { };


    const updateParent = async (parent) => { };
    return <ParentStateContext.Provider
        value={{
            parents,
            addParent,
            updateParent,
            removeParent,
            getAllParents,
            setParents,
        }}
    >
        {children}
    </ParentStateContext.Provider>

}

export const useParentContext = () => useContext(ParentStateContext);
