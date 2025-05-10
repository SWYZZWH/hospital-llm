// Login configuration
const loginConfig = {
    // Enable or disable password login
    enablePasswordLogin: true,
    
    // Enable or disable SMS login
    enableSmsLogin: true,
    
    // API endpoints
    apiEndpoints: {
        passwordLogin: 'http://localhost:8000/api/accounts/login/',
        sendSmsCode: 'http://localhost:8000/api/users/send_verification_code/',
        verifySmsCode: 'http://localhost:8000/api/users/verify_code/'
    }
};

// Export the configuration
export default loginConfig; 