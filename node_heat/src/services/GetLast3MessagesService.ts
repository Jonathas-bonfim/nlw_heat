import prismaClient from "../prisma";


class GetLast3CreateMessagesService {
  async execute() {
    const messages = await prismaClient.message.findMany({
      take: 3,
      orderBy: {
        created_at: "desc"
      },
      include: {
        user: true
      }
    });

    return messages;
  }
}

export { GetLast3CreateMessagesService }