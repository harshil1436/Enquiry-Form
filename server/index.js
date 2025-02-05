let express = require("express");
let mongoose = require("mongoose");
let cors = require("cors");

const enqrouter = require("./App/routes/web/enquiryRoutes");
const contactRoutes = require("./App/routes/web/contactRoutes"); // ✅ Fixed Path

require("dotenv").config();
let app = express();

app.use(cors());
app.use(express.json());

// ✅ Import Routes    
app.use("/api/enquiries", enqrouter);
app.use("/api/contact", contactRoutes);  // Added `/api/`

// ✅ Connect to MongoDB
mongoose.connect(process.env.DBURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
  });
