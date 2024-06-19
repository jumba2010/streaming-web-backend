const DynamoDBTableUtility = require('../../utils/DynamoDBTableUtility');
const movieSchema = require('../../models/movie');
const userSchema = require('../../models/user');
const orderSchema = require('../../models/order');
const profileSchema = require('../../models/profile');
const paymentSchema = require('../../models/payment');
const categorySchema = require('../../models/category');
const promotionSchema = require('../../models/promotion');
const playlistSchema = require('../../models/playlist');
const watchlistSchema = require('../../models/watchlist');
const sucursalSchema = require('../../models/sucursal');
const logginInfoSchema = require('../../models/logininfo');
const clientSchema = require('../../models/client');
const visitSchema = require('../../models/visit');
const favouriteSchema = require('../../models/favorites');
const viewSchema = require('../../models/views');


const movieTableUtility = new DynamoDBTableUtility(movieSchema.TableName, movieSchema);
const userTableUtility = new DynamoDBTableUtility( userSchema.TableName, userSchema);
const orderTableUtility = new DynamoDBTableUtility(orderSchema.TableName, orderSchema);
const paymentTableUtility = new DynamoDBTableUtility(paymentSchema.TableName, paymentSchema);
const categoryTableUtility = new DynamoDBTableUtility(categorySchema.TableName, categorySchema);
const promotionTableUtility = new DynamoDBTableUtility(promotionSchema.TableName, promotionSchema);
const profileTableUtility = new DynamoDBTableUtility(profileSchema.TableName, profileSchema);
const playlistTableUtility = new DynamoDBTableUtility(playlistSchema.TableName, playlistSchema);
const watchlistTableUtility = new DynamoDBTableUtility(watchlistSchema.TableName, watchlistSchema);
const sucursalTableUtility = new DynamoDBTableUtility(sucursalSchema.TableName, sucursalSchema);
const logginInfoTableUtility = new DynamoDBTableUtility(logginInfoSchema.TableName, logginInfoSchema);
const clientTableUtility = new DynamoDBTableUtility(clientSchema.TableName, clientSchema);
const visitSchemaTableUtility = new DynamoDBTableUtility(visitSchema.TableName, visitSchema);
const favouriteTableUtility = new DynamoDBTableUtility(favouriteSchema.TableName, favouriteSchema);
const viewTableUtility = new DynamoDBTableUtility(viewSchema.TableName, viewSchema);


const update=async () => {
  await movieTableUtility.checkOrCreateTable();
  await userTableUtility.checkOrCreateTable();
  await orderTableUtility.checkOrCreateTable();
  await paymentTableUtility.checkOrCreateTable();
  await categoryTableUtility.checkOrCreateTable();
  await promotionTableUtility.checkOrCreateTable();
  await profileTableUtility.checkOrCreateTable();
  await playlistTableUtility.checkOrCreateTable();
  await watchlistTableUtility.checkOrCreateTable();
  await sucursalTableUtility.checkOrCreateTable();
  await logginInfoTableUtility.checkOrCreateTable();
  await clientTableUtility.checkOrCreateTable();
  await visitSchemaTableUtility.checkOrCreateTable();
  await favouriteTableUtility.checkOrCreateTable();
  await viewTableUtility.checkOrCreateTable();

}

module.exports = {update};
