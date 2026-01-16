import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from '../ui/badge'
import { brandOptionsMap, categoryOptionsMap } from "../../config";
import { Button } from "../ui/button";

const ShoppingProductTile = ({ product, handleGetProductDetails, handleAddToCart }) => {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div onClick={() => handleGetProductDetails(product?._id)} >
        <div className="relative overflow-hidden">
          <img
            src={product?.image}
            alt={product?.title}
            className={`w-full h-[300px] object-cover rounded-t-lg ${product?.totalStock === 0 ? ' grayscale' : '' } `}
          />
          {
            product?.totalStock === 0 ? 
            <Badge className="absolute top-8 -rotate-45 -left-10 tracking-wider text-md font-semibold flex justify-center w-40 text-white bg-red-500 hover:bg-red-600 " >Out of Stock</Badge>
            :
            product?.salePrice > 0 ? (
              <Badge className="absolute top-5 -rotate-45 -left-10 tracking-wider text-lg font-semibold flex justify-center w-36 text-white bg-green-500 hover:bg-green-600 " >Sale</Badge>
            ) : null
          }
        </div>
        <CardContent className="p-4" >
          <h2 className=" text-xl font-bold mb-2" >{product?.title}</h2>
          <div className="flex justify-between items-center mb-2 ">
            <span className="text-sm text-muted-foreground"> {categoryOptionsMap[product?.category]}</span>
            <span className="text-sm text-muted-foreground"> {brandOptionsMap[product?.brand]}</span>
          </div>
          <div className="flex justify-between items-center mb-2 ">
            <span className={` ${ product?.salePrice > 0 ? "line-through" : "" } text-lg text-primary font-semibold`}> $ {product?.price}</span>
            <span className=" border rounded-full px-3 py-1 bg-black text-white" > {product?.totalStock} </span>
            {product?.salePrice > 0 ? (
              <span className="text-lg text-primary font-semibold">$ {product?.salePrice}</span>
            ) : null}
          </div>
        </CardContent>
      </div>
        <CardFooter> 
          {
            product?.totalStock === 0 ? 
              <Button className=" w-full opacity-60 cursor-not-allowed" > Out of Stock </Button>
            :
          <Button onClick={() => handleAddToCart(product?._id, product?.totalStock)} variant="outline" className="w-full bg-black hover:bg-black/90 text-white hover:text-white/80 text-md md:text-lg rounded-xl " >Add to cart</Button>
          }
        </CardFooter>
    </Card>
  );
};

export default ShoppingProductTile;
