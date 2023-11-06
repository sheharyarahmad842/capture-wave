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
import { SignInValidation } from '@/lib/validation';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { useSignInAccontMutation } from '@/lib/react-query/queriesAndMutations';
import { useUserContext } from '@/hooks/useUserContext';
import Loader from '@/components/shared/Loader';

const SignInForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  // 1. Define your form.
  const form = useForm<z.infer<typeof SignInValidation>>({
    resolver: zodResolver(SignInValidation),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutateAsync: signInAccount, isLoading: isSigningInUser } =
    useSignInAccontMutation();
  // 2. Define a submit handler.
  const handleSignIn = async (user: z.infer<typeof SignInValidation>) => {
    try {
      const session = await signInAccount(user);
      if (!session) {
        toast({ title: 'Login failed. Please try again.' });
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
        <img src='/assets/images/logo.svg' alt='Logo' />
        <h2 className='mt-5 sm:mt-8 font-bold text-[24px] md:text-[30px] tracking-tighter'>
          Log in to your account
        </h2>
        <p className='text-[14px] font-medium md:text-[16px] text-light-3 mt-2 mb-4 '>
          Welcome back! Please enter your details.
        </p>
        <form
          onSubmit={form.handleSubmit(handleSignIn)}
          className='flex flex-col gap-4 w-full'
        >
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
            {isUserLoading || isSigningInUser ? (
              <div className='flex justify-center items-center gap-2'>
                <Loader /> Loading...
              </div>
            ) : (
              'Sign In'
            )}
          </Button>
        </form>
        <p className='text-sm py-4'>
          Don't have an account?{' '}
          <Link to='/sign-up' className='text-primary-500 text-semilbold'>
            Register
          </Link>
        </p>
      </div>
    </Form>
  );
};

export default SignInForm;
