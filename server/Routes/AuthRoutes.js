const { register, login,hosting } = require("../Controller/AuthControllers");
const { checkUser, authenticateHosting } = require("../Middlewares/AuthMiddleware");
const router = require("express").Router();

router.post("/",checkUser)
router.post("/signup",register)
router.post("/signin",login)
router.post("/hosting", checkUser); 
 // Assuming you have an Express router

// ... (Other imports and setup)

// Add the following route for saving the selected option
router.post("/save-data", checkUser, async (req, res,next) => {
    const userId = req.userId; // This comes from the authenticated user
  
    // Here, you can save the data to your MongoDB database
    const { option, value } = req.body;
    try {
      // Example logic to save data to MongoDB
      // Replace this with your actual MongoDB data saving logic
      const savedData = await saveDataToMongoDB(userId, option, value);
  
      res.status(200).json(savedData);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });


module.exports = router;