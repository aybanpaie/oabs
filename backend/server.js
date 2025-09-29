const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
app.use(cors({
  origin: [
    'http://localhost:5173', 
    'http://localhost:3000',
    'https://oabsfront.onrender.com'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));
app.use(express.json());

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
const PORT = process.env.PORT || 3000;

// Health check endpoint
app.get('/oabps/user/register', (req, res) => {
  res.json({ 
    status: 'Server is running',
    message: 'OABS Backend API',
    timestamp: new Date().toISOString(),
    endpoints: {
      register: '/api/register'
    }
  });
});


// Register endpoint
app.post('/api/register', async (req, res) => {
  try {
    const { fullname, email, username, password } = req.body;

    // Validation
    if (!fullname || !email || !username || !password) { 
      return res.status(400).json({ 
        success: false, 
        error: 'All fields are required' 
      });
    }

    if (password.length < 6) {
      return res.status(400).json({ 
        success: false, 
        error: 'Password must be at least 6 characters long' 
      });
    }

    // Check if username already exists
    const { data: existingUsername } = await supabase
      .from('Owners')
      .select('username')
      .eq('username', username)
      .single();

    if (existingUsername) {
      return res.status(400).json({ 
        success: false, 
        error: 'Username already exists' 
      });
    }

    // Check if email already exists
    const { data: existingEmail } = await supabase
      .from('Owners')
      .select('email')
      .eq('email', email)
      .single();

    if (existingEmail) {
      return res.status(400).json({ 
        success: false, 
        error: 'Email already exists' 
      });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert user into database
    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          fullname,
          email,
          username,
          password: hashedPassword
        }
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to create account. Please try again.' 
      });
    }

    res.status(201).json({ 
      success: true, 
      message: 'Account created successfully',
      user: {
        owner_id: data[0].id,
        fullname: data[0].fullname,
        email: data[0].email,
        username: data[0].username
        
      }
    });

  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ 
      success: false, 
      error: 'An error occurred during registration' 
    });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));