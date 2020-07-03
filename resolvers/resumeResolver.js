module.exports = {
  Query: {
    userResumes: async (parent, { user }, { prisma }) => {
      const resumes = prisma.resumes({ where: { user } });
      return prisma.resumes({ where: { user } });
    },
    resumeById: async (parent, { id, user }, { prisma }) => {
      const resume = await prisma.resume({ id });
      if (resume.user !== user) {
        throw new Error(`User not authorized to see other's resumes`);
      }
      return resume;
    },
  },
  Mutation: {
    createResume: (parent, { title, user }, { prisma }) => {
      if (title.length < 3) {
        throw new Error("Please enter minimum 3 characters");
      }
      return prisma.createResume({ title, user });
    },
    updateResume: (parent, { id, title }, { prisma }) => {
      if (title.length < 3) {
        throw new Error("Please enter minimum 3 characters");
      }
      return prisma.updateResume({ data: { title }, where: { id } });
    },
    deleteResume: (parent, { id }, { prisma }) => {
      return prisma.deleteResume({ id });
    },
  },
  Resume: {
    sections: ({ id }, args, { prisma }) => {
      return prisma.resume({ id }).sections();
    },
  },
};
