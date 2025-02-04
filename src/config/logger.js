// utils/logger.js
import config from "../config";

const logger = {
    isLoggingEnabled: config.REACT_APP_ENV !== 'production', // Enabled by default in dev
};

// Override console.log
const originalConsoleLog = console.log;
console.log = (...args) => {
    if (logger.isLoggingEnabled) {
        originalConsoleLog(...args);
    }
};

// Toggle function
logger.toggleLogging = (enabled) => {
    localStorage.setItem('debugLogsEnabled', enabled);
    logger.isLoggingEnabled = enabled;
};

// Initialize from storage
const savedPreference = localStorage.getItem('debugLogsEnabled');
if (savedPreference !== null) {
    logger.isLoggingEnabled = savedPreference === 'true';
}

export default logger;