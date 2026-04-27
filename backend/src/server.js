const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const { products } = require("./data/products");
const User = require("./models/User");

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 5000);
const jwtSecret = process.env.JWT_SECRET || "change-this-in-production";

const allowedOrigin = process.env.FRONTEND_URL || "http://localhost:3000";

app.use(
  cors({
    origin: allowedOrigin,
  })
);
app.use(express.json());

const messages = [];
const orders = [];

const isMailConfigured =
  process.env.SMTP_HOST &&
  process.env.SMTP_PORT &&
  process.env.SMTP_USER &&
  process.env.SMTP_PASS;

const transporter = isMailConfigured
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
  : null;

function isValidEmail(value) {
  if (!value || typeof value !== "string") return false;
  return validator.isEmail(value);
}

function sanitizeUser(userDoc) {
  return {
    id: userDoc._id,
    name: userDoc.name,
    email: userDoc.email,
    createdAt: userDoc.createdAt,
  };
}

function signAuthToken(userDoc) {
  return jwt.sign(
    {
      sub: String(userDoc._id),
      email: userDoc.email,
      name: userDoc.name,
    },
    jwtSecret,
    { expiresIn: "7d" }
  );
}

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization || "";

  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Authorization token missing",
    });
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, jwtSecret);
    req.auth = payload;
    return next();
  } catch (_error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
}

function validateAddress(address) {
  const requiredFields = [
    "fullName",
    "phone",
    "line1",
    "city",
    "state",
    "pincode",
    "country",
  ];

  if (!address || typeof address !== "object") {
    return false;
  }

  return requiredFields.every((field) => {
    const value = address[field];
    return typeof value === "string" && value.trim().length > 0;
  });
}

function createReceiptHtml(order) {
  const itemsRows = order.items
    .map(
      (item) => `
        <tr>
          <td style="padding:8px;border:1px solid #e5e7eb;">${item.name}</td>
          <td style="padding:8px;border:1px solid #e5e7eb;">${item.size}</td>
          <td style="padding:8px;border:1px solid #e5e7eb;">${item.color}</td>
          <td style="padding:8px;border:1px solid #e5e7eb;text-align:center;">${item.quantity}</td>
          <td style="padding:8px;border:1px solid #e5e7eb;text-align:right;">Rs ${item.price}</td>
          <td style="padding:8px;border:1px solid #e5e7eb;text-align:right;">Rs ${
            item.price * item.quantity
          }</td>
        </tr>
      `
    )
    .join("");

  const sender = order.senderAddress;
  const receiver = order.receiverAddress;

  return `
    <div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;color:#111827;">
      <h2 style="margin-bottom:6px;">Vastraa Order Receipt</h2>
      <p style="margin-top:0;color:#4b5563;">Order ID: <strong>${order.id}</strong></p>
      <p style="color:#4b5563;">Placed on: ${new Date(order.createdAt).toLocaleString()}</p>
      <h3>Sender Address</h3>
      <p>
        ${sender.fullName}<br/>
        ${sender.line1}<br/>
        ${sender.line2 ? `${sender.line2}<br/>` : ""}
        ${sender.city}, ${sender.state} - ${sender.pincode}<br/>
        ${sender.country}<br/>
        Phone: ${sender.phone}
      </p>
      <h3>Receiver Address</h3>
      <p>
        ${receiver.fullName}<br/>
        ${receiver.line1}<br/>
        ${receiver.line2 ? `${receiver.line2}<br/>` : ""}
        ${receiver.city}, ${receiver.state} - ${receiver.pincode}<br/>
        ${receiver.country}<br/>
        Phone: ${receiver.phone}
      </p>
      <h3>Order Summary</h3>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <thead>
          <tr style="background:#f9fafb;">
            <th style="padding:8px;border:1px solid #e5e7eb;text-align:left;">Product</th>
            <th style="padding:8px;border:1px solid #e5e7eb;text-align:left;">Size</th>
            <th style="padding:8px;border:1px solid #e5e7eb;text-align:left;">Color</th>
            <th style="padding:8px;border:1px solid #e5e7eb;text-align:center;">Qty</th>
            <th style="padding:8px;border:1px solid #e5e7eb;text-align:right;">Price</th>
            <th style="padding:8px;border:1px solid #e5e7eb;text-align:right;">Total</th>
          </tr>
        </thead>
        <tbody>${itemsRows}</tbody>
      </table>
      <div style="margin-top:16px;">
        <p style="margin:4px 0;">Subtotal: <strong>Rs ${order.subtotal}</strong></p>
        <p style="margin:4px 0;">Tax: <strong>Rs ${order.tax}</strong></p>
        <p style="margin:4px 0;font-size:18px;">Grand Total: <strong>Rs ${order.total}</strong></p>
      </div>
      <p style="margin-top:18px;color:#4b5563;">Thank you for shopping with Vastraa.</p>
    </div>
  `;
}

async function sendOrderReceipt(order) {
  if (!transporter) {
    return {
      sent: false,
      reason:
        "SMTP is not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM.",
    };
  }

  const fromAddress = process.env.SMTP_FROM || process.env.SMTP_USER;

  await transporter.sendMail({
    from: fromAddress,
    to: order.receiptEmail,
    subject: `Vastraa Receipt - ${order.id}`,
    html: createReceiptHtml(order),
  });

  return { sent: true };
}

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

app.post("/api/auth/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body || {};

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "Name must be at least 2 characters",
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Valid email is required",
      });
    }

    if (!password || typeof password !== "string" || password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
    });

    const token = signAuthToken(createdUser);

    return res.status(201).json({
      success: true,
      message: "Signup successful",
      data: {
        token,
        user: sanitizeUser(createdUser),
      },
    });
  } catch (error) {
    console.error("Signup failed:", error);
    return res.status(500).json({
      success: false,
      message: "Signup failed",
    });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!isValidEmail(email) || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = signAuthToken(user);

    return res.json({
      success: true,
      message: "Login successful",
      data: {
        token,
        user: sanitizeUser(user),
      },
    });
  } catch (error) {
    console.error("Login failed:", error);
    return res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
});

app.get("/api/auth/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.auth.sub);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.json({
      success: true,
      data: sanitizeUser(user),
    });
  } catch (error) {
    console.error("Fetch user failed:", error);
    return res.status(500).json({
      success: false,
      message: "Could not fetch user profile",
    });
  }
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

app.post("/api/orders", authMiddleware, async (req, res) => {
  const { items, subtotal, tax, total, senderAddress, receiverAddress, receiptEmail } =
    req.body || {};

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Order must include at least one item",
    });
  }

  if (!validateAddress(senderAddress)) {
    return res.status(400).json({
      success: false,
      message: "Sender address is incomplete",
    });
  }

  if (!validateAddress(receiverAddress)) {
    return res.status(400).json({
      success: false,
      message: "Receiver address is incomplete",
    });
  }

  if (!isValidEmail(receiptEmail)) {
    return res.status(400).json({
      success: false,
      message: "A valid receipt email is required",
    });
  }

  const createdOrder = {
    id: `ORD-${Date.now()}`,
    items,
    subtotal,
    tax,
    total,
    senderAddress,
    receiverAddress,
    receiptEmail,
    status: "created",
    createdAt: new Date().toISOString(),
  };

  orders.push(createdOrder);
  try {
    const receipt = await sendOrderReceipt(createdOrder);
    return res.status(201).json({
      success: true,
      message: receipt.sent
        ? "Order created and receipt emailed"
        : "Order created. Receipt email not sent",
      receipt,
      data: createdOrder,
    });
  } catch (error) {
    console.error("Receipt email failed:", error);
    return res.status(201).json({
      success: true,
      message: "Order created. Receipt email failed",
      receipt: {
        sent: false,
        reason: "Email send failed",
      },
      data: createdOrder,
    });
  }
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

async function startServer() {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("MONGODB_URI is required for backend startup");
  }

  await mongoose.connect(mongoUri);
  console.log("MongoDB connected");

  app.listen(port, () => {
    console.log(`Vastraa backend running on http://localhost:${port}`);
  });
}

startServer().catch((error) => {
  console.error("Server failed to start:", error.message);
  process.exit(1);
});
