const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const app = express();
dotenv.config();
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "NEW HUBIT'S API BY HIMAL FULLEL",
      description: "GET AND POST API OF HUB IT",
      contact: {
        name: "BACKEND DEVELOPER",
      },
      servers: ["http://localhost:4000"],
    },
  },
  apis: ["./route/*.js"],
}
console.log(process.env.LOCATION);
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(cors({ origin: "*" }));
app.use("/public", express.static("./public"));
app.use(bodyParser.json());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
// routes import
const Course = require("./route/Course");
const Category = require("./route/Category");
const Syallabus = require("./route/Syllabus");
const Inquire = require("./route/Inquire");
const QuickCall = require("./route/QuickCall");
const onlineForm = require("./route/onlineform");
const Instructor = require("./route/instructor");
const FeaturedCourse = require("./route/featuredcourse");
const Review = require("./route/review");
const Aboutus = require("./route/aboutusdetail");
const TeamMember = require("./route/teammember");
app.get("/", (req, res) => {
  res.send("this is for hubit");
});
app.use("/course", Course);
app.use("/category", Category);
app.use("/syallabus", Syallabus);
app.use("/inquire", Inquire);
app.use("/quickcall", QuickCall)
app.use("/onlineform", onlineForm);
app.use("/instructor", Instructor);
app.use("/featuredcourse", FeaturedCourse);
app.use("/review", Review);
app.use("/aboutus", Aboutus);
// mongoodb connection
const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 4000;
mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => app.listen(PORT),
    console.log("Application is running at port:" + PORT)
  )
  .catch(err => console.log(err));
