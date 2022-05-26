const express = require("express");
require("dotenv").config();
const cors = require("cors");
const sequelize = require("./utils/database");
const passport = require("passport");
const expressSession = require("express-session");
const SessionStore = require("express-session-sequelize")(expressSession.Store);
const cookieParser = require("cookie-parser");
const path = require("path");
require("./utils/passport");

// MODELS
const User = require("./Model/User.model");
const Pack = require("./Model/Pack.model");
const Keyword = require("./Model/Keyword.model");
const Order = require("./Model/Order.model");
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
    allowedHeaders: ["Content-Type", "Authorization"],
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
app.use("/api/subscriber", require("./Routes/Subscribe"));
app.use("/api/pack", require("./Routes/Pack"));
app.use("/api/order", require("./Routes/Order"));
app.use("/api/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Sequelize Relations
Pack.hasMany(Keyword);
Keyword.belongsTo(Pack);
Order.belongsTo(User);
Order.belongsTo(Pack);
User.hasMany(Order);
Pack.hasMany(Order);
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
