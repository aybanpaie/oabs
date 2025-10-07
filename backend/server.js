const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
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

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
