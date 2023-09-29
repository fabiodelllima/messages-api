interface IMessage {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
}

export type TMessageUpdateData = Partial<
  Pick<IMessage, 'title' | 'content'>
>;

/* 
interface IMessageUpdateData {
  title?: string;
  content?: string;
}
 */

