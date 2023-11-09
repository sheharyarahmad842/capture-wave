import { multiFormatDateString } from '@/lib/utils';
import { Models } from 'appwrite';
import { Link } from 'react-router-dom';
import { useUserContext } from '@/hooks/useUserContext';
import PostStats from './PostStats';

type PostCardProps = {
  post: Models.Document;
};

const PostCard = ({ post }: PostCardProps) => {
  const { user } = useUserContext();

  if (!post.creator) return;
  return (
    <div className='rounded-3xl border border-dark-4 p-5 lg:p-7 bg-dark-2 w-full max-w-screen-sm'>
      <div className='flex justify-between items-center'>
        <div className='flex gap-3'>
          <Link to={`/posts/${post.creator.id}`}>
            <img
              src={post.creator.imageUrl || '/assets/images/profile.png'}
              className='rounded-full w-12 object-contain'
            />
          </Link>
          <div className='flex flex-col'>
            <p className='text-base leading-[160%] text-light-1 font-semibold'>
              {post.creator.name}
            </p>
            <p className='text-sm text-light-3'>
              {multiFormatDateString(post.$createdAt)} - {post.location}
            </p>
          </div>
        </div>
        <Link
          to={`/update-post/${post.$id}`}
          className={`${user.id !== post.creator.$id && 'hidden'} `}
        >
          <img
            src='/assets/icons/edit.svg'
            alt='Edit Icon'
            width={20}
            height={20}
          />
        </Link>
      </div>
      <Link to={`/posts/${post.$id}`}>
        <div className='py-5'>
          <h3 className='text-light-1 font-semibold'>{post.caption}</h3>
          <ul className='flex items-center gap-1 mt-2'>
            {post.tags.map((tag: string) => (
              <li key={tag} className='text-sm text-light-3'>
                #{tag}
              </li>
            ))}
          </ul>
        </div>
        <img
          src={post.imageUrl || '/assets/images/profile.png'}
          alt='Post Image'
          className='h-64 xs:h-[400px] lg:h-[450px] w-full rounded-[24px] object-cover'
        />
      </Link>

      <PostStats post={post} userId={user.id} />
    </div>
  );
};

export default PostCard;
