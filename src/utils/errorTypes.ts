import statusCodes from './statusCodes';

const errorTypes = {
  INVALID_VALUE: statusCodes.BAD_REQUEST,
  INVALID_USER: statusCodes.UNAUTHORIZED,
  INTERNAL_SERVER_ERROR: statusCodes.INTERNAL_SERVER_ERROR,
};

export default errorTypes;
