import { RouterProvider } from 'react-router-dom'
import { router } from './components/AppRouting/AppRouting'
import './App.css'
import { ToastProvider } from '@heroui/react'
import AuthContextProvider from './components/contexts/AuthContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function App() {
  const queryClient = new QueryClient()

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} position="bottom" />
        <AuthContextProvider>
          <ToastProvider placement='top'/>
          <RouterProvider router={router}></RouterProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
