import { createContext } from "react";
import { AdminContextValue } from "./type";


export const AdminContext = createContext<AdminContextValue>({
    usersTable: false,
    examsTable: false,
    materialsTable:false
});