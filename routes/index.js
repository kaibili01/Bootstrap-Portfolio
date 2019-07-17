const router = require("express");
const sendMailFromGmail = require("../middlewares/gmail");

router.route("/send").post(sendMailFromGmail);


module.exports = router;