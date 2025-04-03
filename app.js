const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");  
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ✅ Database Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "2003",
  database: "haricreation",
  port: 3308,  // Change if needed
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("✅ Connected to MySQL Database!");
  }
});

// ✅ Default Route
app.get("/", (req, res) => {
  res.send("Hari Collection Backend is Running!");
});

app.get("/products", (req, res) => {
  db.query("SELECT * FROM products", (err, results) => {
      if (err) {
          res.status(500).json({ error: "Database error!" });
      } else {
          res.json(results);
      }
  });
});



// ✅ 2️⃣ Show Add Product Page (NEW ✅)
app.get("/products/add", (req, res) => {
  res.send("Add a new product using a POST request.");
});

// ✅ 3️⃣ Add New Product (Fix ✅)
app.post("/products/add", (req, res) => {
  const { name, price, description, image } = req.body;
  if (!name || !price || !description || !image) {
    return res.status(400).json({ error: "All fields are required!" });
  }
  
  const sql = "INSERT INTO products (name, price, description, image) VALUES (?, ?, ?, ?)";
  db.query(sql, [name, price, description, image], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "✅ Product added successfully!", id: result.insertId });
  });
});

// ✅ 4️⃣ Update Product
app.put("/products/update/:id", (req, res) => {
  const { id } = req.params;
  const { name, price, description, image } = req.body;
  if (!name || !price || !description || !image) {
    return res.status(400).json({ error: "All fields are required!" });
  }
  
  const sql = "UPDATE products SET name=?, price=?, description=?, image=? WHERE id=?";
  db.query(sql, [name, price, description, image, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "✅ Product updated successfully!" });
  });
});

// ✅ 5️⃣ Delete Product
app.delete("/products/delete/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM products WHERE id=?";

  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "✅ Product deleted successfully!" });
  });
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
