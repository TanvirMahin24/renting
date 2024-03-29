const express = require("express");
require("dotenv").config();
const cors = require("cors");
const sequelize = require("./Utils/database");
const passport = require("passport");
const expressSession = require("express-session");
const SessionStore = require("express-session-sequelize")(expressSession.Store);
const cookieParser = require("cookie-parser");

const path = require("path");
require("./Utils/passport");

// MODELS
const User = require("./Model/User.model");
const Listing = require("./Model/Listing.model");
const Category = require("./Model/Category.model");
const Image = require("./Model/Image.model");
const Keyword = require("./Model/Keyword.model");
const Requirement = require("./Model/Requirement.model");
const Request = require("./Model/Request.model");
const Contact = require("./Model/Contact.model");
const Report = require("./Model/Report.model");
const Reset = require("./Model/Reset.model");
require("./Model/Subscribers.model");

// INITIALIZE APP
const app = express();
const port = process.env.PORT || 5000;

//Initializing the middlewares
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));

// Cors;
app.use(
  cors({
    origin: function (origin, callback) {
      const regularEx = RegExp(`${process.env.CLIENT_DOMAIN}$`, "i");

      if (regularEx.test(origin)) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
    credentials: true,
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Access-Control-Allow-Origin",
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Methods",
    ],
    methods: ["GET", "PUT", "POST", "DELETE", "PATCH"],
  })
);

// Require multer
require("./config/multer");

// Session
const sequelizeSessionStore = new SessionStore({
  db: sequelize,
});

app.use(cookieParser());
app.use(
  expressSession({
    secret: process.env.SESSION_SECREAT,
    store: sequelizeSessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

// Auth
app.use(passport.initialize());
app.use(passport.session());
// Subscribers Route
app.use("/api", require("./Routes/Auth"));
app.use("/api/user", require("./Routes/User"));
app.use("/api/category", require("./Routes/Category"));
app.use("/api/listing", require("./Routes/Listing"));
app.use("/api/contact", require("./Routes/Contact"));
app.use("/api/subscriber", require("./Routes/Subscribe"));
app.use("/api/request", require("./Routes/Request"));
app.use("/api/report", require("./Routes/Report"));
app.use("/api/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Sequelize Relations
Listing.belongsTo(User);
Listing.belongsTo(Category);
Listing.hasMany(Image);
Listing.hasMany(Keyword);
Listing.hasMany(Requirement);
User.hasMany(Listing);
User.hasMany(Contact);
Category.hasMany(Listing);
Image.belongsTo(Listing);
Keyword.belongsTo(Listing);
Requirement.belongsTo(Listing);
Request.belongsTo(User);
Request.belongsTo(Listing);
Contact.belongsTo(User);
Report.belongsTo(Listing);
Listing.hasMany(Report);
Report.belongsTo(User);
User.hasMany(Report);
Reset.belongsTo(User);
User.hasMany(Reset);

// Sequelize Sync
sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("Error creating database: ", err);
  });
