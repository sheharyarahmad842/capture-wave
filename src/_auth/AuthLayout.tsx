import { Outlet, Navigate } from 'react-router-dom';
import { useUserContext } from '@/hooks/useUserContext';

const AuthLayout = () => {
  const { isAuthenticated } = useUserContext();
  return (
    <>
      {isAuthenticated ? (
        <Navigate to='/' />
      ) : (
        <>
          <section className='flex flex-1 justify-center items-center h-full py-5'>
            <Outlet />
          </section>

          <img
            src='/assets/images/side-img.svg'
            alt='Side Image Banner'
            className='hidden xl:block h-full w-[1/2] bg-cover bg-no-repeat'
          />
        </>
      )}
    </>
  );
};

export default AuthLayout;
