export const successResponse = (res, data, message = 'Success', statusCode = 200) => {
  return res.status(statusCode).json(data);
};

export const errorResponse = (res, message = 'Internal Server Error', statusCode = 500, errors = null) => {
  return res.status(statusCode).json({
    success: false,
    message,
    ...(errors && { errors })
  });
};
