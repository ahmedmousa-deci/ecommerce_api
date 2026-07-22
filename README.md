# E-Commerce Backend API

[Github Repo](https://github.com/ahmedmousa-deci/ecommerce_api)

## Overview

This is a RESTful API built with Node.js, Express, and MongoDB for managing an e-commerce platform. It provides endpoints to manage products, categories, shopping carts, and orders, along with inventory validation and robust error handling.

## Features

- **Categories:** Create, read, update, and delete product categories.
- **Products:** Manage products with stock tracking, price validation, and category association.
- **Shopping Cart:** Add items to cart, update quantities, calculate total prices, and validate stock availability.
- **Orders:** Convert carts to orders, track order status, and automatically deduct from product inventory upon checkout.
- **Error Handling:** Global error handler for catching Mongoose validation errors, duplicate keys, invalid IDs, and custom application errors.
- **Database Seeding:** Pre-configured script to populate the database with initial categories, products, carts, and orders.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **ODM:** Mongoose

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (running locally or a cloud instance like MongoDB Atlas)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ahmedmousa-deci/ecommerce_api
   cd ecommerce_api
   ```
2. **Install packages**
   ```bash
   npm install
   ```
3. **Add .env**

   Create a .env file with the `MONGO_URL`, `PORT` and `NODE_ENV`

4. **Seed the app**

   run

   ```bash
   npm run seed
   ```

5. **Finally, Run the server**

   For production

   ```bash
   npm run start
   ```

   For development

   ```bash
   npm run dev
   ```
# Project Dependencies

## Dependencies (Production)

| Package | Version |
| :--- | :--- |
| `decimal.js` | `^10.6.0` |
| `dotenv` | `^17.4.2` |
| `express` | `^5.2.1` |
| `express-mongo-sanitize` | `^2.2.0` |
| `express-validator` | `^7.3.2` |
| `mongoose` | `^9.7.3` |

## DevDependencies (Development)

| Package | Version |
| :--- | :--- |
| `cross-env` | `^10.1.0` |
| `nodemon` | `^3.1.14` |

## Installation Commands

**Production dependencies:**
```bash
npm install decimal.js dotenv express express-mongo-sanitize express-validator mongoose
```

**Development dependencies:**
```bash
npm install -D cross-env nodemon
```

# Routes

Carts

    get /api/carts

    get /api/carts/:id

    post /api/carts

    post /api/carts/:id/items

    patch /api/carts/:id

    delete /api/carts/:id

    delete /api/carts/:id/clear

Categories

    get /api/categories

    get /api/categories/:id

    post /api/categories

    patch /api/categories/:id

    delete /api/categories/:id

Orders

    get /api/orders

    get /api/orders/:id

    post /api/orders

    patch /api/orders/:id

    delete /api/orders/:id

Products

    get /api/products

    get /api/products/:id

    post /api/products

    patch /api/products/:id

    delete /api/products/:id
