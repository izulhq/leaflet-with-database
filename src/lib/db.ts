import { prisma } from "./prisma";

interface EntryInput {
  name: string;
  latitude: number;
  longitude: number;
  description: string;
}

export const db = {
  async insertEntry(data: EntryInput) {
    return await prisma.entry.create({
      data,
    });
  },

  async getAllEntries() {
    return await prisma.entry.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  },
};
