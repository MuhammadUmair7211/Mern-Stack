const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.js");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

connectDB();

const authRoutes = require("./routes/userAuth/userAuth.js");
const adminRoutes = require("./routes/adminAuth/adminAuth.js");
const allAdmins = require("./routes/allAdmin/allAdmin.js");
const allUsers = require("./routes/allUser/allUser.js");
const depositRoute = require("./routes/userDeposit/userDeposit.js");
const tradeRoute = require("./routes/userTrade/trade.js");

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/userAuth", authRoutes);
app.use("/api/adminAuth", adminRoutes);
app.use("/api/allAdmin", allAdmins);
app.use("/api/allUser", allUsers);
app.use("/api/userDeposit", depositRoute);
app.use("/api/userTrade", tradeRoute);

app.get("/", (req, res) => {
	res.send(`server is started on port ${PORT}`);
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
