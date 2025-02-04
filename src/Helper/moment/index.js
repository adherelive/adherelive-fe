import moment from "moment";
import "moment-timezone";
import { createLogger } from '../../config/logger';

const momentObj = moment;
const logger = createLogger('Helper > Moment');

export const setTimeZone = (timeZone = "Asia/Kolkata") => {
    logger.info("Moment Object -> momentObj().format(): ", momentObj.tz);
    momentObj.tz.setDefault(timeZone);
};
export default momentObj;
