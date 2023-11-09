import PostCard from '@/components/shared/PostCard';
import { useGetRecentPostsQuery } from '@/lib/react-query/queriesAndMutations';
import { Loader } from 'lucide-react';

const Home = () => {
  const { data: posts, isLoading: isPostLoading } = useGetRecentPostsQuery();

  return (
    <div className='flex flex-1'>
      <div className='flex flex-col items-center flex-1 py-10 px-5 md:px-8 lg:p-14 overflow-scroll custom-scrollbar'>
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
    </div>
  );
};

export default Home;
