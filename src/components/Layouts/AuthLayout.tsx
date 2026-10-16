import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom'
import AuthAbout from '../Auth/AuthAbout/AuthAbout';
import Navbar from '../Navbar/Navbar';

export default function AuthLayout() {
  const [currentPath, setCurrentPath] = useState('/auth/login');
  const { pathname } = useLocation();

  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname])

  return (
    <>

      <Navbar />

      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 md:p-8">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">


          <AuthAbout />


          <div className="lg:col-span-5 w-full bg-white rounded-2xl p-6 md:p-8 mt-28 shadow-md border border-gray-100">
            {/* Tab Headers */}
            <div className="bg-gray-100 p-1 rounded-xl flex items-center mb-6">
              <Link to={'/auth/login'} className={`flex-1 p-2.5 text-sm font-semibold rounded-lg transition-all text-center ${currentPath === '/auth/login' ? 'bg-white text-brand-blue ' : 'bg-none text-gray-400'}`}>
                Login
              </Link>
              <Link to={'/auth/register'} className={`flex-1 p-2.5 text-sm font-semibold rounded-lg transition-all text-center  ${currentPath === '/auth/register' ? 'bg-white text-brand-blue ' : 'bg-none text-gray-400'}`}>
                Register
              </Link>
            </div>

            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}
