module.exports = {
  Query: {},
  Mutation: {
    createBullet: (parent, args, { prisma }) => {
      const { text, order, block } = args;
      return prisma.createBullet({
        text,
        order,
        block: { connect: { id: block } },
      });
    },
  },
};
