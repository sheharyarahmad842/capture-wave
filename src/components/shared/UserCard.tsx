import { useState, useEffect } from 'react';
import { Models } from 'appwrite';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import {
  useDeleteFollowerMutation,
  useFollowUserMutation,
  useGetCurrentAccountQuery,
} from '@/lib/react-query/queriesAndMutations';
import Loader from '@/components/shared/Loader';

type UserCardProps = {
  user: Models.Document;
};

const UserCard = ({ user }: UserCardProps) => {
  const [isFollowed, setIsFollowed] = useState(false);
  const { data: currentUser, isFetched } = useGetCurrentAccountQuery();
  const { mutateAsync: followUser, isLoading: isLoadingFollowUser } =
    useFollowUserMutation();
  const { mutateAsync: deleteFollower, isLoading: isLoadingDeleteFollower } =
    useDeleteFollowerMutation();
  const savedFollowerRecord = currentUser?.followees.find(
    (record: Models.Document) => record.followed.$id === user.$id
  );
  useEffect(() => {
    if (isFetched && savedFollowerRecord) {
      setIsFollowed(true);
    }
  }, [savedFollowerRecord, isFetched]);
  const handleFollow = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (savedFollowerRecord) {
        setIsFollowed(false);
        await deleteFollower(savedFollowerRecord.$id);
      } else {
        setIsFollowed(true);
        await followUser({
          followerId: currentUser?.$id || '',
          followedId: user.$id,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='flex flex-col items-center justify-center gap-4 border border-dark-4 rounded-[24px] px-5 py-8 w-full'>
      <Link
        to={`/profile/${user.$id}`}
        className='flex flex-col justify-center items-center gap-4'
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
      </Link>
      <Button
        variant='default'
        className='bg-primary-500 text-white px-6 py-4 rounded-lg'
        onClick={(e) => handleFollow(e)}
      >
        {isLoadingFollowUser || isLoadingDeleteFollower ? (
          <Loader />
        ) : isFollowed ? (
          'Following'
        ) : (
          'Follow'
        )}
      </Button>
    </div>
  );
};

export default UserCard;
