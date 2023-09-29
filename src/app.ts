import 'dotenv/config';
import express from 'express';
import { connectDatabase } from './database';
import { messagesRoutes } from './routers/messages.routes';

const app = express();
const PORT = 3000;
// const PORT = process.env.PORT;

app.use(express.json());
app.use('/messages', messagesRoutes);

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await connectDatabase();
});
