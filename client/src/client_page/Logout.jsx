import React, { useEffect } from 'react'
import { useAuth } from '../store/auth'
import { Navigate } from 'react-router-dom';

export  const Logout = () => {

    const {logoutuser} = useAuth();

    useEffect(()=>{
        logoutuser();
    },[logoutuser]);

    return <Navigate to='/signin' />
};
