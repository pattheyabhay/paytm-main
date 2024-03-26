const express = require('express');
const rootRouter = require("./routes/index");
const cors = require("cors");

const app = express();
app.use(cors())
app.use(express.json())  // Using express.json() to parse JSON bodies {body-parser}

app.use("/api/v1", rootRouter);


app.listen(3000);


// working flow by ChatGPT

// Sure, here's the flow of your backend program:

// 1. **index.js:** This is the entry point of your backend application. It sets up an Express server, configures middleware (such as CORS and JSON body parsing), and defines the root router.

// 2. **config.js:** This file exports a JWT_SECRET, which is used for signing and verifying JSON Web Tokens (JWTs) for authentication.

// 3. **db.js:** This file connects to your MongoDB database using Mongoose. It defines two schemas: `userSchema` and `accountSchema`. It also creates Mongoose models (`User` and `Account`) based on these schemas and exports them.

// 4. **middleware.js:** This file contains the `authMiddleware` function, which is middleware for authenticating requests using JWTs. It extracts the JWT from the Authorization header, verifies it using the JWT_SECRET, and adds the decoded user ID to the request object (`req.userId`) if authentication is successful.

// 5. **routes/user.js:** This file defines routes related to user authentication and management. It includes routes for user signup, signin, updating user information, and fetching user data. These routes use the `authMiddleware` to ensure that only authenticated users can access them.

// 6. **routes/account.js:** This file defines routes related to account management, such as fetching account balances and transferring funds between accounts. These routes also use the `authMiddleware` to protect access to sensitive account information.

// 7. **routes/index.js:** This file acts as a router for grouping and organizing the user and account routes. It imports the user and account routers and sets up route prefixes (`/user` and `/account`) for them.

// 8. **Root Router:** Finally, the root router in `index.js` is mounted on the Express app with the prefix `/api/v1`. This means that all routes defined in the user and account routers will be prefixed with `/api/v1/user` and `/api/v1/account`, respectively, when accessed from the client.

// With this setup, your backend application is structured to handle user authentication, user management, and account management operations in a modular and organized manner. Requests are authenticated using JWTs, and sensitive routes are protected using the `authMiddleware`.