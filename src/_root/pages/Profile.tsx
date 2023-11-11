import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetUserQuery } from '@/lib/react-query/queriesAndMutations';
import { useUserContext } from '@/hooks/useUserContext';
import { Button } from '@/components/ui/button';
import { useGetRecentPostsQuery } from '@/lib/react-query/queriesAndMutations';
import Loader from '@/components/shared/Loader';
import { Models } from 'appwrite';
import { GridPostList } from '@/components/shared';

const Profile = () => {
  const [userPosts, setUserPosts] = useState<Models.Document[]>([]);
  const { id } = useParams();
  const { user } = useUserContext();
  const { data: profileUser, isLoading } = useGetUserQuery(id);
  const { data: posts } = useGetRecentPostsQuery();

  useEffect(() => {
    if (posts && user) {
      const filteredPosts = posts.documents.filter(
        (post) => post.creator.$id === profileUser?.$id
      );
      setUserPosts(filteredPosts);
    }
  }, [user, posts]);

  return isLoading ? (
    <div className='flex justify-center items-center w-full h-full'>
      <Loader />
    </div>
  ) : (
    <div className='w-full flex flex-col overflow-scroll custom-scrollbar px-8 py-10 md:p-16'>
      <div className='flex justify-between items-center w-full'>
        <div className='flex items-center gap-6 w-full max-w-[50%]'>
          <img
            src={profileUser?.imageUrl || '/assets/images/profile.png'}
            alt='Profile Photo'
            className='w-20 h-20 rounded-full object-contain'
          />
          <div className='flex flex-col gap-3 md:gap-5 w-full'>
            <div className='flex flex-col'>
              <h2 className='text-light-1 font-bold text-[20px] md:text-[24px]'>
                {profileUser?.name}
              </h2>
              <p className='text-sm text-light-3'>@{profileUser?.username}</p>
            </div>
            <div className='flex justify-between gap-4 w-full'>
              <div className='flex gap-2'>
                <p>11</p>
                <p>Posts</p>
              </div>
              <div className='flex gap-2'>
                <p>11</p>
                <p>Posts</p>
              </div>
              <div className='flex gap-2'>
                <p>11</p>
                <p>Posts</p>
              </div>
            </div>
          </div>
        </div>
        {profileUser?.$id === user.id && (
          <Button
            variant='default'
            className='bg-light-4 text-light-1 text-sm rounded-md px-8 py-4'
          >
            Follow
          </Button>
        )}
      </div>
      <div className='w-full flex flex-wrap gap-9 mt-10'>
        <GridPostList posts={userPosts} showUser={false} />
      </div>
    </div>
  );
};

export default Profile;
