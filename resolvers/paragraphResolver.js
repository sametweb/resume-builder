module.exports = {
  Query: {
    sectionParagraph: (parent, { section: id }, { prisma }) => {
      return prisma.section({ id }).paragraph();
    },
  },
  Mutation: {
    createParagraph: (parent, args, { prisma }) => {
      const { text, section } = args;
      return prisma.createParagraph({
        text,
        section: { connect: { id: section } },
      });
    },
  },
  Paragraph: {
    section: (parent, args, { prisma }) => {
      prisma.paragraph({ id: parent.id }).section();
    },
  },
};
