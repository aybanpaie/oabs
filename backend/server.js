const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

  app.post('/create', async (req, res) => {
    console.log("Incoming data:", req.body);
  try {
    const { trackingcode, fullname, emailaddress, contactnumber, province, city, barangay, purpose } = req.body;

    const { data, error } = await supabase.from('oabs').insert([
      { trackingcode, fullname, emailaddress, contactnumber, province, city, barangay, purpose }
    ]);

    if (error) throw error;
    res.status(201).json({ message: "Record created successfully", data });
  } catch (err) {
    res.status(500).json({ message: 'Database error', details: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));