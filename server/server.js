const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const app = express();
const PORT = process.env.PORT || 3099;

// Hardcoded data (per README.md requirements)
const products = [
  { id: 1, name: "Laptop", inStock: true, gallery: ["/public/laptop.jpg"], prices: [{ amount: 999.99, currency: { symbol: "$", label: "USD" } }], attributes: [{ name: "Color", type: "swatch", values: [{ label: "Black", rendered: "<span>Black</span>" }, { label: "Silver", rendered: "<span>Silver</span>" }] }], description: "High-performance laptop", category: "electronics" },
  { id: 2, name: "T-Shirt", inStock: true, gallery: ["/public/tshirt.jpg"], prices: [{ amount: 29.99, currency: { symbol: "$", label: "USD" } }], attributes: [{ name: "Size", type: "text", values: [{ label: "M", rendered: "M" }, { label: "L", rendered: "L" }] }], description: "Comfortable cotton t-shirt", category: "clothing" },
  { id: 3, name: "Headphones", inStock: false, gallery: ["/public/headphones.jpg"], prices: [{ amount: 199.99, currency: { symbol: "$", label: "USD" } }], attributes: [], description: "Wireless headphones", category: "electronics" },
  // Add 7–17 more products to meet the 10–20 requirement
];

const categories = [
  { id: "all", name: "ALL" },
  { id: "electronics", name: "Electronics" },
  { id: "clothing", name: "Clothing" },
];

// GraphQL Schema
const typeDefs = gql`
  type Currency { symbol: String!, label: String! }
  type Price { amount: Float!, currency: Currency! }
  type AttributeValue { label: String!, rendered: String! }
  type Attribute { name: String!, type: String!, values: [AttributeValue!]! }
  type Product { id: Int!, name: String!, inStock: Boolean!, gallery: [String!]!, prices: [Price!]!, attributes: [Attribute!]!, description: String, category: String, brand: String }
  type Category { id: String!, name: String! }
  type ProductsByCategory { categoryName: String!, products: [Product!]! }
  type OrderProductInput { productId: Int!, quantity: Int!, selectedAttributes: [AttributeInput!]! }
  type AttributeInput { name: String!, value: String! }
  type Order { id: Int!, totalPrice: Float!, itemsNumber: Int!, products: [OrderProduct!]! }
  type OrderProduct { productId: Int!, selectedAttributes: [AttributeInput!]! }
  type Query {
    products: [Product!]!
    categories: [Category!]!
    productsByCategory(categoryId: String!): ProductsByCategory!
    product(id: Int!): Product!
  }
  type Mutation {
    createOrder(products: [OrderProductInput!]!): Order!
  }
`;

// Resolvers
const resolvers = {
  Query: {
    products: () => products,
    categories: () => categories,
    productsByCategory: (_, { categoryId }) => ({
      categoryName: categories.find(c => c.id === categoryId)?.name || "Unknown",
      products: categoryId === "all" ? products : products.filter(p => p.category === categoryId),
    }),
    product: (_, { id }) => products.find(p => p.id === id),
  },
  Mutation: {
    createOrder: (_, { products: orderProducts }) => {
      const totalPrice = orderProducts.reduce((sum, { productId, quantity }) => {
        const product = products.find(p => p.id === productId);
        return product ? sum + product.prices[0].amount * quantity : sum;
      }, 0);
      const itemsNumber = orderProducts.reduce((sum, { quantity }) => sum + quantity, 0);
      return {
        id: Math.floor(Math.random() * 1000), // Simple random ID
        totalPrice,
        itemsNumber,
        products: orderProducts,
      };
    },
  },
};

// Start Apollo Server
async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
  });
}

startServer();

// Error handling
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
});