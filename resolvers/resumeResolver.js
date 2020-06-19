module.exports = {
  Query: {
    userResumes: (parent, { user }, { prisma }) => {
      return prisma.resumes({ where: { user } });
    },
  },
  Mutation: {
    createResume: (parent, { title, user }, { prisma }) => {
      if (title.length < 3) {
        throw new Error("Please enter minimum 3 characters");
      }
      return prisma.createResume({ title, user });
    },
    deleteResume: (parent, { id }, { prisma }) => {
      return prisma.deleteResume({ id });
    },
  },
};
