// Check if we're in production mode via global variable
const isProduction = window.ENV === 'production';

const config = {
    development: {
        apiBaseUrl: 'http://localhost:8000/api',
        enablePasswordLogin: true,
        enableSmsLogin: false,
    },
    production: {
        apiBaseUrl: 'http://156.227.236.247:8080/api',
        enablePasswordLogin: true,
        enableSmsLogin: true,
    }
};

export default isProduction ? config.production : config.development; 