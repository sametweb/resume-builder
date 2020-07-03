module.exports = {
  Query: {
    sectionBlocks: async (parent, { section: id }, { prisma }) => {
      const section = await prisma.section({ id });
      const blocks = await prisma.section({ id }).blocks();

      return { section: section.title, blocks: blocks || [] };
    },
  },
  Mutation: {
    createBlock: (parent, args, { prisma }) => {
      const { title1, title2, subtitle1, subtitle2, section, order } = args;

      return prisma.createBlock({
        title1,
        title2,
        subtitle1,
        subtitle2,
        order,
        section: { connect: { id: section } },
      });
    },
  },
  Block: {
    bullets: (parent, args, { prisma }) => {
      return prisma.block({ id: parent.id }).bullets();
    },
  },
};
