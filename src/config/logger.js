// file: src/config/logger.js
import React, {Component, Fragment} from "react";
import {injectIntl} from "react-intl";
import moment from "moment";

const LOG_LEVELS = {
    ERROR: 0,
    WARN: 1,
    INFO: 2,
    DEBUG: 3
};

const CONFIG = {
    environment: process.env.REACT_APP_ENV || 'production',
    logEndpoint: process.env.REACT_APP_LOG_ENDPOINT || '/api/logs',
    applicationName: process.env.REACT_APP_NAME || 'AdhereLive-Frontend',
    // Set this to match your backend's log level
    logLevel: process.env.REACT_APP_LOG_LEVEL ||
        (process.env.REACT_APP_ENV === 'development' ? LOG_LEVELS.DEBUG : LOG_LEVELS.WARN)
};

class ReactLogger {
    constructor(componentName) {
        this.source = componentName;
        this.sessionId = this.generateSessionId();
    }

    generateSessionId() {
        return `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }

    shouldLog(level) {
        return level <= CONFIG.logLevel;
    }

    async sendToServer(level, message, meta = {}) {
        if (CONFIG.environment === 'production') {
            try {
                const logData = {
                    timestamp: new Date().toISOString(),
                    level,
                    message,
                    source: this.source,
                    sessionId: this.sessionId,
                    userAgent: navigator.userAgent,
                    url: window.location.href,
                    ...meta
                };

                // Send log to backend asynchronously
                await fetch(CONFIG.logEndpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        // Add any auth headers your API requires
                        // 'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(logData)
                });
            } catch (error) {
                // Fallback to console in case of network error
                console.error('Failed to send log to server:', error);
            }
        }
    }

    formatMessage(message, meta = {}) {
        return typeof message === 'string' ? message : JSON.stringify(message, null, 2);
    }

    debug(message, meta = {}) {
        if (!this.shouldLog(LOG_LEVELS.DEBUG)) return;

        const formattedMessage = this.formatMessage(message, meta);
        console.debug(`[${this.source}] ${formattedMessage}`, meta);
    }

    info(message, meta = {}) {
        if (!this.shouldLog(LOG_LEVELS.INFO)) return;

        const formattedMessage = this.formatMessage(message, meta);
        console.info(`[${this.source}] ${formattedMessage}`, meta);
        this.sendToServer('info', formattedMessage, meta);
    }

    warn(message, meta = {}) {
        if (!this.shouldLog(LOG_LEVELS.WARN)) return;

        const formattedMessage = this.formatMessage(message, meta);
        console.warn(`[${this.source}] ${formattedMessage}`, meta);
        this.sendToServer('warn', formattedMessage, meta);
    }

    error(message, meta = {}) {
        const formattedMessage = this.formatMessage(message, meta);
        console.error(`[${this.source}] ${formattedMessage}`, meta);
        this.sendToServer('error', formattedMessage, meta);
    }

    // Special method for component lifecycle logging
    lifecycle(message, meta = {}) {
        if (!this.shouldLog(LOG_LEVELS.DEBUG)) return;

        console.log(`[${this.source}] 🔄 ${message}`, meta);
    }
}

// Higher-order component for automatic component logging
export const withLogging = (WrappedComponent) => {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.logger = new ReactLogger(WrappedComponent.displayName || WrappedComponent.name);
        }

        componentDidMount() {
            this.logger.lifecycle('Component mounted');
        }

        componentDidUpdate(prevProps) {
            this.logger.lifecycle('Component updated', {
                prevProps,
                newProps: this.props
            });
        }

        componentWillUnmount() {
            this.logger.lifecycle('Component will unmount');
        }

        componentDidCatch(error, info) {
            this.logger.error('Component error', { error, info });
        }

        render() {
            return <WrappedComponent {...this.props} logger={this.logger} />;
        }
    };
};

// Create logger instance
export const createLogger = (componentName) => new ReactLogger(componentName);

// Export a default logger for general use
export const logger = new ReactLogger('App');