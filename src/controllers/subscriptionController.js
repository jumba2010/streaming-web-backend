const constants = require('../utils/constants');
const crudService = require("../services/crudService");

// Create a new Subscription
const add = async (req, res) => {
  try {
    const { userId, paymentData, startDate, endDate } = req.body;
    const subscriptionData = {
      userId,
      paymentData,
      startDate: startDate || new Date().toISOString(),
      endDate,
      status: 'ACTIVE',
    };

    const subscription = await crudService.create(constants.SUBSCRIPTION_TABLE, subscriptionData);
    res.status(201).json(subscription);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the subscription.' });
  }
};


// Renew Subscription
const renew = async (req, res) => {
  try {
    const { subscriptionId } = req.params;
    const { newEndDate } = req.body;

    const updateParams = {
      status: 'ACTIVE',
      endDate: newEndDate,
    };

    await crudService.update(constants.SUBSCRIPTION_TABLE, subscriptionId, updateParams);
    res.json({ message: 'Subscription renewed successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while renewing the subscription.' });
  }
};

//Check if user has an active subscription
const checkStatus = async (req, res) => {
  try {
    const { userId } = req.params;

    const subscription = await crudService.get(constants.SUBSCRIPTION_TABLE, { userId });

    if (subscription && new Date(subscription.endDate) > new Date() && subscription.status === 'ACTIVE') {
      res.json({ active: true });
    } else {
      res.json({ active: false });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while checking the subscription status.' });
  }
};


const cancel = async (req, res) => {
  try {
    const { subscriptionId } = req.params;

    await crudService.update(constants.SUBSCRIPTION_TABLE, subscriptionId, { status: 'CANCELED' });
    res.json({ message: 'Subscription canceled successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while canceling the subscription.' });
  }
};

const findByUserId = async (req, res) => {
  try {
    
    const { userId} = req.params;
    const subscriptions = await crudService.findByUserId(constants.SUBSCRIPTION_TABLE,userId);

    res.status(200).json(subscriptions);
  } catch (error) {
    res.status(404).json({ error: 'No Item found by the the userId' });
  }
};

module.exports = {
  add,
  renew,
  checkStatus,
  cancel,
  findByUserId,
};
