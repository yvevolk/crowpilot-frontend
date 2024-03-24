
import { createContext, useState } from 'react';

export const StylesContext = createContext();

export const StylesProvider = ({children}) => {
  
    const [styles, setStyles] = useState({
    button: "bg-blue m-[30] p-[20] rounded-full",
    container: "w-screen h-[300] p-[50]",
    tagline: "text-navy text-[50px] p-[10] m-[10] text-center",
    textLight: "text-yellow",
    textButtonLight: "text-navy font-bold text-2xl bg-blue text-center",
})

    return (
        <StylesContext.Provider value={{ styles, setStyles }}>
            {children}
        </StylesContext.Provider>
    )
}