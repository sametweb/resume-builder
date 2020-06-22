module.exports = {
  Query: {
    sectionBlocks: (parent, { section }, { prisma }) => {
      //   return prisma.section({ id: section }).blocks();
    },
  },
  Mutation: {
    createBlock: (parent, args, { prisma }) => {
      const { title1, title2, subtitle1, subtitle2, section } = args;

      return prisma.createBlock({
        title1,
        title2,
        subtitle1,
        subtitle2,
        section: { connect: { id: section } },
      });
    },
  },
};
