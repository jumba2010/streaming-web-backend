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
const carPartRoutes = require('./src/routes/carPartRoute');
const orderRoutes = require('./src/routes/orderRoute');
const paymentRoutes = require('./src/routes/paymentRoute');
const promotionRoutes = require('./src/routes/promotionRoute');
const userRoutes = require('./src/routes/userRoute');
const vehicleRoutes = require('./src/routes/vehicleRoute');
const fileUploadRoutes = require('./src/routes/fileUploadRoute');
const authRoutes = require('./src/routes/authRoute');
const auditRoute = require('./src/routes/auditRoute');
const bestSellerRoute = require('./src/routes/bestSellerRoute');
const clientRoute = require('./src/routes/clientRoute');
const newArrivalsRoute = require('./src/routes/newArrivalsRoute');
const popularCategoryRoute = require('./src/routes/popularCategoryRoute');
const popularProductRoute = require('./src/routes/popularProductRoute');
const specialOfferRoute = require('./src/routes/specialOfferRoute');
const stockRoute = require('./src/routes/stockRoute');
const topRatedRoute = require('./src/routes/topRatedRoute');
const visitRoute = require('./src/routes/visitRoute');
const wishListRoute = require('./src/routes/wishListRoute');
const reviewRoute = require('./src/routes/reviewRoute');
const viewRoute = require('./src/routes/viewRoute');

// Mount the route files
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/car-parts', carPartRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1/promotions', promotionRoutes);
app.use('/api/v1/vehicles', vehicleRoutes);
app.use('/api/v1/file-upload', fileUploadRoutes);
app.use('/api/v1/auditing', auditRoute);
app.use('/api/v1/best-sellers', bestSellerRoute);
app.use('/api/v1/clients', clientRoute);
app.use('/api/v1/new-arrivals', newArrivalsRoute);
app.use('/api/v1/popular-categories', popularCategoryRoute);
app.use('/api/v1/popular-products', popularProductRoute);
app.use('/api/v1/special-offers', specialOfferRoute);
app.use('/api/v1/stocks', stockRoute);
app.use('/api/v1/top-rated', topRatedRoute);
app.use('/api/v1/visits', visitRoute);
app.use('/api/v1/wish-list', wishListRoute);
app.use('/api/v1/reviews', reviewRoute);
app.use('/api/v1/views', viewRoute);


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