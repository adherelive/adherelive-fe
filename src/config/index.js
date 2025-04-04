export default {
    REACT_APP_ENV: process.env.REACT_APP_ENV,
    WEB_URL: process.env.REACT_APP_WEB_URL,
    GETSTREAM_API_KEY: process.env.REACT_APP_GETSTREAM_API_KEY,
    GETSTREAM_APP_ID: process.env.REACT_APP_GETSTREAM_APP_ID,
    CHANNEL_SERVER: process.env.REACT_APP_TWILIO_CHANNEL_SERVER,
    algolia: {
        app_id: process.env.REACT_APP_ALGOLIA_APP_ID,
        app_key: process.env.REACT_APP_ALGOLIA_APP_KEY,
        medicine_index: process.env.REACT_APP_MEDICINE_INDEX,
    },
    ADHERE_LIVE_CONTACT_LINK: process.env.REACT_APP_ADHERE_LIVE_CONTACT_LINK,
    mail: {
        LOGIN_CONTACT_MESSAGE: process.env.REACT_APP_LOGIN_CONTACT_MESSAGE,
        VERIFICATION_PENDING_MESSAGE: process.env.REACT_APP_VERIFICATION_PENDING_MESSAGE,
    },
    BACKEND_URL: process.env.REACT_APP_BACKEND_URL,
    REACT_APP_ADMIN_MEDICINE_ONE_PAGE_LIMIT: process.env.REACT_APP_ADMIN_MEDICINE_ONE_PAGE_LIMIT,
    REACT_APP_PATIENT_TABLE_ONE_PAGE_LIMIT: process.env.REACT_APP_PATIENT_TABLE_ONE_PAGE_LIMIT,
    AGORA_APP_ID: process.env.REACT_APP_AGORA_APP_ID,
    NOTIFICATION_ONE_TIME_LIMIT: process.env.REACT_APP_NOTIFICATION_ONE_TIME_LIMIT,
    REACT_APP_NOTIFICATION_ONE_TIME_LIMIT: process.env.REACT_APP_NOTIFICATION_ONE_TIME_LIMIT,
    FIREBASE_CHANNEL: process.env.REACT_APP_FIREBASE_CHANNEL,
};
