export const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.sendStatus = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

export const mockRequest = () => {
  const req: any = {};
  req.params = jest.fn().mockReturnValue(req);
  return req;
};

export const mockNext = () => {
  return jest.fn();
};
