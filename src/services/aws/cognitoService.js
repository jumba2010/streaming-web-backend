const {SignUpCommand,
    ResendConfirmationCodeCommand,
    ConfirmSignUpCommand,
    InitiateAuthCommand,AdminConfirmSignUpCommand,
    AdminDeleteUserCommand } =require( "@aws-sdk/client-cognito-identity-provider");
const {cognitoClient} = require("../../../config/awsConfig")

const AuthFlowType = {
  USER_PASSWORD_AUTH:"USER_PASSWORD_AUTH"
}


const signUp = async ({ name, email,password }) => {
    const command = new SignUpCommand({
      ClientId: process.env.AUTO_PARTS_COGNITO_CLIENT_ID,
      Username: email,
      Password: password,
      UserAttributes: [
        { Name: "email", Value: email },
        { Name: "name", Value: name }],
    });
  
    return cognitoClient.send(command);
  };

  const resendConfirmationCode = async ({ email }) => {
    const command = new ResendConfirmationCodeCommand({
      ClientId: process.env.AUTO_PARTS_COGNITO_CLIENT_ID,
      Username: email
    });
  
    await cognitoClient.send(command);

    return;
  };
  
  const confirmSignUp = async ({ email, code }) => {
    const command = new ConfirmSignUpCommand({
      ClientId: process.env.AUTO_PARTS_COGNITO_CLIENT_ID,
      Username: email,
      ConfirmationCode: code,
    });
  
    await cognitoClient.send(command);

    return;

  };


  const autoConfirmSignUp = async ({ email }) => {
    const command = new AdminConfirmSignUpCommand({
      UserPoolId: process.env.AUTO_PARTS_COGNITO_USER_POOL_ID,
      Username: email,
    });
  
    try {
      await cognitoClient.send(command);
      console.log(`User ${email} has been successfully confirmed by admin.`);
    } catch (error) {
      console.error(`Error confirming user by admin: ${error.message}`);
      throw error;
    }

  };

  const login = async ({ username, password }) => {
    const command = new InitiateAuthCommand({
      AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
      },
      ClientId:  process.env.AUTO_PARTS_COGNITO_CLIENT_ID,
    });
  
    await cognitoClient.send(command);

    return;
  };

  const deleteUser=async({email})=>{
    const input = { 
      UserPoolId: process.env.COGNITO_USER_POOL_ID,
      Username: email, 
    };
    const command = new AdminDeleteUserCommand(input);
   
    await  cognitoClient.send(command);

    return;
  }

  module.exports={
    signUp,
    confirmSignUp,
    resendConfirmationCode,
    login,
    deleteUser,
    autoConfirmSignUp

  }
  
  