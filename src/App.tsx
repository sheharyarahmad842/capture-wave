import { Routes, Route } from 'react-router-dom';
import AuthLayout from './_auth/AuthLayout';
import SignInForm from './_auth/forms/SignInForm';
import SignUpForm from './_auth/forms/SignUpForm';
import { Home } from './_root/pages';
import RootLayout from './_root/RootLayout';
import { Toaster } from "@/components/ui/toaster"

const App = () => {
  return (
    <main className='h-screen flex'>
      <Routes>
        {/* Public Routes */}
        <Route element={<AuthLayout />}>
          <Route path='sign-in' element={<SignInForm />} />
          <Route path='sign-up' element={<SignUpForm />} />
        </Route>
        <Route element={<RootLayout />}>
          <Route index path='/' element={<Home />} />
        </Route>
      </Routes>
      <Toaster />
    </main>
  );
};

export default App;
