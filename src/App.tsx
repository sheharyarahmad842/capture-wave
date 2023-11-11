import { Routes, Route } from 'react-router-dom';
import AuthLayout from './_auth/AuthLayout';
import SignInForm from './_auth/forms/SignInForm';
import SignUpForm from './_auth/forms/SignUpForm';
import {
  Home,
  CreatePost,
  UpdatePost,
  PostDetails,
  SavedPosts,
  Explore,
  Profile,
  EditProfile,
} from './_root/pages';
import RootLayout from './_root/RootLayout';
import { Toaster } from '@/components/ui/toaster';

const App = () => {
  return (
    <main className='h-screen flex'>
      <Routes>
        {/* Public Routes */}
        <Route element={<AuthLayout />}>
          <Route path='sign-in' element={<SignInForm />} />
          <Route path='sign-up' element={<SignUpForm />} />
        </Route>
        {/* Private Routes */}
        <Route element={<RootLayout />}>
          <Route index path='/' element={<Home />} />
          <Route path='/create-post' element={<CreatePost />} />
          <Route path='/saved' element={<SavedPosts />} />
          <Route path='/explore' element={<Explore />} />
          <Route path='/update-post/:id' element={<UpdatePost />} />
          <Route path='/posts/:id' element={<PostDetails />} />
          <Route path='/profile/:id' element={<Profile />} />
          <Route path='/edit-profile/:id' element={<EditProfile />} />
        </Route>
      </Routes>
      <Toaster />
    </main>
  );
};

export default App;
