module.exports = {
  Query: {
    resumeSections: (parent, { id }, { prisma }) => {},
  },
  Mutation: {
    createSection: (parent, { title, resume }, { prisma }) => {
      if (title.length < 3) {
        throw new Error("Please enter minimum 3 characters");
      }
      return prisma.createSection({
        title,
        resume: { connect: { id: resume } },
      });
    },
    deleteSection: (parent, { id }, { prisma }) => {
      return prisma.deleteSection({ id });
    },
  },
  Section: {
    resume: () => {},
  },
};
