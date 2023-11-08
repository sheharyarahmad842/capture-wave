import { useEffect } from 'react';
import { Link, useLocation, useNavigate, NavLink } from 'react-router-dom';
import { useUserContext } from '@/hooks/useUserContext';
import { sidebarLinks } from '@/constants';
import { Button } from '../ui/button';
import { useSignOutAccountMutation } from '@/lib/react-query/queriesAndMutations';

const LeftSidebar = () => {
  const { user } = useUserContext();
  const { pathname } = useLocation();
  const { mutate: signOutAccount, isSuccess } = useSignOutAccountMutation();
  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);
  return (
    <section className='hidden md:flex h-full min-w-[300px] bg-dark-2 py-8 px-6 flex-col justify-between items-start'>
      <div className='flex flex-col gap-10'>
        <Link to='/'>
          <img
            src='/assets/images/logo.svg'
            alt='Logo'
            width={170}
            height={36}
            className='object-contain'
          />
        </Link>

        <Link to={`/profile/${user.id}`} className='flex gap-3 items-center'>
          <img
            src={`${user.imageUrl}` || '/assets/images/profile.png'}
            className='w-12 h-12 rounded-full object-contain'
          />
          <div className='flex flex-col'>
            <p className='text-[18px] font-bold leading-[140%]'>{user.name}</p>
            <p className='text-[14px] leading-[140%] text-light-3'>
              @{user.username}
            </p>
          </div>
        </Link>

        <ul className='flex flex-col gap-5'>
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.route;
            return (
              <li
                key={link.label}
                className={`${
                  isActive && 'bg-primary-500'
                } w-full transition rounded-full hover:bg-primary-500 base-medium group`}
              >
                <NavLink
                  to={link.route}
                  className='flex gap-2 items-center p-4'
                >
                  <img
                    src={link.imgURL}
                    alt='Icon'
                    className={`w-4 h-4 object-contain group-hover:invert-white ${
                      isActive && 'invert-white'
                    }`}
                  />
                  <p className='text-light-2 text-[14px] font-semibold'>
                    {link.label}
                  </p>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>

      <Button
        variant='ghost'
        className='flex items-center gap-4 hover:bg-transparent hover:text-white'
        onClick={() => signOutAccount()}
      >
        <img src='/assets/icons/logout.svg' alt='Logout' />
        <p className='text-[14px] font-semibold leading-[140%]'>Logout</p>
      </Button>
    </section>
  );
};

export default LeftSidebar;
