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
import { SignUpValidation } from '@/lib/validation';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import {
  useCreateUserAccountMutation,
  useSignInAccontMutation,
} from '@/lib/react-query/queriesAndMutations';
import { useUserContext } from '@/hooks/useUserContext';
import Loader from '@/components/shared/Loader';

const SignUpForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  // 1. Define your form.
  const form = useForm<z.infer<typeof SignUpValidation>>({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      username: '',
      name: '',
      email: '',
      password: '',
    },
  });

  // mutateAsync refers to actual function that is creating user account
  const { mutateAsync: createUserAccount, isLoading: isCreatingAccount } =
    useCreateUserAccountMutation();
  const { mutateAsync: signInAccount, isLoading: isSigningInUser } =
    useSignInAccontMutation();
  // 2. Define a submit handler.
  const handleSignUp = async (user: z.infer<typeof SignUpValidation>) => {
    try {
      const newUser = await createUserAccount(user);
      if (!newUser) {
        toast({ title: 'Sign up failed. Please try again' });
        return;
      }
      const session = await signInAccount({
        email: user.email,
        password: user.password,
      });
      console.log(session);
      if (!session) {
        toast({
          title: 'Something went wrong. Please login to your new account',
        });
        navigate('/sign-in');
        return;
      }

      const isLoggedIn = await checkAuthUser();
      if (isLoggedIn) {
        form.reset();
        navigate('/');
      } else {
        toast({ title: 'Login failed. Please try again.' });
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Form {...form}>
      <div className='flex flex-col justify-center items-center sm:w-420'>
        <img
          src='/assets/images/logo.svg'
          alt='Logo'
          className='w-[250px] h-[80px] max-md:w-[200px] max-md:[h-60px] object-contain'
        />
        <h2 className='mt-2 font-bold text-[24px] md:text-[30px] tracking-tighter'>
          Create a new account
        </h2>
        <p className='text-[14px] font-medium md:text-[16px] text-light-3 mt-2 mb-4 '>
          To use capturewave, Please enter your details
        </p>
        <form
          onSubmit={form.handleSubmit(handleSignUp)}
          className='flex flex-col gap-4 w-full'
        >
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type='name' className='shad-input' {...field} />
                </FormControl>
                <FormMessage />
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
                  <Input type='text' className='shad-input' {...field} />
                </FormControl>
                <FormMessage />
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
                  <Input type='email' className='shad-input' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type='password' className='shad-input' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type='submit'
            className='w-full bg-primary-600 hover:bg-primary-600 text-light-1'
          >
            {isUserLoading || isCreatingAccount || isSigningInUser ? (
              <div className='flex justify-center items-center gap-2'>
                <Loader /> Loading...
              </div>
            ) : (
              'Sign Up'
            )}
          </Button>
        </form>
        <p className='text-sm py-4'>
          Already have an account?{' '}
          <Link to='/sign-in' className='text-primary-500 text-semilbold'>
            Login
          </Link>
        </p>
      </div>
    </Form>
  );
};

export default SignUpForm;
