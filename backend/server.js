const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:3000",    
      "https://oabsfront.onrender.com",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);
const PORT = process.env.PORT || 3000;

// Configure multer for file uploads
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

// Register main admin endpoint
app.post("/api/main/register", async (req, res) => {
  try {
    const { fullname, email, username, password } = req.body;

    // Validation
    if (!fullname || !email || !username || !password) {
      return res.status(400).json({
        success: false,
        error: "All fields are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        error: "Password must be at least 6 characters long",
      });
    }

    // Check if username already exists
    const { data: existingUsername } = await supabase
      .from("Admins")
      .select("username")
      .eq("username", username)
      .single();

    if (existingUsername) {
      return res.status(400).json({
        success: false,
        error: "Username already exists",
      });
    }

    // Check if email already exists
    const { data: existingEmail } = await supabase
      .from("Admins")
      .select("email")
      .eq("email", email)
      .single();

    if (existingEmail) {
      return res.status(400).json({
        success: false,
        error: "Email already exists",
      });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert user into database
    const { data, error } = await supabase
      .from("Admins")
      .insert([
        {
          fullname,
          email,
          username,
          password: hashedPassword,
        },
      ])
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({
        success: false,
        error: "Failed to create account. Please try again.",
      });
    }

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      user: {
        admin_id: data[0].id,
        fullname: data[0].fullname,
        email: data[0].email,
        username: data[0].username,
      },
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({
      success: false,
      error: "An error occurred during registration",
    });
  }
});

// Login main admin endpoint
app.post("/api/main/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validation
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        error: "Username/Email and password are required",
      });
    }

    // Find user by username or email
    const { data: user, error } = await supabase
      .from("Admins")
      .select("*")
      .or(`username.eq.${username},email.eq.${username}`)
      .single();

    if (error || !user) {
      return res.status(401).json({
        success: false,
        error: "Invalid username/email or password",
      });
    }

    // Compare password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        error: "Invalid username/email or password",
      });
    }

    // Generate a simple token (you can use JWT for better security)
    const token = Buffer.from(`${user.id}:${Date.now()}`).toString("base64");

    // Return user data (exclude password)
    res.status(200).json({
      success: true,
      message: "Login successful",
      token: token,
      user: {
        admin_id: user.admin_id,
        fullname: user.fullname,
        email: user.email,
        username: user.username,
        created_at: user.created_at,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({
      success: false,
      error: "An error occurred during login",
    });
  }
});

// Register user endpoint
app.post("/api/user/register", async (req, res) => {
  try {
    const { fullname, email, username, password } = req.body;

    // Validation
    if (!fullname || !email || !username || !password) {
      return res.status(400).json({
        success: false,
        error: "All fields are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        error: "Password must be at least 6 characters long",
      });
    }

    // Check if username already exists
    const { data: existingUsername } = await supabase
      .from("Owners")
      .select("username")
      .eq("username", username)
      .single();

    if (existingUsername) {
      return res.status(400).json({
        success: false,
        error: "Username already exists",
      });
    }

    // Check if email already exists
    const { data: existingEmail } = await supabase
      .from("Owners")
      .select("email")
      .eq("email", email)
      .single();

    if (existingEmail) {
      return res.status(400).json({
        success: false,
        error: "Email already exists",
      });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert user into database
    const { data, error } = await supabase
      .from("Owners")
      .insert([
        {
          fullname,
          email,
          username,
          password: hashedPassword,
        },
      ])
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({
        success: false,
        error: "Failed to create account. Please try again.",
      });
    }

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      user: {
        owner_id: data[0].id,
        fullname: data[0].fullname,
        email: data[0].email,
        username: data[0].username,
      },
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({
      success: false,
      error: "An error occurred during registration",
    });
  }
});

// Login user endpoint
app.post("/api/user/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validation
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        error: "Username/Email and password are required",
      });
    }

    // Find user by username or email
    const { data: user, error } = await supabase
      .from("Owners")
      .select("*")
      .or(`username.eq.${username},email.eq.${username}`)
      .single();

    if (error || !user) {
      return res.status(401).json({
        success: false,
        error: "Invalid username/email or password",
      });
    }

    // Compare password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        error: "Invalid username/email or password",
      });
    }

    // Generate a simple token (you can use JWT for better security)
    const token = Buffer.from(`${user.id}:${Date.now()}`).toString("base64");

    // Return user data (exclude password)
    res.status(200).json({
      success: true,
      message: "Login successful",
      token: token,
      user: {
        owner_id: user.owner_id,
        fullname: user.fullname,
        email: user.email,
        username: user.username,
        created_at: user.created_at,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({
      success: false,
      error: "An error occurred during login",
    });
  }
});

// Add category endpoint
app.post("/api/category/add", async (req, res) => {
  try {
    const { categoryName, description } = req.body;

    // Validation
    if (!categoryName || !description) {
      return res.status(400).json({
        success: false,
        message: "Category name and description are required",
      });
    }

    // Check if category name already exists
    const { data: existingCategory } = await supabase
      .from("Document Categories")
      .select("category_name")
      .eq("category_name", categoryName)
      .single();

    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Category name already exists",
      });
    }

    // Insert category into database
    const { data, error } = await supabase
      .from("Document Categories")
      .insert([
        {
          category_name: categoryName,
          description: description,
        },
      ])
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to add category. Please try again.",
      });
    }

    res.status(201).json({
      success: true,
      message: "Category added successfully",
      category: data[0],
    });
  } catch (err) {
    console.error("Add category error:", err);
    res.status(500).json({
      success: false,
      message: "An error occurred while adding category",
    });
  }
});

// Get all categories endpoint
app.get("/api/category/all", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("Document Categories")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch categories",
      });
    }

    res.status(200).json({
      success: true,
      categories: data,
    });
  } catch (err) {
    console.error("Fetch categories error:", err);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching categories",
    });
  }
});

// Update category endpoint
app.put("/api/category/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { categoryName, description } = req.body;

    // Validation
    if (!categoryName || !description) {
      return res.status(400).json({
        success: false,
        message: "Category name and description are required",
      });
    }

    // Check if category name already exists (excluding current category)
    const { data: existingCategory } = await supabase
      .from("Document Categories")
      .select("category_id")
      .eq("category_name", categoryName)
      .neq("category_id", id)
      .single();

    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Category name already exists",
      });
    }

    // Update category in database
    const { data, error } = await supabase
      .from("Document Categories")
      .update({
        category_name: categoryName,
        description: description,
      })
      .eq("category_id", id)
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to update category. Please try again.",
      });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      category: data[0],
    });
  } catch (err) {
    console.error("Update category error:", err);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating category",
    });
  }
});

// Delete category endpoint
app.delete("/api/category/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Delete category from database
    const { data, error } = await supabase
      .from("Document Categories")
      .delete()
      .eq("category_id", id)
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to delete category. Please try again.",
      });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (err) {
    console.error("Delete category error:", err);
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting category",
    });
  }
});

// Add document endpoint with file upload
app.post("/api/document/add", upload.single("document"), async (req, res) => {
  try {
    const { categoryId, description, createdBy } = req.body;
    const file = req.file;

    // Validation
    if (!categoryId || !description || !createdBy || !file) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Insert document into database
    const { data, error } = await supabase
      .from("Documents")
      .insert([
        {
          category_id: categoryId,
          document_name: file.originalname,
          document_path: file.path,
          description: description,
          created_by: createdBy,
        },
      ])
      .select();

    if (error) {
      console.error("Supabase error:", error);
      // Delete uploaded file if database insert fails
      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
      return res.status(500).json({
        success: false,
        message: "Failed to add document. Please try again.",
      });
    }

    res.status(201).json({
      success: true,
      message: "Document added successfully",
      document: data[0],
    });
  } catch (err) {
    console.error("Add document error:", err);
    // Delete uploaded file if error occurs
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({
      success: false,
      message: "An error occurred while adding document",
    });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
