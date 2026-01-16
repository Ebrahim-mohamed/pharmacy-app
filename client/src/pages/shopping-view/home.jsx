// import bannerOne from "../../assets/banner-1.webp";
// import bannerTwo from "../../assets/banner-2.webp";
// import bannerThree from "../../assets/banner-3.webp";
import { Button } from "../../components/ui/button";
import {
  Airplay,
  BabyIcon,
  Bandage,
  BrainCircuit,
  BriefcaseMedical,
  ChartColumnStacked,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
  Command,
  HeartPulse,
  Heater,
  Images,
  Pill,
  PuzzleIcon,
  ShieldPlus,
  Shirt,
  ShirtIcon,
  ShoppingBasket,
  UmbrellaIcon,
  WashingMachine,
  WatchIcon,
} from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllFilteredProducts, fetchProductDetails } from "../../store/shop/products-slice";
import ShoppingProductTile from "../../components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "../../store/shop/cart-slice";
import { useToast } from "../../hooks/use-toast";
import ProductDetailsDialog from "../../components/shopping-view/product-details";
import { getFeatureImages } from "../../store/common-slice";


const categoriesWithIcon = [
  { id: "painRelief", label: "Pain Relief", icon:ShieldPlus },
  { id: "coldAndAllergy", label: "Cold and Allergy", icon: BriefcaseMedical  },
  { id: "vitaminsAndSupplements", label: "Vitamins and Supplements", icon: HeartPulse  },
  { id: "personalCare", label: "Personal Care", icon: Pill },
  { id: "firstAid", label: "First Aid", icon: Bandage },
];

const brandsWithIcon = [
  { id: "GlobalNapiPharma", label: "Global Napi Pharma", icon: PuzzleIcon },
    { id: "EVAPharma", label: "EVA Pharma", icon: ChartColumnStacked  },
    { id: "SEDICO", label: "SEDICO", icon: Command },
    { id: "PharmaOverseas", label: "PharmaOverseas", icon: BrainCircuit  },
    { id: "Marcyrl", label: "Marcyrl", icon: Command },
]

const ShoppingHome = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { featureImageList } = useSelector((state) => state.commonFeature);

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();


  // const slides = [bannerOne, bannerTwo, bannerThree];


  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId) {
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
          title: "Product is added to cart",
        });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === 0 ? featureImageList.length - 1 : prev - 1));
    }, 3000);

    return () => clearInterval(timer);
  }, [ currentSlide, featureImageList]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  useEffect(()=> {
    dispatch(getFeatureImages())    
  },[dispatch])

  return (
    <div className=" flex flex-col min-h-screen">
      <div className="relative w-full h-[600px] overflow-hidden">
        {featureImageList && featureImageList.length > 0 &&
          featureImageList.map((slide, index) => (
          <img
            src={slide?.image}
            alt={slide}
            key={index}
            className={`${
              index === currentSlide ? "opacity-100" : "opacity-0"
            } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
          />
        ))}
        <Button
          variant=""
          size="icon"
          onClick={() =>
            setCurrentSlide((prev) =>
              prev === 0 ? featureImageList.length - 1 : prev - 1
            )
          }
          className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/80"
        >
          <ChevronLeftIcon className="w-4 h-4" />
          <span className="sr-only">Previous</span>
        </Button>
        <Button
          variant=""
          size="icon"
          onClick={() =>
            setCurrentSlide((prev) =>
              prev === featureImageList.length - 1 ? 0 : prev + 1
            )
          }
          className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/80"
        >
          <ChevronRightIcon className="w-4 h-4" />
          <span className="sr-only">Previous</span>
        </Button>
      </div>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop by category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoriesWithIcon.map((categoryItem) => (
              <Card
                onClick={() =>
                  handleNavigateToListingPage(categoryItem, "category")
                }
                key={categoryItem.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <categoryItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{categoryItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop by Brand
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {brandsWithIcon.map((brandItem) => (
              <Card
              onClick={() =>
                handleNavigateToListingPage(brandItem, "brand")
              }
                key={brandItem.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <brandItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="text-lg font-semibold">
                    {brandItem.label}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Feature Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {productList?.map((product) => (
              <ShoppingProductTile
                key={product?._id}
                product={product}
                handleGetProductDetails={handleGetProductDetails}
                handleAddToCart={handleAddtoCart}
              />
            ))}
          </div>
        </div>
      </section>  
      
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />

    </div>
  );
};

export default ShoppingHome;
