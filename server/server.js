const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3099;

// Enable CORS to allow frontend (port 5173) to access backend (port 3099)
app.use(cors());
app.use(express.json());

// Hardcoded products (10 products as per README.md)
const products = [
  { id: 1, name: "Laptop", price: 999.99, image: "/laptop.jpg", inStock: true, description: "High-performance laptop", category: "electronics" },
  { id: 2, name: "T-Shirt", price: 29.99, image: "/tshirt.jpg", inStock: true, description: "Comfortable cotton t-shirt", category: "clothing" },
  { id: 3, name: "Headphones", price: 199.99, image: "/headphones.jpg", inStock: false, description: "Wireless headphones", category: "electronics" },
  { id: 4, name: "Smartphone", price: 699.99, image: "/smartphone.jpg", inStock: true, description: "Latest model smartphone", category: "electronics" },
  { id: 5, name: "Jeans", price: 59.99, image: "/jeans.jpg", inStock: true, description: "Stylish denim jeans", category: "clothing" },
  { id: 6, name: "Smartwatch", price: 249.99, image: "/smartwatch.jpg", inStock: true, description: "Fitness tracking smartwatch", category: "electronics" },
  { id: 7, name: "Jacket", price: 89.99, image: "/jacket.jpg", inStock: true, description: "Warm winter jacket", category: "clothing" },
  { id: 8, name: "Speaker", price: 149.99, image: "/speaker.jpg", inStock: true, description: "Bluetooth speaker", category: "electronics" },
  { id: 9, name: "Sneakers", price: 79.99, image: "/sneakers.jpg", inStock: true, description: "Comfortable sneakers", category: "clothing" },
  { id: 10, name: "Tablet", price: 399.99, image: "/tablet.jpg", inStock: true, description: "Portable tablet", category: "electronics" },
];

// Hardcoded categories for navbar
const categories = [
  { id: "all", name: "ALL" },
  { id: "electronics", name: "Electronics" },
  { id: "clothing", name: "Clothing" },
];

// Routes
app.get('/api/products', (req, res) => {
  res.status(200).json({ success: true, products });
});

app.get('/api/categories', (req, res) => {
  res.status(200).json({ success: true, categories });
});

app.get('/api/categories/:categoryId', (req, res) => {
  const { categoryId } = req.params;
  const filteredProducts = categoryId === "all" ? products : products.filter(p => p.category === categoryId);
  const categoryName = categories.find(c => c.id === categoryId)?.name || "Unknown";
  res.status(200).json({ success: true, categoryName, products: filteredProducts });
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ success: false, error: "Product Not Found" });
  }
  res.status(200).json({ success: true, product });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Error handling
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
});