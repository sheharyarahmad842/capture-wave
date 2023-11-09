import { Models } from 'appwrite';
import { Link } from 'react-router-dom';
import { useUserContext } from '@/hooks/useUserContext';
import PostStats from './PostStats';

type GridPostListProps = {
  posts: Models.Document[];
  showStats?: boolean;
  showUser?: boolean;
};

const GridPostList = ({
  posts,
  showStats = true,
  showUser = true,
}: GridPostListProps) => {
  const { user } = useUserContext();
  return (
    <div className='grid grid-cols-1 xl:grid-cols-3 gap-7 w-full'>
      {posts.map((item) => {
        const post = item.post;
        return (
          <div className='relative min-w-80 h-80'>
            <Link
              to={`/posts/${post.$id}`}
              className='flex rounded-[24px] cursor-pointer overflow-hidden w-full h-full border-dark-4 border'
            >
              <img
                src={post.imageUrl}
                alt='Post Image'
                className='w-full h-full object-cover'
              />
            </Link>
            <div className='absolute bottom-0 flex justify-between items-center p-5 bg-gradient-to-t from-dark-3 to-transparent w-full rounded-b-[24px]'>
              {showUser && (
                <div className='flex items-center gap-2'>
                  <img
                    src={post.creator.imageUrl}
                    alt='User Image'
                    className='w-6 h-6 object-contain rounded-full'
                  />
                  <p className='text-light-1 font-semilbold text-[14px] line-clamp-1'>
                    {post.creator.name}
                  </p>
                </div>
              )}
              {showStats && <PostStats post={post} userId={user.id} />}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GridPostList;
