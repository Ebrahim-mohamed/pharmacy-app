import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { Activity, HousePlug, LogOut, Menu, ShoppingCart, UserCog } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import {Button} from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { shoppingViewHeaderMenuItems } from "../../config"
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger,DropdownMenuItem, DropdownMenuSeparator } from '../ui/dropdown-menu'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { logoutUser } from "@/store/auth-slice";
import { useEffect, useState } from "react"
import UserCartWrapper from "./cart-wrapper"
import { fetchCartItems } from "../../store/shop/cart-slice"
import { Label } from "../ui/label"


const MenuItems = ({ setOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleNavigate(getCurrentMenuItem) {
    sessionStorage.removeItem("filters");
    const currentFilter =
      getCurrentMenuItem.id !== "home" &&
      getCurrentMenuItem.id !== "products" &&
      getCurrentMenuItem.id !== "search"
        ? {
            category: [getCurrentMenuItem.id],
          }
        : null;

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    location.pathname.includes("listing") && currentFilter !== null
      ? setSearchParams(
          new URLSearchParams(`?category=${getCurrentMenuItem.id}`)
        )
      : navigate(getCurrentMenuItem.path);
  }

  return (
    <nav className=" flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row" >
      {
        shoppingViewHeaderMenuItems.map(menuItem =>
          <Label
            onClick={() => {
              handleNavigate(menuItem)
              setOpen ? setOpen(false) : null
            } }
            key={menuItem.id} className=" text-md md:text-sm font-medium cursor-pointer" > {menuItem.label}
          </Label>
        )
      }
    </nav>
  )
}

export const HeaderRightContent = () => {
  const {user} = useSelector(state => state.auth)
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCartSheet, setOpenCartSheet] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCartItems(user?.id))
  },[dispatch])
  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4" >
      <Sheet open={openCartSheet} onOpenChange={()=>setOpenCartSheet(false)} >
        <Button 
          onClick={() => setOpenCartSheet(true)} 
          varient="outline" size='icon' className=" relative" >
          <ShoppingCart className="h-6 w-6" />
            <span className="absolute -top-1 right-0 text-xs font-bold bg-red-500 text-white text-center rounded-full px-1" > {cartItems?.items?.length || 0} </span>
          <span className="sr-only">User Cart</span>
        </Button>
        <UserCartWrapper setOpenCartSheet={setOpenCartSheet} cartItems={cartItems && cartItems.items && cartItems.items.length > 0 ? cartItems.items : [] } />
      </Sheet>
      <DropdownMenu >
        <DropdownMenuTrigger asChild>
          <Avatar className=" bg-black cursor-pointer" >
            <AvatarFallback className=" bg-black text-white font-extrabold" >
              {user?.username?.slice(0,2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className=" w-48 bg-white" >
          <DropdownMenuLabel>Logged in {user?.username} </DropdownMenuLabel>
          <DropdownMenuSeparator/>
          <DropdownMenuItem className=" cursor-pointer" onClick={()=> navigate('/shop/account')} >
            <UserCog className="mr-2 h-4 w-4" />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className=" cursor-pointer" onClick={() => dispatch(logoutUser())} >
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

const ShoppingHeader = () => {
  const [open, setOpen] = useState(false)

  // const {isAuthenticated, user} = useSelector((state)=> state.auth)
  
  return (
    <header className=" sticky top-0 z-40 border-b bg-background" >
      <div className=" flex h-16 items-center justify-between px-4 md:px-6" >
        <Link to='/shop/home' className=" flex gap-2 items-center" >
          <Activity className="h-8 w-8" />
          <span className="font-bold text-2xl tracking-wider " >Pharmacy</span>
        </Link>
        <Sheet open={open} onOpenChange={setOpen} >
          <SheetTrigger asChild >
            <Button varient="outline" size='icon' className="lg:hidden">
            <Menu />
            <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side='left' className="w-full max-w-xs bg-white" >
            <MenuItems setOpen={setOpen} />
            <HeaderRightContent />
          </SheetContent>
        </Sheet>
        <div className=" hidden lg:block" >
          <MenuItems />
        </div>
        <div className=" hidden lg:block">
          <HeaderRightContent />
        </div> 
      </div>
    </header>
  )
}

export default ShoppingHeader