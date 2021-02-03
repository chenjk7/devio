var multer = require("multer");
var upload = multer({ dest: "uploads/" });
const cpUpload = upload.fields([
   { name: "avatar", maxCount: 1 },
   { name: "cover", maxCount: 1 },
]);

module.exports = cpUpload;
