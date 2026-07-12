content = """# E-Commerce Backend API

![https://github.com/ahmedmousa-deci/ecommerce_api](Github Repo)

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
   git clone <>
   cd <>
   ```
