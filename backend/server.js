const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

app.post('/create', async (req, res) => {
  console.log("=== CREATE REQUEST ===");
  console.log("Incoming data:", req.body);
  console.log("Supabase URL:", process.env.SUPABASE_URL);
  console.log("Supabase Key exists:", !!process.env.SUPABASE_KEY);
  
  try {
    const { trackingcode, fullname, emailaddress, contactnumber, province, city, barangay, purpose } = req.body;
    
    // Validate required fields
    if (!trackingcode || !fullname) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    
    console.log("Attempting to insert:", { trackingcode, fullname, emailaddress, contactnumber, province, city, barangay, purpose });
    
    const { data, error } = await supabase.from('Barangay Clearance').insert([
      { trackingcode, fullname, emailaddress, contactnumber, province, city, barangay, purpose }
    ]);

    if (error) {
      console.error("Supabase error:", error);
      throw error;
    }
    
    console.log("Insert successful:", data);
    res.status(201).json({ message: "Record created successfully", data });
  } catch (err) {
    console.error("Full error:", err);
    res.status(500).json({ message: 'Database error', details: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));