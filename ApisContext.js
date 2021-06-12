import { useNavigationState } from '@react-navigation/core'
import React , {useState, useContext} from 'react'

const LoginContext = React.createContext([{},()=>{}])

const LoginProvider = (props) =>{

    const primeiro_login = ""
    
    const [login, setLogin] = useState(primeiro_login);
    return (
        <LoginContext.Provider value={[login, setLogin]}>
            {props.children}
        </LoginContext.Provider>
    )
}

const ModalContext = React.createContext([{},()=>{}])

const ModalProvider = (props) =>{
    
    const [modal, setModal] = useState();
    return (
        <ModalContext.Provider value={[modal, setModal]}>
            {props.children}
        </ModalContext.Provider>
    )
}

export {LoginContext, LoginProvider}
export {ModalContext, ModalProvider}