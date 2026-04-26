const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { products } = require("./data/products");

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 5000);

const allowedOrigin = process.env.FRONTEND_URL || "http://localhost:3000";

app.use(
  cors({
    origin: allowedOrigin,
  })
);
app.use(express.json());

const messages = [];
const orders = [];

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    service: "vastraa-backend",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/products", (req, res) => {
  const { featured, category, search, limit } = req.query;
  let result = [...products];

  if (featured === "true") {
    result = result.filter((product) => product.featured);
  }

  if (category) {
    result = result.filter(
      (product) => product.category.toLowerCase() === String(category).toLowerCase()
    );
  }

  if (search) {
    const q = String(search).toLowerCase();
    result = result.filter(
      (product) =>
        product.name.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q)
    );
  }

  if (limit) {
    const parsedLimit = Number(limit);
    if (Number.isFinite(parsedLimit) && parsedLimit > 0) {
      result = result.slice(0, parsedLimit);
    }
  }

  res.json({
    success: true,
    count: result.length,
    data: result,
  });
});

app.get("/api/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const product = products.find((item) => item.id === id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  return res.json({
    success: true,
    data: product,
  });
});

app.post("/api/contact", (req, res) => {
  const { name, email, subject, message } = req.body || {};

  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  const entry = {
    id: messages.length + 1,
    name,
    email,
    subject,
    message,
    createdAt: new Date().toISOString(),
  };

  messages.push(entry);

  return res.status(201).json({
    success: true,
    message: "Message received successfully",
    data: entry,
  });
});

app.post("/api/orders", (req, res) => {
  const { items, subtotal, tax, total } = req.body || {};

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Order must include at least one item",
    });
  }

  const createdOrder = {
    id: `ORD-${Date.now()}`,
    items,
    subtotal,
    tax,
    total,
    status: "created",
    createdAt: new Date().toISOString(),
  };

  orders.push(createdOrder);

  return res.status(201).json({
    success: true,
    message: "Order created successfully",
    data: createdOrder,
  });
});

app.get("/api/orders", (_req, res) => {
  res.json({
    success: true,
    count: orders.length,
    data: orders,
  });
});

app.use((err, _req, res, _next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

app.listen(port, () => {
  console.log(`Vastraa backend running on http://localhost:${port}`);
});
