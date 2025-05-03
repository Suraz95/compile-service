const app = require('./app.js');
require('dotenv').config();

app.get("/", (req, res) => {
  res.send("hello this is from compile service")
})
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
})