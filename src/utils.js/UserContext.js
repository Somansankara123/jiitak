import {  createContext, useState } from "react";

export const UserContext = createContext()

const UserProvider =({children})=>{
    const [loginResponse,setLoginResponse] = useState('')

    return(
        <UserContext.Provider value={{loginResponse,setLoginResponse}}>
            {children}
        </UserContext.Provider>
    )
}
export default UserProvider