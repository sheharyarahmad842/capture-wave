import Loader from '@/components/shared/Loader';
import UserCard from '@/components/shared/UserCard';
import { useUserContext } from '@/hooks/useUserContext';
import { useGetUsersQuery } from '@/lib/react-query/queriesAndMutations';

const AllUsers = () => {
  const { user } = useUserContext();
  const { data: users, isLoading } = useGetUsersQuery(user.id);
  return (
    <div className='flex flex-col items-start flex-1 px-5 py-10 md:px-8 lg:p-14 gap-6 md:gap-8 overflow-scroll custom-scrollbar w-full'>
      <h2 className='font-bold text-[24px] lg:text-[30px] text-left w-full mt-5'>
        All Users
      </h2>
      {isLoading ? (
        <Loader />
      ) : (
        <ul className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full max-w-5xl gap-6'>
          {users?.documents.map((user) => (
            <li key={user.$id} className='min-w-[200px] w-full'>
              <UserCard user={user} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllUsers;
