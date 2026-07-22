import mongoose from "mongoose";
import config from "./config/config.js";

import Category from "./modules/category.js";
import Products from "./modules/products.js";
import Carts from "./modules/carts.js";
import Orders from "./modules/orders.js";
import Counter from "./modules/counter.js";

const MONGO_URI = config.db_url;

const seedDatabase = async () => {
  let exitCode = 0;
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB successfully.");

    await Orders.deleteMany({});
    await Counter.deleteMany({});
    await Products.deleteMany({});
    await Category.deleteMany({});
    await Carts.deleteMany({});
    console.log("Cleared existing database collections.");

    const categoriesData = [
      {
        name: "Electronics",
        description: "Gadgets and devices",
        slug: "electronics",
      },
      {
        name: "Books",
        description: "Fiction and non-fiction books",
        slug: "books",
      },
      {
        name: "Clothing",
        description: "Men and Women apparel",
        slug: "clothing",
      },
    ];
    const createdCategories = await Category.insertMany(categoriesData);
    console.log(`Successfully created ${createdCategories.length} categories.`);

    const productsData = [
      {
        name: "Laptop Pro",
        price: "1299.99",
        description: "High performance laptop for professionals.",
        stock: 50,
        category: createdCategories[0]._id,
        images: ["laptop1.jpg", "laptop2.jpg"],
      },
      {
        name: "Wireless Earbuds",
        price: "149.50",
        description: "Noise-canceling wireless earbuds.",
        stock: 200,
        category: createdCategories[0]._id,
        images: ["earbuds.jpg"],
      },
      {
        name: "Sci-Fi Novel",
        price: "19.99",
        description: "Bestselling science fiction thriller.",
        stock: 150,
        category: createdCategories[1]._id,
        images: ["scifi_cover.jpg"],
      },
      {
        name: "Cooking Masterclass",
        price: "35.00",
        description: "Learn to cook like a chef.",
        stock: 80,
        category: createdCategories[1]._id,
        images: ["cooking_book.jpg"],
      },
      {
        name: "Cotton T-Shirt",
        price: "25.00",
        description: "100% pure cotton breathable t-shirt.",
        stock: 300,
        category: createdCategories[2]._id,
        images: ["tshirt_front.jpg", "tshirt_back.jpg"],
      },
      {
        name: "Denim Jeans",
        price: "59.90",
        description: "Classic blue denim jeans.",
        stock: 120,
        category: createdCategories[2]._id,
        images: ["jeans.jpg"],
      },
    ];
    const createdProducts = await Products.insertMany(productsData);
    console.log(`Successfully created ${createdProducts.length} products.`);

    const cartsData = [
      {
        items: [
          { productId: createdProducts[0]._id, quantity: 1 },
          { productId: createdProducts[1]._id, quantity: 2 },
        ],
        totalPrice: 1598.99,
      },
      {
        items: [
          { productId: createdProducts[2]._id, quantity: 3 },
          { productId: createdProducts[4]._id, quantity: 4 },
        ],
        totalPrice: 159.97,
      },
    ];
    const createdCarts = await Carts.insertMany(cartsData);
    console.log(`Successfully created ${createdCarts.length} carts.`);

    const ordersData = [
      {
        items: [
          { productId: createdProducts[3]._id, quantity: 1 },
          { productId: createdProducts[5]._id, quantity: 1 },
        ],
        totalPrice: 94.9,
        status: "processing",
        shippingAddress: "123 Main Street, New York, NY 10001",
      },
      {
        items: [{ productId: createdProducts[0]._id, quantity: 2 }],
        totalPrice: 2599.98,
        status: "shipped",
        shippingAddress: "456 Oak Avenue, Los Angeles, CA 90001",
      },
    ];
    const createdOrders = await Orders.create(ordersData);
    console.log(`Successfully created ${createdOrders.length} orders.`);

    console.log("\nDatabase seeding completed successfully!");
    console.log("successfully seeded the database with initial data.");
    console.log("created 3 categories, 6 products, 2 carts, and 2 orders.");
    console.log("You can now run the application using 'node app.js' or 'npm start'.");
  } catch (error) {
    console.error("Error seeding the database:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
    process.exit(exitCode);
  }
};

seedDatabase();
