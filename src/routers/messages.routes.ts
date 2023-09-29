import { Router } from 'express';
import { isMessageIdValid } from '../middlewares/isMessageIdValid';
import { createMessageSchema } from '../schemas/createMessage.schema';
import { bodyValidator } from '../middlewares/bodyValidator';
import { updatePartialMessageSchema } from '../schemas/updatePartialMessage.schema';
import { updateMessageSchema } from '../schemas/updateMessage.schema';
import {
  createMessage,
  readOneMessage,
  readMessages,
  updateMessage,
  deleteMessage,
  updatePartialMessage,
} from '../logic';

export const messagesRoutes = Router();

messagesRoutes.get('/', readMessages);

messagesRoutes.get('/:id', isMessageIdValid, readOneMessage);

messagesRoutes.post(
  '/',
  bodyValidator(createMessageSchema),
  createMessage
); // messagesRoutes.post('/', isCreateBodyValid, createMessage);

messagesRoutes.patch(
  '/:id',
  bodyValidator(updatePartialMessageSchema),
  updatePartialMessage
); // messagesRoutes.patch('/:id', isMessageIdValid, updatePartialMessage);

messagesRoutes.put(
  '/:id',
  bodyValidator(updateMessageSchema),
  isMessageIdValid,
  updateMessage
);

messagesRoutes.delete('/:id', isMessageIdValid, deleteMessage);
