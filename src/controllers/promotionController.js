const constants = require('../utils/constants');
const crudService = require("../services/crudService");
const { transformMapToList } = require('../utils/DynamoDBUpdaterUtil')

const createPromotion = async (req, res) => {
  try {
    const promotionData = req.body;
    validateCreatePromotion(promotionData);
    let products = promotionData.products;
    promotionData.products = promotionData.applytoall ? [] : products;
    const newPromotion = await crudService.create(constants.PROMOTION_TABLE, promotionData);
    await updateProductPrices(products, promotionData.percentage);


    res.status(201).json(newPromotion);
  } catch (error) {
    res.status(400).json({ message:error.message });
  }
};


async function updateProductPrices(products, percentage) {
  for (const product of products) {
    let promotionalPrice = parseFloat(product.sellprice) - parseFloat(product.sellprice * percentage) / 100;
    let newPayload = {};
    newPayload.compareAtPrice = product.sellprice;
    newPayload.sellprice = promotionalPrice;
    newPayload.promotionalPercentage = percentage;
    newPayload.inPromotion = 1;
    await crudService.update(constants.CAR_PART_TABLE, product.id, product.createdAt, newPayload);
  }
}


const updatePromotion = async (req, res) => {
  try {
    const { promotionId, createdAt } = req.params;
    const { promotionData } = req.body;

    const updatedPromotion = await crudService.update(constants.PROMOTION_TABLE, promotionId, createdAt, promotionData);

    if (!updatedPromotion) {
      return res.status(404).json({ message: 'Promotion not found.' });
    }

    res.json(updatedPromotion);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the promotion.' });
  }
};

const inactivatePromotion = async (req, res) => {
  try {
    const { promotionId, createdAt } = req.params;
    const promotionData  =  {active:'0'};

    const promotion = await crudService.readById(constants.PROMOTION_TABLE,promotionId,createdAt);
   
    if (!promotion) {
      return res.status(404).json({ message: 'Promotion not found.' });
    }
    
   const updatedPromotion = await crudService.update(constants.PROMOTION_TABLE, promotionId, createdAt, promotionData);
   const products = await crudService.scanBySucursalId(constants.CAR_PART_TABLE,promotion.sucursalId);
    
   if(promotion.applytoall){
      await removeProductPromotions(products);
    }

  else {
      let promotions = [promotion];
      let newList = await composePromotionData(promotions);
      let newProductIds = newList[0].products.map(product => product.id);
      let filteredProducts = products.filter(product => newProductIds.includes(product.id));
     
     console.log(newProductIds,filteredProducts)
      await removeProductPromotions(filteredProducts);
    }

    res.status(201).json(updatedPromotion);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the promotion.' });
  }
};



async function removeProductPromotions(products) {

  for (const product of products) {
    let newPayload = {};
    newPayload.compareAtPrice = 0;
    newPayload.sellprice = parseFloat(product.compareAtPrice);
    newPayload.inPromotion = 0;
    await crudService.update(constants.CAR_PART_TABLE, product.id, product.createdAt, newPayload);
  }
}

const findPromotions = async (req, res) => {
  try {
    const promotions = await crudService.findBySucursalId(constants.PROMOTION_TABLE, req.params.sucursalId);
    const newList = await composePromotionData(promotions);
    res.status(200).json(newList);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching active promotions.' });
  }
};

function validateCreatePromotion(promotion) {
  if (!promotion) {
    throw new Error('promotion.payload.undefined')
  }

  if (!promotion.products || !Array.isArray(promotion.products)
    || promotion.products.length === 0) {
      throw new Error('promotion.products.not.defined');
  }

  promotion.products.forEach(product => {
    if (product.inPromotion=='1') {
      throw new Error('product.in.active.promotion');
    }
  });


}

async function composePromotionData(promotions) {
  const newList = [];
  for (let index = 0; index < promotions.length; index++) {
    const promotion = promotions[index];
    let products = transformMapToList(promotion.products);
    promotion.products = products;
    newList.push(promotion);
  }
  return newList;
}


module.exports = {
  createPromotion,
  updatePromotion,
  findPromotions,
  inactivatePromotion
};
