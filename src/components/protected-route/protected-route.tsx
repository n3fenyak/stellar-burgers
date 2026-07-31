import { FC, ReactElement } from 'react';
import { useLocation, Navigate } from 'react-router-dom';

import { Preloader } from '../ui/preloader';
import { useSelector } from '../../services/store';

type ProtectedRouteProps = {
  children: ReactElement;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  children,
  onlyUnAuth = false
}) => {
  const location = useLocation();
  const { user, isAuthChecked } = useSelector((state) => state.user);

  if (!isAuthChecked) {
    return <Preloader />;
  }
  if (onlyUnAuth && user) {
    const from = location.state?.from?.pathname || '/';

    return <Navigate to={from} replace />;
  }
  if (!onlyUnAuth && !user) {
    return (
      <Navigate
        to='/login'
        replace
        state={{
          from: location
        }}
      />
    );
  }
  return children;
};
