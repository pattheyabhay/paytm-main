const express = require("express");
const rootRouter = require("./routes/index");
const cors = require("cors");

const app = express();
app.use(cors())
app.use(express.json())  // Using express.json() to parse JSON bodies {body-parser}

app.use("api/v1", rootRouter);

app.listen(3000);