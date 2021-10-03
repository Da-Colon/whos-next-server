import express from "express";
// const ERROR_STATUS_CODES: any = {
//   BAD_REQUEST: 400,
//   UNAUTHORIZED: 401,
//   FORBIDDEN: 403,
//   NOT_FOUND: 404,
//   UNKNOWN: 500,
// };

export const ERROR_TYPES: any = {
  BAD_REQUEST: "BAD_REQUEST",
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",
  NOT_FOUND: "NOT_FOUND",
  UNKNOWN: "UNKNOWN",
};

const handleError = (type: string, name: string | null, customMsg?: string) => {
  switch (type) {
    case ERROR_TYPES.BAD_REQUEST:
      throw new Error(customMsg || `There is an error in the request`);
    case ERROR_TYPES.NOT_FOUND:
      throw new Error(customMsg || `${name || "Resource"} not found`);
    default:
      throw new Error(customMsg || `There was an unknown server error`);
  }
};

export const errors = (app: express.Application) => {
  app.use((error: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    res.status(error.status).json({ errors: error.message });
  });
};

const serverError = (message: string) => ({
  status: 500,
  message: { unknown: [message] },
});

export const otherError = (reject: any) => {
  return (error: any) => {
    reject(serverError(error.message));
  };
};

export const catchError = (next: express.NextFunction) => {
  return (error: any) => {
    const defaultError = serverError("an unknown error occurred");
    const combinedError = { ...defaultError, ...error };
    next({ status: combinedError.status, message: combinedError.message });
  };
};

export default handleError;
