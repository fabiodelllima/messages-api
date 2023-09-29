import { QueryConfig } from 'pg';
import { NextFunction, Request, Response } from 'express';
import { client } from '../database';

export const isMessageIdValid = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const queryStr = `SELECT * FROM messages WHERE id = $1;`;

  const queryConfig: QueryConfig = {
    text: queryStr,
    values: [req.params.id],
  };

  const query = await client.query(queryConfig);

  if (query.rowCount === 0) {
    res.status(404).json('Message not found.');
  }

  res.locals.message = query.rows[0];

  return next();
};
