import { bottombarLinks } from '@/constants';
import { Link, useLocation } from 'react-router-dom';

const Bottombar = () => {
  const { pathname } = useLocation();
  return (
    <section className='sticky bottom-0 z-50 bg-dark-2 w-full md:hidden px-5 py-4 rounded-[20px]'>
      <ul className='flex justify-between items-center'>
        {bottombarLinks.map((link) => {
          const isActive = pathname === link.route;
          return (
            <Link
              to={link.route}
              className={`${
                isActive && 'bg-primary-500 rounded-[10px]'
              } flex flex-col items-center gap-1 p-2 transition`}
            >
              <img
                src={link.imgURL}
                alt='Icon'
                className={`w-4 h-4 ${isActive && 'invert-white'}`}
              />
              <p className='text-light-2 text-sm'>{link.label}</p>
            </Link>
          );
        })}
      </ul>
    </section>
  );
};

export default Bottombar;
