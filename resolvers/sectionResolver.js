module.exports = {
  Query: {
    resumeSections: (parent, { id }, { prisma }) => {},
  },
  Mutation: {
    createSection: (parent, { title, resume, order }, { prisma }) => {
      if (title.length < 3) {
        throw new Error("Please enter minimum 3 characters");
      }
      return prisma.createSection({
        title,
        resume: { connect: { id: resume } },
        order,
      });
    },
    updateSectionOrder: async (parent, args, { prisma }) => {
      const { id, resume_id, order, new_order } = args;

      const allSections = await prisma.sections({
        where: { resume: { id: resume_id } },
      });

      if (order > new_order) {
        allSections.forEach(async (section) => {
          if (section.order >= new_order && section.order < order) {
            await prisma.updateSection({
              where: { id: section.id },
              data: { order: section.order + 1 },
            });
          }
        });
      } else if (order < new_order) {
        allSections.forEach(async (section) => {
          if (section.order > order && section.order <= new_order) {
            await prisma.updateSection({
              where: { id: section.id },
              data: { order: section.order - 1 },
            });
          }
        });
      }

      return prisma.updateSection({
        where: { id },
        data: { order: new_order },
      });
    },
    deleteSection: async (parent, { id }, { prisma }) => {
      const orderToBeDeleted = await prisma.section({ id }).order();
      const orderGt = await prisma.sections({
        where: { order_gt: orderToBeDeleted },
      });
      orderGt.forEach(async (section) => {
        await prisma.updateSection({
          where: { id: section.id },
          data: { order: section.order - 1 },
        });
      });

      return prisma.deleteSection({ id });
    },
  },
  Section: {
    resume: () => {},
    blocks: ({ id }, args, { prisma }) => {
      return prisma.section({ id }).blocks();
    },
  },
};
