import { Link, useParams } from 'react-router-dom';
import {
  useGetUserQuery,
  useGetUserPostsQuery,
} from '@/lib/react-query/queriesAndMutations';
import { useUserContext } from '@/hooks/useUserContext';
import { Button } from '@/components/ui/button';
import { GridPostList } from '@/components/shared';
import Loader from '@/components/shared/Loader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Profile = () => {
  const { id } = useParams();
  const { user } = useUserContext();
  const { data: currentUser, isLoading } = useGetUserQuery(id);
  const { data: userPosts, isLoading: isLoadingUserPosts } =
    useGetUserPostsQuery(user.id);
  console.log('Current User', currentUser?.liked);
  console.log('User Posts', userPosts?.documents);
  return isLoading || isLoadingUserPosts ? (
    <div className='flex justify-center items-center w-full h-full'>
      <Loader />
    </div>
  ) : (
    <div className='w-full max-w-5xl flex flex-col gap-10 overflow-scroll custom-scrollbar px-5 md:p-14 py-10'>
      <div className='flex flex-col xl:flex-row items-center xl:items-start gap-8 w-full md:mb-8'>
        <div className='flex flex-col xl:flex-row max-xl:items-center gap-7 flex-1'>
          <img
            src={currentUser?.imageUrl || '/assets/images/profile.png'}
            alt='Profile Photo'
            className='w-28 h-28 lg:h-36 lg:w-36 rounded-full object-contain'
          />
          <div className='flex flex-col flex-1 justify-between md:mt-2'>
            <div className='flex flex-col w-full max-xl:items-center'>
              <h2 className='text-light-1 font-bold text-[20px] md:text-[24px]'>
                {currentUser?.name}
              </h2>
              <p className='text-light-3'>@{currentUser?.username}</p>
            </div>
            <p className='text-base text-light-2 max-w-screen-sm mt-2'>
              {currentUser?.bio}
            </p>
            <div className='flex items-center justify-center mt-10 gap-8 xl:justify-start flex-wrap'>
              <div className='flex justify-center items-center gap-2'>
                <p className='text-primary-500 text-sm font-semibold lg:text-base lg:font-bold'>
                  11
                </p>
                <p className='text-light-2 text-[15px] font-semibold lg:text-base'>
                  Posts
                </p>
              </div>
              <div className='flex justify-center items-center gap-2'>
                <p className='text-primary-500 text-sm font-semibold lg:text-base lg:font-bold'>
                  11
                </p>
                <p className='text-light-2 text-[15px] font-semibold lg:text-base'>
                  Posts
                </p>
              </div>
              <div className='flex justify-center items-center gap-2'>
                <p className='text-primary-500 text-sm font-semibold lg:text-base lg:font-bold'>
                  11
                </p>
                <p className='text-light-2 text-[15px] font-semibold lg:text-base'>
                  Posts
                </p>
              </div>
            </div>
          </div>
        </div>
        {currentUser?.$id !== user.id ? (
          <Button
            variant='default'
            className='bg-primary-500 text-light-1 text-sm rounded-md px-8 py-4'
          >
            Follow
          </Button>
        ) : (
          <Link
            to={`/edit-profile/${currentUser.$id}`}
            className='flex justify-center items-center gap-2 bg-dark-4 px-5 h-12 rounded-lg text-light-1'
          >
            <img
              src='/assets/icons/edit.svg'
              alt='Edit'
              width={20}
              height={20}
            />
            <p className='text-sm text-light-1'>Edit Profile</p>
          </Link>
        )}
      </div>

      <Tabs defaultValue='posts'>
        <TabsList className='flex justify-center max-w-5xl w-full xl:justify-start mb-10'>
          <TabsTrigger
            value='posts'
            className='flex justify-center items-center gap-3 w-48 py-4 rounded-l-lg bg-dark-2 flex-1 xl:flex-initial'
          >
            <img
              src='/assets/icons/posts.svg'
              alt='Posts'
              width={20}
              height={20}
            />
            <p className='text-ligth-1 text-[14px]'>Posts</p>
          </TabsTrigger>
          <TabsTrigger
            value='liked'
            className='flex justify-center items-center gap-3 w-48 py-4 rounded-r-lg bg-dark-3 flex-1 xl:flex-initial'
          >
            <img
              src='/assets/icons/like.svg'
              alt='Posts'
              width={20}
              height={20}
            />
            <p className='text-ligth-1 text-[14px]'>Liked Posts</p>
          </TabsTrigger>
        </TabsList>
        <TabsContent value='posts'>
          <GridPostList
            posts={userPosts?.documents}
            width={true}
            showUser={false}
          />
        </TabsContent>
        <TabsContent value='liked'>
          <GridPostList
            posts={currentUser?.liked}
            width={true}
            showStats={false}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
