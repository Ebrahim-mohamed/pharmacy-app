
# Pharmacy Management Website

This project is a full-stack web application for managing pharmacy-related activities. It has two major sections: an **Admin Dashboard** for managing products, orders, and other pharmacy operations, and a **Client Section** where users can browse products, search, add to cart, and manage orders.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Admin Features](#admin-features)
- [Client Features](#client-features)
- [Contributing](#contributing)
- [License](#license)

---

## Features

### Admin:
- **Dashboard**: Provides an overview of key metrics like total sales, products, and orders.
- **Product Management**: Add, update, delete, and categorize products.
- **Order Management**: View, process, and manage customer orders.
- **User Management**: Manage clients and their access levels.
- **Reporting**: Generate sales and performance reports.

### Client:
- **Product Browsing**: View products with filtering and search options.
- **Account Management**: View and edit account details.
- **Order History**: Track past and current orders.
- **Search**: Search products by name, category, or manufacturer.
- **Cart & Checkout**: Add items to cart, update quantity, and checkout.
- **Authentication**: Secure login and registration system.

---

## Technologies Used

- **Frontend**: 
  - HTML5,
  - CSS (Tailwind CSS)
  - JavaScript (ES6+)
  - React
  - Shadcn UI
  
- **Backend**:
  - Node.js with Express.js
  - MongoDB (for database)
  - JWT (for authentication)
  - Docker
  
- **Deployment**: 
  - Cloud services such as [Render](https://e-commerce-mern-stack-1-zyrk.onrender.com)

---

## Project Structure

```
├── client                # Frontend files
│   ├── public            # Public assets
│   └── src               # React components (if applicable)
├── server                # Backend files
│   ├── controllers       # Route handlers for different features
│   ├── models            # Database models (Product, User, Orders)
│   └── routes            # API routes
├── package.json          # Project dependencies
├── README.md             # Project documentation
└── .env                  # Environment variables
```

---

## Installation

1. **Clone the repository:**
   ```
   git clone https://github.com/ayman-ezzeldin/Pharmacy-App.git
   ```

2. **Install server dependencies:**
   ```
   cd server
   npm install
   ```

3. **Install client dependencies:**
   ```
   cd client
   npm install
   ```

4. **Set up environment variables:**
   Create a \`.env\` file in the root of the \`server\` folder with the following variables:
   ```
   PORT=5000
   MONGO_URI=your-mongodb-uri
   JWT_SECRET=your-secret-key
   ```

---

## Usage

### Run the development server:
1. **Start backend:**
   ```
   cd server
   npm start
   ```

2. **Start frontend:**
   ```
   cd client
   npm run dev
   ```

3. **Access the app:**
   Open [http://localhost:5173](http://localhost:5173) for the frontend, and [http://localhost:5000](http://localhost:5000) for the backend API.

---

## Admin Features

1. **Product Management**: Admins can add new products, edit or remove existing products, and categorize products for better management.
2. **Order Management**: View all orders, track the status of each order, and update order statuses.
3. **Dashboard**: Visualize pharmacy performance metrics such as total sales and active orders.

---

## Client Features

1. **Product Catalog**: Clients can browse available products, search by name or category, and view details.
2. **Account & Orders**: Users can view and update their profile information and see past and ongoing orders.
3. **Checkout**: Secure checkout process for adding products to the cart, reviewing items, and making purchases.

---

## Contributing

Contributions are welcome! Please fork the repository, make your changes, and submit a pull request.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
