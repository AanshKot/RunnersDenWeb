import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "us-east-2_ZVqjaudrp",
    ClientId: "2rcocbqnael2bocab1a9d55nmm"
}

export default new CognitoUserPool(poolData);
