const constants = require('../utils/constants');
const crudService = require("../services/crudService");
const cognitoService = require('../services/aws/cognitoService');

const createUser = async (req, res) => {
  try {
    const  {password, ...userData } = req.body;
    const {name,email}=userData
    await  cognitoService.signUp({name,email,password});
  
    const newUser = await crudService.create(constants.USER_TABLE,userData);

    res.status(201).json(newUser);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'An error occurred while creating the user.' });
  }
};

const createAdminUser = async (req, res) => {
  try {
    const  {password, ...userData } = req.body;
    const {name,email} = userData
    await  cognitoService.signUp({name,email,password});
    await  cognitoService.autoConfirmSignUp({email});
    const newUser = await crudService.create(constants.USER_TABLE,userData);
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'An error occurred while creating the user.' });
  }
};

const login = async (req, res) => {
  try {
    const { email,password } = req.body;
    const token =await  cognitoService.login({email,password});
    res.status(200).json({"toke":token});
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: 'Invalid user credentials' });
  }
};

const confirmEmail = async (req, res) => {
  try {
    const { email,code } = req.body;
    await  cognitoService.confirmSignUp({email,code});
    res.status(204);
  } catch (error) {
    res.status(500).json({ error: 'could not confirm email',error });
  }
};

const resendConfirmation = async (req, res) => {
  try {
    const { email } = req.body;
    await  cognitoService.resendConfirmationCode({email});
    res.status(204);
  } catch (error) {
    res.status(500).json({ error: 'could not resend confirmation code',error });
  }
};

const updateUser = async (req, res) => {
  try {
    const { userId,createdAt } = req.params;
    const { userData } = req.body;

    const updatedUser = await crudService.update(constants.USER_TABLE,userId,createdAt, userData);

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the user.' });
  }
};

const inactivateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user =await crudService.readById(constants.USER_TABLE,userId);
    await cognitoService.deleteUser(user.email);
    await crudService.inactivate(constants.USER_TABLE,user.id);

    res.json({ message: 'User inactivated successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while inactivating the user.' });
  }
};

const findActiveUserById = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await crudService.readById(constants.USER_TABLE,userId);

    if (!user) {
      return res.status(404).json({ message: 'Active user not found.' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the active user.' });
  }
};

const findBySucursalId = async (req, res) => {
  try {

    const { sucursalId} = req.params;
    
    const {lastEvaluatedKey, pageLimit } = req.query;

    const newArrivals = await crudService.findBySucursalId(constants.USER_TABLE,sucursalId);

    res.status(200).json(newArrivals);
  } catch (error) {
    res.status(404).json({ error: 'No Item found by the given sucrusalId' });
  }
};

module.exports = {
  createUser,
  updateUser,
  inactivateUser,
  findActiveUserById,
  login,
  confirmEmail,
  resendConfirmation,
  findBySucursalId,
  createAdminUser,
};
