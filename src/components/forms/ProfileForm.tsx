import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '../ui/textarea';
import { ProfileValidation } from '@/lib/validation';
import { useUpdateUserMutation } from '@/lib/react-query/queriesAndMutations';
import { useGetUserQuery } from '@/lib/react-query/queriesAndMutations';
import { useUserContext } from '@/hooks/useUserContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '../ui/use-toast';
import { Loader } from 'lucide-react';
import ProfileUploader from '../shared/ProfileUploader';

const ProfileForm = () => {
  const { user, setUser, isLoading } = useUserContext();
  console.log(user);
  const navigate = useNavigate();
  const { toast } = useToast();
  // 1. Define your form.
  const form = useForm<z.infer<typeof ProfileValidation>>({
    resolver: zodResolver(ProfileValidation),
    defaultValues: {
      file: [],
      name: user.name,
      username: user.username,
      email: user.email,
      bio: user.bio || '',
    },
  });

  const { id } = useParams();
  const { mutateAsync: updateUser, isLoading: isUpdateLoading } =
    useUpdateUserMutation();
  const { data: currentUser } = useGetUserQuery(id || '');

  // 2. Define a submit handler.
  const handleSubmit = async (value: z.infer<typeof ProfileValidation>) => {
    try {
      // Update User
      const updatedUser = await updateUser({
        name: value.name,
        file: value.file,
        bio: value.bio,
        userId: currentUser?.$id || '',
        imageUrl: currentUser?.imageUrl,
        imageId: currentUser?.imageId,
      });
      if (!updatedUser) {
        toast({
          title: 'Update user failed. Please try again',
        });
        return;
      }
      setUser({
        ...user,
        name: updatedUser.name,
        bio: updatedUser.bio,
        imageUrl: updatedUser.imageUrl,
      });
      return navigate(`/profile/${id}`);
    } catch (error) {
      console.log(error);
      return;
    }
  };
  return !currentUser || isLoading ? (
    <div className='flex justify-center items-center w-full h-full'>
      <Loader />
    </div>
  ) : (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className='flex flex-col gap-8 max-w-5xl w-full justify-start'
      >
        <FormField
          control={form.control}
          name='file'
          render={({ field }) => (
            <FormItem>
              <ProfileUploader
                fieldChange={field.onChange}
                mediaUrl={currentUser?.imageUrl}
              />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input className='shad-input' {...field} />
              </FormControl>
              <FormMessage className='shad-form-message' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input type='text' className='shad-input' {...field} disabled />
              </FormControl>
              <FormMessage className='shad-form-message' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type='text' className='shad-input' {...field} disabled />
              </FormControl>
              <FormMessage className='shad-form-message' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='bio'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea className='shad-textarea' {...field} />
              </FormControl>
              <FormMessage className='shad-form-message' />
            </FormItem>
          )}
        />
        <div className='flex items-center justify-end gap-2'>
          <Button
            variant='default'
            type='button'
            className='bg-dark-4 text-light-1 h-12 px-5 flex gap-2'
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button
            variant='default'
            type='submit'
            className='bg-primary-500 text-light-1 px-5 h-12 flex gap-1 items-center'
            disabled={isUpdateLoading}
          >
            {isUpdateLoading && <Loader />} Update Profile
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProfileForm;
