const express = require('express');
const bodyParser = require('body-parser');
const serverless = require('serverless-http');
const DynamoDBSchemaUpdater=require("./src/services/aws/DynamoDBSchemaUpdater");
const SESService = require("./src/services/aws/sesService");
const constants = require("./src/utils/constants");
const fs = require("fs");


const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// Middlewares
app.use(bodyParser.json());

DynamoDBSchemaUpdater.update();

// Routes
const movieRoutes = require('./src/routes/movieRoute');
const orderRoutes = require('./src/routes/orderRoute');
const paymentRoutes = require('./src/routes/paymentRoute');
const promotionRoutes = require('./src/routes/promotionRoute');
const userRoutes = require('./src/routes/userRoute');
const categoryRoute = require('./src/routes/categoryRoute');
const fileUploadRoutes = require('./src/routes/fileUploadRoute');
const authRoutes = require('./src/routes/authRoute');
const favouriteRoutes = require('./src/routes/favouriteRoute');
const clientRoutes = require('./src/routes/clientRoute');
const playListRoutes = require('./src/routes/playListRoute');
const subscriptionRoutes = require('./src/routes/subscriptionRoute');
const watchListRoutes = require('./src/routes/watchListRoute');
const visitRoute = require('./src/routes/visitRoute');
const favouriteRoute = require('./src/routes/favouriteRoute');

// Mount the route files
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/movies', movieRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1/promotions', promotionRoutes);
app.use('/api/v1/categories', categoryRoute);
app.use('/api/v1/file-upload', fileUploadRoutes);
app.use('/api/v1/favourites', favouriteRoutes);
app.use('/api/v1/playlist', playListRoutes);
app.use('/api/v1/clients', clientRoutes);
app.use('/api/v1/subscriptions', subscriptionRoutes);
app.use('/api/v1/watchlist', watchListRoutes);
app.use('/api/v1/visits', visitRoute);
app.use('/api/v1/wish-list', favouriteRoute);


// Read HTML templates and create or update templates on AWS
const filePath = 'src/templates/orderSucess.html';
fs.readFile(filePath, 'utf8',async  (err, htmlContent) => {
    if (err) {
        console.error("Error reading file:", err);
        return;
    }

    try {

      await SESService.createOrUpdateEmailTemplate(constants.ORDER_SUCCESS_TEMPLATE, constants.ORDER_CONFIRMATION_SUBJECT_PT, htmlContent);
      } catch (parseErr) {
        console.error("Error parsing JSON:", parseErr);
    }
});

console.log(process.cwd())
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


//module.exports.handler = serverless(app);