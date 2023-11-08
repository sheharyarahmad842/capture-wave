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
import { FileUploader } from '../shared';
import { PostValidation } from '@/lib/validation';
import { Models } from 'appwrite';
import { useCreatePostMutation } from '@/lib/react-query/queriesAndMutations';
import { useUserContext } from '@/hooks/useUserContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../ui/use-toast';
import { Loader } from 'lucide-react';

type PostFormProps = {
  post?: Models.Document;
};

const PostForm = ({ post }: PostFormProps) => {
  const { mutateAsync: createPost, isLoading } = useCreatePostMutation();
  const { user } = useUserContext();
  const navigate = useNavigate();
  const { toast } = useToast();
  // 1. Define your form.
  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: post ? post.caption : '',
      file: [],
      location: post ? post.location : '',
      tags: post ? post.tags.join(',') : '',
    },
  });

  // 2. Define a submit handler.
  const handleSubmit = async (post: z.infer<typeof PostValidation>) => {
    try {
      const newPost = await createPost({
        userId: user.id,
        ...post,
      });
      if (!newPost) toast({ title: 'Please try again' });
      navigate('/');
    } catch (error) {
      console.log(error);
      return;
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className='flex flex-col gap-8 max-w-5xl w-full justify-start'
      >
        <FormField
          control={form.control}
          name='caption'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Caption</FormLabel>
              <FormControl>
                <Textarea className='shad-textarea' {...field} />
              </FormControl>
              <FormMessage className='shad-form-message' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='file'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add Photo</FormLabel>
              <FileUploader
                fieldChange={field.onChange}
                mediaUrl={post?.imageUrl}
              />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='location'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input type='text' className='shad-input' {...field} />
              </FormControl>
              <FormMessage className='shad-form-message' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='tags'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add Tags (separated by comma ",")</FormLabel>
              <FormControl>
                <Input
                  type='text'
                  className='shad-input'
                  placeholder='JS, React, NextJS'
                  {...field}
                />
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
          >
            Cancel
          </Button>
          <Button
            variant='default'
            type='submit'
            className='bg-primary-500 text-light-1 px-5 h-12 flex gap-1 items-center'
            disabled={isLoading}
          >
            {isLoading && <Loader />} Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PostForm;
