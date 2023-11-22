const router =require("express").Router();
const { usersController, }= require("../controller");
const jwt = require("jsonwebtoken");
const { validateToken } = require("../middleware/validation");
 const deleteEmployee = require('../controller/deleteEmployee');
 const editEmployee =require('../controller/editEmployee')

router.get("/", usersController.getData);
router.post("/login", usersController.login);
router.post('/addEmployee',usersController.registerEmployee);
router.get('/getDataEmployee', usersController.getDataEmployee);


router.delete('/deleteEmployee/:id', deleteEmployee);
router.put('/editEmployee/:id', editEmployee);





module.exports = router;