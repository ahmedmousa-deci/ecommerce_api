content = """# E-Commerce Backend API

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

   Create a .env file with the `DB_URL`, `PORT` and `NODE_ENV`

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

# Routes

Carts

    get /carts

    get /carts/:id

    post /carts

    post /carts/:id/items

    patch /carts/:id

    delete /carts/:id

    delete /carts/:id/clear

Categories

    get /categories

    get /categories/:id

    post /categories

    patch /categories/:id

    delete /categories/:id

Orders

    get /orders

    get /orders/:id

    post /orders

    patch /orders/:id

    delete /orders/:id

Products

    get /products

    get /products/:id

    post /products

    patch /products/:id

    delete /products/:id
