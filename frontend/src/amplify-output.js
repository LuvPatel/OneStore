const amplifyOutput = {
    "aws_project_region": process.env.REACT_APP_REGION,
    "aws_cognito_region": process.env.REACT_APP_REGION,
    "aws_user_pools_id": process.env.REACT_APP_USER_POOL_ID,
    "aws_user_pools_web_client_id": process.env.REACT_APP_CLIENT_ID,
};
export default amplifyOutput;