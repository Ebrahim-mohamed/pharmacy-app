import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { StarIcon } from "lucide-react";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "../../hooks/use-toast";
import { addToCart, fetchCartItems } from "../../store/shop/cart-slice";
import { setProductDetails } from "../../store/shop/products-slice";
import { Label } from "../ui/label";
import StarRatingComponent from "./star-rating";
import { useEffect, useState } from "react";
import { addReview, getReviews } from "../../store/shop/review-slice";
const ProductDetailsDialog = ({ open, setOpen, productDetails }) => {
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { reviews } = useSelector((state) => state.shopReview);

  function handleRatingChange(getRating) {
    setRating(getRating);
  }

  function handleAddToCart(getCurrentProductId, getTotalStock) {
    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentCartItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentCartItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentCartItem].quantity;
        console.log(getQuantity);

        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Only ${getQuantity} quantity can be added for this item`,
            variant: "destructive",
          });

          return;
        }
      }
    }
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Cart item added successfully",
        });
      }
    });
  }

  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
    setReviewMsg("");
    setRating(0);
  }

  function handleAddReview() {
    dispatch(
      addReview({
        productId: productDetails._id,
        userId: user?.id,
        userName: user?.username,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        if (data?.payload?.exists) {
          toast({
            title: "You have already reviewed this product",
            variant: "destructive",
          });
        } else {
          dispatch(getReviews(productDetails._id));
          toast({
            title: "Review added successfully",
          });
          dispatch(setProductDetails());
          setReviewMsg("");
          setRating(0);
        }
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) {
      dispatch(getReviews(productDetails._id));
    }
  }, [productDetails]);

  const averageRating = reviews && reviews.length > 0
    ? reviews
        .map((review) => review.reviewValue)
        .reduce((a, b) => a + b) / reviews.length
    : 0;


  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className=" grid md:grid-cols-2 bg-white gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw] ">
        <div className="relative overflow-hidden ">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={600}
            height={600}
            className=" w-full object-cover aspect-square rounded-xl "
          />
        </div>
        <div>
          <div>
            <h1 className=" text-3xl font-extrabold">
              {productDetails?.title}
            </h1>
            <p className=" text-muted-foreground text-2xl mb-5 mt-4">
              {productDetails?.description}
            </p>
          </div>
          <div className="flex justify-between items-center mb-2 ">
            <span
              className={` ${
                productDetails?.salePrice > 0 ? "line-through" : ""
              } text-2xl text-muted-foreground font-bold`}
            >
              {" "}
              $ {productDetails?.price}
            </span>
            {productDetails?.salePrice > 0 ? (
              <span className="text-2xl text-muted-foreground font-bold">
                $ {productDetails?.salePrice}
              </span>
            ) : null}
          </div>
          <div className="flex items-center gap-2">
            <StarRatingComponent rating={averageRating} />
            <span className=" text-muted-foreground">({ averageRating.toFixed(1)})</span>
          </div>
          <div className=" my-5">
            {productDetails?.totalStock === 0 ? (
              <Button className=" w-full opacity-60 cursor-not-allowed">
                {" "}
                Out of Stock{" "}
              </Button>
            ) : (
              <Button
                onClick={() =>
                  handleAddToCart(
                    productDetails?._id,
                    productDetails?.totalStock
                  )
                }
                variant="outline"
                className="w-full bg-black hover:bg-black/90 text-white hover:text-white/80 text-md md:text-lg rounded-xl "
              >
                Add to cart
              </Button>
            )}
          </div>
          <Separator />
          <div className=" max-h-[300px] overflow-auto">
            <h2 className=" text-xl font-bold mb-4">Reviews</h2>
            <div className=" grid gap-4">
              {reviews && reviews.length > 0
                ? reviews.map((review, index) => (
                    <div className="flex gap-4" key={index}>
                      <Avatar className="w-10 h-10 border bg-black text-white">
                        <AvatarFallback>
                          {" "}
                          {review.userName.slice(0, 2).toUpperCase()}{" "}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid gap-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold">{review.userName}</h3>
                        </div>
                        <div className="flex items-center gap-0.5">
                          <StarRatingComponent rating={review?.reviewValue} />
                        </div>
                        <p className=" text-muted-foreground">
                          {review?.reviewMessage}
                        </p>
                      </div>
                    </div>
                  ))
                : null}
              <hr />
            </div>
            <div className="flex flex-col mt-10 gap-2">
              <Label>Write a review</Label>
              <div className="flex">
                <StarRatingComponent
                  rating={rating}
                  handleRatingChange={handleRatingChange}
                />
              </div>
              <Input
                className=" w-full rounded-xl"
                placeholder="Add a review"
                name="reviewMsg"
                value={reviewMsg}
                onChange={(e) => setReviewMsg(e.target.value)}
              />
              <Button
                variant="outline"
                onClick={handleAddReview}
                disabled={reviewMsg.trim() === ""}
                className=" bg-black hover:bg-black/90 text-white hover:text-white/80 text-lg rounded-xl "
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailsDialog;
