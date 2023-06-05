import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import Login from '../../pages/Login/Login';
import Register from '../../pages/Register/Register';

interface ProtectedPageProps {
  children: any
}

const ProtectedPage = ({children}: ProtectedPageProps) => {
    const { loggedUser} = useSelector((state: RootState) => state.user);
    const isUserLogged = localStorage.getItem("accessToken")  !== ""

  return (
    (loggedUser || isUserLogged) ? children : <Login/>
  )
}

export default ProtectedPage