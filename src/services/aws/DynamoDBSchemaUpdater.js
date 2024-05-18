const DynamoDBTableUtility = require('../../utils/DynamoDBTableUtility');
const carPartSchema = require('../../models/carpart');
const userSchema = require('../../models/user');
const orderSchema = require('../../models/order');
const paymentSchema = require('../../models/payment');
const vehicleSchema = require('../../models/vehicle');
const promotionSchema = require('../../models/promotion');
const profileSchema = require('../../models/profile');
const commentSchema = require('../../models/comment');
const reviewSchema = require('../../models/review');
const sucursalSchema = require('../../models/sucursal');
const logginInfoSchema = require('../../models/logininfo');
const auditSchema = require('../../models/audit');
const bestsellerSchema = require('../../models/bestseller');
const clientSchema = require('../../models/client');
const newarrivalSchema = require('../../models/newarrival');
const popularcategorySchema = require('../../models/popularcategory');
const popularproductSchema = require('../../models/popularproduct');
const specialOfferSchema = require('../../models/specialoffer');
const stockSchema = require('../../models/stock');
const topratedSchema = require('../../models/toprated');
const visitSchema = require('../../models/visit');
const wishlistSchema = require('../../models/wishlist');
const viewSchema = require('../../models/view');


const carPartTableUtility = new DynamoDBTableUtility(carPartSchema.TableName, carPartSchema);
const userTableUtility = new DynamoDBTableUtility( userSchema.TableName, userSchema);
const orderTableUtility = new DynamoDBTableUtility(orderSchema.TableName, orderSchema);
const paymentTableUtility = new DynamoDBTableUtility(paymentSchema.TableName, paymentSchema);
const vehicleTableUtility = new DynamoDBTableUtility(vehicleSchema.TableName, vehicleSchema);
const promotionTableUtility = new DynamoDBTableUtility(promotionSchema.TableName, promotionSchema);
const profileTableUtility = new DynamoDBTableUtility(profileSchema.TableName, profileSchema);
const commentTableUtility = new DynamoDBTableUtility(commentSchema.TableName, commentSchema);
const reviewTableUtility = new DynamoDBTableUtility(reviewSchema.TableName, reviewSchema);
const sucursalTableUtility = new DynamoDBTableUtility(sucursalSchema.TableName, sucursalSchema);
const logginInfoTableUtility = new DynamoDBTableUtility(logginInfoSchema.TableName, logginInfoSchema);
const auditTableUtility = new DynamoDBTableUtility(auditSchema.TableName, auditSchema);
const bestsellerTableUtility = new DynamoDBTableUtility( bestsellerSchema.TableName, bestsellerSchema);
const clientTableUtility = new DynamoDBTableUtility(clientSchema.TableName, clientSchema);
const newarrivalTableUtility = new DynamoDBTableUtility(newarrivalSchema.TableName, newarrivalSchema);
const popularcategoryTableUtility = new DynamoDBTableUtility(popularcategorySchema.TableName, popularcategorySchema);
const popularproductTableUtility = new DynamoDBTableUtility(popularproductSchema.TableName, popularproductSchema);
const specialOfferTableUtility = new DynamoDBTableUtility(specialOfferSchema.TableName, specialOfferSchema);
const stockSchemaTableUtility = new DynamoDBTableUtility(stockSchema.TableName, stockSchema);
const topratedTableUtility = new DynamoDBTableUtility(topratedSchema.TableName, topratedSchema);
const visitSchemaTableUtility = new DynamoDBTableUtility(visitSchema.TableName, visitSchema);
const wishlistTableUtility = new DynamoDBTableUtility(wishlistSchema.TableName, wishlistSchema);
const viewTableUtility = new DynamoDBTableUtility(viewSchema.TableName, viewSchema);


const update=async () => {
  await carPartTableUtility.checkOrCreateTable();
  await userTableUtility.checkOrCreateTable();
  await orderTableUtility.checkOrCreateTable();
  await paymentTableUtility.checkOrCreateTable();
  await vehicleTableUtility.checkOrCreateTable();
  await promotionTableUtility.checkOrCreateTable();
  await profileTableUtility.checkOrCreateTable();
  await commentTableUtility.checkOrCreateTable();
  await reviewTableUtility.checkOrCreateTable();
  await sucursalTableUtility.checkOrCreateTable();
  await logginInfoTableUtility.checkOrCreateTable();
  await auditTableUtility.checkOrCreateTable();
  await bestsellerTableUtility.checkOrCreateTable();
  await clientTableUtility.checkOrCreateTable();
  await newarrivalTableUtility.checkOrCreateTable();
  await popularcategoryTableUtility.checkOrCreateTable();
  await popularproductTableUtility.checkOrCreateTable();
  await specialOfferTableUtility.checkOrCreateTable();
  await stockSchemaTableUtility.checkOrCreateTable();
  await topratedTableUtility.checkOrCreateTable();
  await visitSchemaTableUtility.checkOrCreateTable();
  await wishlistTableUtility.checkOrCreateTable();
  await viewTableUtility.checkOrCreateTable();

}

module.exports = {update};
