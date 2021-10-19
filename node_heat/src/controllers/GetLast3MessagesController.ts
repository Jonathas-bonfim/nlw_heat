import { Request, Response } from 'express';
import { GetLast3CreateMessagesService } from '../services/GetLast3MessagesService';


class GetLast3MessagesController {
  async handle(request: Request, response: Response) {
    const service = new GetLast3CreateMessagesService();

    const result = await service.execute();

    return response.json(result);

  }
}

export { GetLast3MessagesController }