import React, { createContext, useContext, useState } from 'react'

const UserContext = createContext();

export function UserProvider({children}) {
    const [user, setUser] = useState(null);
    const [allUsers, setAllUsers] = useState([]);
    
  return (
    <UserContext.Provider value={{user, setUser, allUsers, setAllUsers}}>
      {children}
    </UserContext.Provider>
  )
}


export const useUser = ()=>{
    return useContext(UserContext)
}
