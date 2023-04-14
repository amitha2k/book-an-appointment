import React, {useState} from 'react'
import GlobalContext from './GlobalContext'

export default function ContextWrapper(props) {
    const [dateVar, setDateVar] = useState(new Date().getDate());
    const [timeVar, setTimeVar] = useState(0);
    return (
        <div>
            <GlobalContext.Provider value={{ dateVar, setDateVar, timeVar, setTimeVar }}>
                {props.children}
            </GlobalContext.Provider>
        
        </div>
    )
}
