import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { useSignOutAccountMutation } from '@/lib/react-query/queriesAndMutations';
import { useUserContext } from '@/hooks/useUserContext';

const Topbar = () => {
  const { mutate: signOutAccount, isSuccess } = useSignOutAccountMutation();
  const { user } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);
  return (
    <section className='sticky top-0 z-50 md:hidden bg-dark-2 w-full'>
      <nav className='flex justify-between items-center py-4 px-5'>
        <Link to='/'>
          <img
            src='/assets/images/logo.svg'
            alt='Logo'
            width={150}
            height={300}
            className='object-contain'
          />
        </Link>
        <div className='flex gap-2 items-center'>
          <Button variant='ghost' onClick={() => signOutAccount()}>
            <img src='/assets/icons/logout.svg' alt='Logout' />
          </Button>
          <Link to={`/profile/${user.id}`}>
            <img
              src={`${user.imageUrl}` || '/assets/images/profile.png'}
              alt='Profile'
              className='w-8 h-8 rounded-full object-contain'
            />
          </Link>
        </div>
      </nav>
    </section>
  );
};

export default Topbar;
