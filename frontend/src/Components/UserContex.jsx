import { createContext, useContext, useState } from "react";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
	const [loginUser, setLoginUser] = useState(null);

	return (
		<UserContext.Provider value={{ loginUser, setLoginUser }}>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = () => useContext(UserContext);
