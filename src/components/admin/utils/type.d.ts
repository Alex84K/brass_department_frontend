

export interface AdminContextValue {
    usersTable: boolean, 
    examsTable: boolean,
    materialsTable: boolean,
    changeUsersTable?: (usersTable: boolean) => void,
    changeExamsTable?: (examsTable: boolean) => void,
    changeMaterialsTable?: (materialsTable: boolean) => void,
}