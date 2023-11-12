import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  useGetPostByIdQuery,
  useDeletePostMutation,
  useGetUserPostsQuery,
} from '@/lib/react-query/queriesAndMutations';
import { multiFormatDateString } from '@/lib/utils';
import { useUserContext } from '@/hooks/useUserContext';
import Loader from '@/components/shared/Loader';
import PostStats from '@/components/shared/PostStats';
import { GridPostList } from '@/components/shared';
const PostDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useUserContext();
  const { data: post, isLoading } = useGetPostByIdQuery(id);
  const { data: posts, isLoading: isLoadingPosts } = useGetUserPostsQuery(
    post?.creator.$id
  );
  const { mutate: deletePost } = useDeletePostMutation();
  const relatedPosts = posts?.documents.filter(
    (userPost) => userPost.$id !== id
  );
  const handleDeletePost = () => {
    deletePost({ postId: id, imageId: post?.imageId });
    navigate(-1);
  };
  return (
    <div className='flex flex-col items-center gap-10 flex-1 py-10 px-5 md:px-8 lg:p-14 overflow-scroll custom-scrollbar'>
      <div className='hidden md:flex max-w-5xl w-full'>
        <Button
          className='flex gap-4 items-center hover:bg-transparent hover:text-white'
          variant='ghost'
          onClick={() => navigate(-1)}
        >
          <img src='/assets/icons/back.svg' alt='Back' width={24} height={24} />
          <p className='font-semibold text-base'>Back</p>
        </Button>
      </div>
      {isLoading || !post ? (
        <div className='flex items-center justify-center w-full h-full'>
          <Loader />
        </div>
      ) : (
        <div className='max-w-5xl w-full bg-dark-2 rounded-[30px] flex flex-col xl:flex-row border border-dark-4'>
          <img
            src={post?.imageUrl}
            alt='Post Image'
            className='w-full object-cover h-80 lg:[400px] xl:w-[48%] rounded-t-[30px] xl:rounded-l-[24px] xl:rounded-tr-none bg-dark-1 p-5'
          />
          <div className='flex flex-col gap-5 lg:gap-7 flex-1 items-start rounded-[24px] p-8 w-full'>
            <div className='flex justify-between items-center w-full'>
              <div className='flex gap-3'>
                <Link to={`/posts/${post?.creator.id}`}>
                  <img
                    src={post?.creator.imageUrl || '/assets/images/profile.png'}
                    className='rounded-full w-12 object-contain'
                  />
                </Link>
                <div className='flex flex-col'>
                  <p className='text-base leading-[160%] text-light-1 font-semibold'>
                    {post?.creator.name}
                  </p>
                  <p className='text-sm text-light-3'>
                    {multiFormatDateString(post?.$createdAt)} - {post?.location}
                  </p>
                </div>
              </div>
              <div className='flex items-center justify-center'>
                <Link
                  to={`/update-post/${post?.$id}`}
                  className={`${user?.id !== post?.creator.$id && 'hidden'} `}
                >
                  <img
                    src='/assets/icons/edit.svg'
                    alt='Edit Icon'
                    width={20}
                    height={20}
                  />
                </Link>
                <Button
                  variant='ghost'
                  className={`${user?.id !== post?.creator.$id && 'hidden'} `}
                  onClick={handleDeletePost}
                >
                  <img
                    src='/assets/icons/delete.svg'
                    alt='Delete Icon'
                    width={20}
                    height={20}
                  />
                </Button>
              </div>
            </div>
            <hr className='w-full border-dark-4/80 border' />
            <div className='flex flex-col flex-1 w-full'>
              <h3 className='text-light-1 font-semibold'>{post?.caption}</h3>
              <ul className='flex items-center gap-1 mt-2'>
                {post?.tags.map((tag: string) => (
                  <li key={tag} className='text-sm text-light-3'>
                    #{tag}
                  </li>
                ))}
              </ul>
            </div>
            <div className='w-full'>
              <PostStats post={post} userId={user.id} />
            </div>
          </div>
        </div>
      )}
      <hr className='border w-full border-dark-4/80' />
      {posts?.documents.length > 0 && (
        <div className='flex flex-col gap-5 w-full max-w-5xl'>
          <h3 className='font-semibold text-[20px] lg:text-[24px] text-light-1'>
            Related Posts
          </h3>
          {isLoadingPosts ? <Loader /> : <GridPostList posts={relatedPosts} />}
        </div>
      )}
    </div>
  );
};

export default PostDetails;
