export const registerFormControls = [
  {
    name : 'username',
    label : 'User Name',
    placeholder : 'Enter Your User Name',
    componentType : 'input',
    type : 'text',
    required : true
  },
  {
    name : 'email',
    label : 'Email',
    placeholder : 'Enter Your User Email',
    componentType : 'input',
    type : 'email',
    required : true
  },
  {
    name : 'password',
    label : 'password',
    placeholder : 'Enter Your User password',
    componentType : 'input',
    type : 'password',
    required : true
  },
]

export const loginFormControls = [

  {
    name : 'email',
    label : 'Email',
    placeholder : 'Enter Your User Email',
    componentType : 'input',
    type : 'email',
    required : true
  },
  {
    name : 'password',
    label : 'password',
    placeholder : 'Enter Your User password',
    componentType : 'input',
    type : 'password',
    required : true
  },
]

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "painRelief", label: "Pain Relief"},
      { id: "coldAndAllergy", label: "Cold and Allergy"},
      { id: "vitaminsAndSupplements", label: "Vitamins and Supplements"},
      { id: "personalCare", label: "Personal Care" },
      { id: "firstAid", label: "First Aid"},
    ],
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "select",
    options: [
      { id: "GlobalNapiPharma", label: "Global Napi Pharma" },
      { id: "EVAPharma", label: "EVA Pharma" },
      { id: "SEDICO", label: "SEDICO" },
      { id: "PharmaOverseas", label: "PharmaOverseas" },
      { id: "Marcyrl", label: "Marcyrl" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
];

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },
  {
    id: "products",
    label: "Products",
    path: "/shop/listing",
  },
  {
    id: "painRelief",
    label: "Pain Relief",
    path: "/shop/listing",
  },
  {
    id: "coldAndAllergy",
    label: "Cold and Allergy",
    path: "/shop/listing",
  },
  {
    id: "vitaminsAndSupplements",
    label: "Vitamins and Supplements",
    path: "/shop/listing",
  },
  {
    id: "personalCare",
    label: "Personal Care",
    path: "/shop/listing",
  },
  {
    id: "firstAid",
    label: "First Aid",
    path: "/shop/listing",
  },
  {
    id: "search",
    label: "Search",
    path: "/shop/search",
  },
];

export const categoryOptionsMap = {
  painRelief: "Pain Relief",
  coldAndAllergy: "Cold and Allergy",
  vitaminsAndSupplements: "Vitamins and Supplements",
  personalCare: "Personal Care",
  firstAid: "First Aid",
};

export const brandOptionsMap = {
  GlobalNapiPharma: "Global Napi Pharma",
  EVAPharma: "EVA Pharma",
  SEDICO: "SEDICO",
  PharmaOverseas: "PharmaOverseas",
  Marcyrl: "Marcyrl",
};

export const filterOptions = {
  category: [
    { id: "painRelief", label: "Pain Relief"},
    { id: "coldAndAllergy", label: "Cold and Allergy"},
    { id: "vitaminsAndSupplements", label: "Vitamins and Supplements"},
    { id: "personalCare", label: "Personal Care" },
    { id: "firstAid", label: "First Aid"},
  ],
  brand: [
    { id: "GlobalNapiPharma", label: "Global Napi Pharma" },
    { id: "EVAPharma", label: "EVA Pharma" },
    { id: "SEDICO", label: "SEDICO" },
    { id: "PharmaOverseas", label: "PharmaOverseas" },
    { id: "Marcyrl", label: "Marcyrl" },
  ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];