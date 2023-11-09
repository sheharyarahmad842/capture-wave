import { useParams } from 'react-router-dom';
import { useGetPostByIdQuery } from '@/lib/react-query/queriesAndMutations';
import PostForm from '@/components/forms/PostForm';

const UpdatePost = () => {
  const { id } = useParams();
  const { data: post } = useGetPostByIdQuery(id);

  return (
    <div className='flex flex-1'>
      <div className='flex flex-col flex-1 items-center gap-8 py-10 px-5 md:px-8 lg:p-14 custom-scrollbar overflow-scroll'>
        <div className='flex justify-start items-center max-w-5xl w-full gap-2'>
          <img src='/assets/icons/add-post.svg' alt='Add' className='w-9 h-9' />
          <h3 className='font-bold text-[24px] md:text-[30px] tracking-tighter'>
            Update Post
          </h3>
        </div>
        <PostForm action='Update' post={post} />
      </div>
    </div>
  );
};

export default UpdatePost;
