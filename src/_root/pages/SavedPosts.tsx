import { useState, useEffect } from 'react';
import { GridPostList } from '@/components/shared';
import { useUserContext } from '@/hooks/useUserContext';
import {
  useGetSavedPostsQuery,
  useGetUsersQuery,
} from '@/lib/react-query/queriesAndMutations';
import { Loader } from 'lucide-react';
import { Models } from 'appwrite';
import UserCard from '@/components/shared/UserCard';

const SavedPosts = () => {
  const { user } = useUserContext();
  const { data: savedPosts, isLoading } = useGetSavedPostsQuery(user.id);
  const [posts, setPosts] = useState<Models.Document[]>([]);
  const { data: users, isLoading: isUsersLoading } = useGetUsersQuery(
    user.id,
    5
  );
  useEffect(() => {
    if (savedPosts) {
      const filteredPosts = savedPosts.documents.map((item) => item.post);
      setPosts(filteredPosts);
    }
  }, [savedPosts]);
  return isLoading ? (
    <div className='flex justify-center items-center w-full h-full'>
      <Loader />
    </div>
  ) : (
    <div className='flex flex-1'>
      <div className='flex flex-col flex-1 items-center gap-8 max-w-5xl w-full px-5 py-10 md:px-8 lg:p-14 overflow-scroll custom-scrollbar'>
        <div className='flex gap-2 items-center justify-start w-full'>
          <img src='/assets/icons/save.svg' alt='Save' width={36} height={36} />
          <h3 className='font-bold text-[24px] md:text-[30px] leading-[140%] tracking-tight'>
            Saved Posts
          </h3>
        </div>
        <div className='w-full'>
          <GridPostList posts={posts} showStats={false} />
        </div>
      </div>
      {isUsersLoading ? (
        <Loader />
      ) : (
        <div className='hidden xl:flex h-full w-72 2xl:w-465 px-6 py-10 flex-col gap-10 overflow-scroll custom-scrollbar'>
          <h3 className='font-bold text-[24px] lg:text[30px] text-light-1'>
            Top Creators
          </h3>
          <div className='grid 2xl:grid-cols-2 gap-6'>
            {users?.documents.map((user) => (
              <UserCard user={user} key={user.$id} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedPosts;
