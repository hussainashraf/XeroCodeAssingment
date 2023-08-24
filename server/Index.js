const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const googleStrategy = require("passport-google-oauth20");
const gitHubStrategy = require("passport-github2").Strategy;
const authRoutes = require("./Routes/AuthRoutes")
const cookieParser = require("cookie-parser");
const mongoString ="mongodb+srv://hussain:uloIEGFEZppynfJl@cluster0.0gy9nw5.mongodb.net/";
const port = 4000;
const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose
  .connect(mongoString, connectionParams)
  .then(() => {
    console.log("Connected to database ");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });
app.use(
  cors({
    origin: ["http://localhost:3000"],
    method: ["GET", "PUT", "PATCH", "POST", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/",authRoutes);
// app.use("/hosting",authRoutes)

passport.use(
  new googleStrategy(
    {
      clientID:
        "474899040964-gussjmsomp0heal3bqs9s9qtr9p594dg.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:3000/login",
      // redirect: "http://localhost:3000"
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(accessToken), console.log(refreshToken), console.log(profile);
    }
  )
);

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

app.get("/auth/google/callback", passport.authenticate("google"));
app.use(passport.initialize());

passport.use(
  new gitHubStrategy(
    {
      clientID: "08b68a771454597a54d4",
      clientSecret: "11289d546e743219d3583766acd1ae82653d3041",
      callbackURL: "http://localhost:3000/login",
    },
    function (accessToken, refreshToken, profile, done) {
      console.log(accessToken);
      console.log(refreshToken);
      console.log(profile);
    }
  )
);
app.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email", "email"] })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
