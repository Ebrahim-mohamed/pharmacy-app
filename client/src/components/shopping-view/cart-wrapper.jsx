import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";
import UserCartContent from "./cart-items-content";
import { useNavigate } from "react-router-dom";
const UserCartWrapper = ({ cartItems, setOpenCartSheet }) => {
  const navigate = useNavigate();

  function handleCheckout() {
    navigate("/shop/checkout");
    setOpenCartSheet(false);
  }

  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem.salePrice > 0
              ? currentItem.salePrice
              : currentItem.price) *
              currentItem.quantity,
          0
        )
      : 0;

  return (
    <SheetContent className=" bg-white sm:max-w-md">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4">
        {cartItems && cartItems.length > 0
          ? // adding Math.random() just to avoid warning
            cartItems.map((cartItem) => (
              <UserCartContent
                key={cartItem._id + Math.random()}
                cartItem={cartItem}
              />
            ))
          : null}
        <div className="mt-8 space-y-4">
          <div className="flex justify-between">
            <span className=" font-bold">Total</span>
            <span className=" font-bold">$ {totalCartAmount}</span>
          </div>
        </div>
      </div>
      {
        cartItems && cartItems.length > 0 ?
        <Button
        onClick={handleCheckout}
        className="w-full mt-6 bg-black text-white hover:bg-black hover:text-white text-lg rounded-xl"
        >
        {" "}
        Checkout{" "}
      </Button> : null
      }
    </SheetContent>
  );
};

export default UserCartWrapper;
