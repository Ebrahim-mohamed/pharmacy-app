import { Routes, Route } from 'react-router-dom'
import AuthLayout from './components/auth/layout'
import AuthRegister from './pages/auth/register'
import AuthLogin from './pages/auth/login'
import Adminlayout from './components/admin-view/layout'
import './App.css'
import AdminDashboard from './pages/admin-view/dashboard'
import AdminProducts from './pages/admin-view/products'
import AdminOrders from './pages/admin-view/orders'
import AdminFeatures from './pages/admin-view/features'
import ShoppingLayout from './components/shopping-view/layout'
import ShoppingHome from './pages/shopping-view/home'
import ShoppingAccount from './pages/shopping-view/account'
import ShoppingListing from './pages/shopping-view/listing'
import ShoppingCheckOut from './pages/shopping-view/checkout'
import NotFound from './pages/not-found'
import CheckAuth from './components/common/check-auth'
import UnauthPage from './pages/unauth-page'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { checkAuth } from './store/auth-slice'
import {Skeleton} from './components/ui/skeleton'
import SearchProducts from './pages/shopping-view/search'
function App() {
  
  const {user, isAuthenticated, isLoading } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  useEffect(()=> {
    dispatch(checkAuth())
  },[dispatch])

  if (isLoading) return <Skeleton className="w-[100px] bg-gray-100 h-[20px] rounded-full" />


  return (
    <>
      <div className="flex flex-col overflow-hidden bg-white" >
        <Routes>
          <Route path="/" element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user} >
            </CheckAuth>
          } />

          <Route path="/auth" element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user} >
              <AuthLayout />
            </CheckAuth>
          } >
            <Route path="login" element={<AuthLogin />} />
            <Route path="register" element={<AuthRegister />} />
          </Route>

          <Route path="/admin" element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user} >
              <Adminlayout />
            </CheckAuth>
          } >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="features" element={<AdminFeatures />} />
          </Route>

          <Route path="/shop" element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user} >
              <ShoppingLayout />
            </CheckAuth>
          } >
            <Route path="home" element={<ShoppingHome />} />
            <Route path="account" element={<ShoppingAccount />} />
            <Route path="listing" element={<ShoppingListing />} />
            <Route path="checkout" element={<ShoppingCheckOut />} />
            <Route path='search' element={<SearchProducts />} />
          </Route>
          <Route path="*" element={<NotFound />} />
          <Route path="/unauth-page" element={<UnauthPage />} />
        </Routes>
      </div>
    </>
  )
}

export default App
