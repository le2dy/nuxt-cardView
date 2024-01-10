import prisma from '../../../prisma/context';

export default defineEventHandler(async (event) => {
  if (event.node.req.method === 'GET') {
    const { startDate, endDate } = await getQuery(event);

    const card_data = await prisma.performance_test.findMany({
      where: {
        create_datetime: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      },
    });

    return { result: card_data };
  }
  if (event.node.req.method === 'POST') {
    console.log(await readBody(event));
    const { title, content, writer } = await readBody(event);

    await prisma.performance_test.create({
      data: {
        title: title,
        content: content,
        writer: writer,
        create_datetime: new Date(),
      },
    });
    return { msg: 'success' };
  }
});
