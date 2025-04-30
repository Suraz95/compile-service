const compileCode = require("../controllers/compiler");
const { Router } = require("express");
const router = Router();


router.post("/:language", compileCode);

module.exports = router;
