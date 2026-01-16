import Address from "@/components/shopping-view/address";
import img from "../../assets/images.jpeg";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { createNewOrder, confirmOrder, clearOrderList } from "../../store/shop/order-slice";

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);

  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();

  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  function handleCreateOrder() {
    if (cartItems.length === 0) {
      toast({
        title: "Your cart is empty. Please add items to proceed",
        variant: "destructive",
      });
      return;
    }
    if (currentSelectedAddress === null) {
      toast({
        title: "Please select one address to proceed.",
        variant: "destructive",
      });
      return;
    }

    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price:
          singleCartItem?.salePrice > 0
            ? singleCartItem?.salePrice
            : singleCartItem?.price,
        quantity: singleCartItem?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
    };

    // Dispatch to create the new order
    dispatch(createNewOrder(orderData)).then((data) => {
      if (data?.payload?.success) {
        // After successful order creation, confirm the order
        dispatch(confirmOrder(data.payload.orderId)).then((confirmData) => {
          if (confirmData?.payload?.success) {
            dispatch(clearOrderList());
            toast({
              title: "Order placed successfully!",
              variant: "success",
            });
            setTimeout(() => {
              navigate("/shop/account");
              window.location.reload();
              window.scrollTo(0, 0);
            }, 100);
            
          } else {
            toast({
              title: "Failed to confirm order.",
              variant: "destructive",
            });
          }
        });
      } else {
        toast({
          title: "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={img} className="h-full w-full object-cover object-center" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address
          selectedId={currentSelectedAddress}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
          currentSelectedAddress={currentSelectedAddress}
        />
        <div className="flex flex-col gap-4">
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item) => (
                <UserCartItemsContent
                  key={item?._id + item?.productId}
                  cartItem={item}
                />
              ))
            : null}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">${totalCartAmount}</span>
            </div>
          </div>
          <div className="mt-4 w-full">
            {cartItems && cartItems.items && cartItems.items.length > 0 ? (
              <Button
                onClick={handleCreateOrder}
                className="w-full bg-black text-white hover:bg-black hover:text-white rounded-xl"
              >
                Place Order
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;
