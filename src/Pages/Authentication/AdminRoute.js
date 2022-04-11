import React from 'react';
import { Spinner, Stack } from 'react-bootstrap';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import useFirebase from '../../Hooks/useFirebase';

const AdminRoute = ({children, ...rest}) => {
    let {user,  isAdmin} = useFirebase();
    let location = useLocation();

    if (!isAdmin) { return <Stack >
    <Spinner animation="border" className='mx-auto ' variant="danger" />
    </Stack> }
    if (user.email && isAdmin) {
      return children;
  }
  return <Navigate to="/home" state={{ from: location }} />;
};

export default AdminRoute;