import { Request, Response } from 'express';
import format from 'pg-format';
import { client } from './database';
import { QueryConfig } from 'pg';
import { TMessageUpdateData } from './interfaces';

export const createMessage = async (
  req: Request,
  res: Response
) => {
  const date = new Date();

  const queryStr = `
    INSERT INTO messages (title, content, createdAt) 
    VALUES ($1, $2, $3)
    RETURNING *;
  `;

  const queryConfig: QueryConfig = {
    text: queryStr,
    values: [req.body.title, req.body.content, date],
  };

  const query = await client.query(queryConfig);

  res.status(200).json(query.rows[0]);
};

export const readMessages = async (
  req: Request,
  res: Response
) => {
  const querySearch = req.query.search;
  let queryConfig: string | QueryConfig;

  if (querySearch) {
    const search = '%' + querySearch + '%';

    queryConfig = format(
      `SELECT * FROM messages WHERE title ILIKE '%s';`,
      search
    );
  } else {
    queryConfig = `SELECT * FROM messages;`;
  }

  const query = await client.query(queryConfig);

  res
    .status(200)
    .json({ count: query.rowCount, messages: query.rows });
};

export const readOneMessage = async (
  req: Request,
  res: Response
) => {
  res.status(200).json(res.locals.message);
};

export const updateMessage = async (
  req: Request,
  res: Response
) => {
  const objData = {
    title: req.body.title,
    content: req.body.content,
  };

  const queryConfig = format(
    `UPDATE messages SET (%I) = ROW (%L) WHERE id = %L RETURNING *`,
    Object.keys(objData),
    Object.values(objData),
    req.params.id
  );

  const query = await client.query(queryConfig);

  return res.status(200).json(query);
};

export const updatePartialMessage = async (
  req: Request,
  res: Response
) => {
  let objData: TMessageUpdateData = {};

  Object.entries(req.body).forEach(([key, value]) => {
    if (key === 'title' || key === 'content') {
      if (typeof value === 'string') {
        objData[key] = value;
      }
    }
  });

  const queryConfig = format(
    `UPDATE messages SET (%I) = ROW (%L) WHERE id = %L RETURNING *;`,
    Object.keys(objData),
    Object.values(objData),
    req.params.id
  );

  const query = await client.query(queryConfig);

  return res.status(200).json(query);
};

export const deleteMessage = async (
  req: Request,
  res: Response
) => {
  const queryStr = `DELETE FROM messages WHERE id = $1;`;

  const queryConfig: QueryConfig = {
    text: queryStr,
    values: [req.params.id],
  };

  await client.query(queryConfig);

  res.status(204).json();
};
