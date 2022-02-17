var asciify = require("asciify-image");

var options = {
  fit: "box",
  width: 25,
  height: 25,
  color: true,
};

asciify("./src/assets/logo.png", options, function (err: any, asciified: any) {
  if (err) throw err;

  // Print to console
  console.log("");
  console.log(asciified);
  console.log("");
});
