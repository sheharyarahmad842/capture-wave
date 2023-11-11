import { Models } from 'appwrite';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

type UserCardProps = {
  user: Models.Document;
};

const UserCard = ({ user }: UserCardProps) => {
  return (
    <Link
      to={`/profile/${user.$id}`}
      className='flex flex-col items-center justify-center gap-4 border border-dark-4 rounded-[24px] px-5 py-8 w-full'
    >
      <img
        src={`${user.imageUrl}` || '/assets/images/profile.png'}
        className='w-12 h-12 rounded-full object-contain'
      />
      <div className='flex flex-col items-center'>
        <p className='text-base font-semibold leading-[140%]'>{user.name}</p>
        <p className='text-[14px] leading-[140%] text-light-3'>
          @{user.username}
        </p>
      </div>

      <Button
        variant='default'
        className='bg-primary-500 text-white px-6 py-4 rounded-lg'
      >
        Follow
      </Button>
    </Link>
  );
};

export default UserCard;
