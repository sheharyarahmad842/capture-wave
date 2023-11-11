import PostCard from '@/components/shared/PostCard';
import {
  useGetRecentPostsQuery,
  useGetUsersQuery,
} from '@/lib/react-query/queriesAndMutations';
import { useUserContext } from '@/hooks/useUserContext';
import Loader from '@/components/shared/Loader';
import UserCard from '@/components/shared/UserCard';

const Home = () => {
  const { user } = useUserContext();
  const { data: posts, isLoading: isPostLoading } = useGetRecentPostsQuery();
  const { data: users, isLoading: isUsersLoading } = useGetUsersQuery(
    user.id,
    5
  );
  return (
    <div className='flex flex-1'>
      <div className='flex flex-col items-center flex-1 py-10 px-5 md:px-8 lg:p-14 overflow-scroll custom-scrollbar w-full'>
        <div className='flex flex-col items-center w-full gap-6 md:gap-9 max-w-screen-sm'>
          <h2 className='font-bold text-[24px] text-left w-full mt-5'>
            Home Feed
          </h2>
          {isPostLoading && !posts ? (
            <Loader />
          ) : (
            <ul className='flex flex-col gap-9 items-center w-full'>
              {posts?.documents.map((post) => (
                <PostCard post={post} key={post.$id} />
              ))}
            </ul>
          )}
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

export default Home;
