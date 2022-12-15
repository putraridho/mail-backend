import { isArray } from "@tsed/core";
import { deserialize } from "@tsed/json-mapper";
import { Injectable, Inject } from "@tsed/di";
import { PrismaService } from "../services/PrismaService";
import { Prisma, SentMail } from "../client";
import { SentMailModel } from "../models";

@Injectable()
export class SentMailsRepository {
  @Inject()
  protected prisma: PrismaService;

  get collection() {
    return this.prisma.sentMail
  }

  get groupBy() {
    return this.collection.groupBy.bind(this.collection)
  }

  protected deserialize<T>(obj: null | SentMail | SentMail[]): T {
    return deserialize<T>(obj, { type: SentMailModel, collectionType: isArray(obj) ? Array : undefined })
  }

  async findUnique(args: Prisma.SentMailFindUniqueArgs): Promise<SentMailModel | null> {
    const obj = await this.collection.findUnique(args);
    return this.deserialize<SentMailModel | null>(obj);
  }

  async findFirst(args: Prisma.SentMailFindFirstArgs): Promise<SentMailModel | null> {
    const obj = await this.collection.findFirst(args);
    return this.deserialize<SentMailModel | null>(obj);
  }

  async findMany(args?: Prisma.SentMailFindManyArgs): Promise<SentMailModel[]> {
    const obj = await this.collection.findMany(args);
    return this.deserialize<SentMailModel[]>(obj);
  }

  async create(args: Prisma.SentMailCreateArgs): Promise<SentMailModel> {
    const obj = await this.collection.create(args);
    return this.deserialize<SentMailModel>(obj);
  }

  async update(args: Prisma.SentMailUpdateArgs): Promise<SentMailModel> {
    const obj = await this.collection.update(args);
    return this.deserialize<SentMailModel>(obj);
  }

  async upsert(args: Prisma.SentMailUpsertArgs): Promise<SentMailModel> {
    const obj = await this.collection.upsert(args);
    return this.deserialize<SentMailModel>(obj);
  }

  async delete(args: Prisma.SentMailDeleteArgs): Promise<SentMailModel> {
    const obj = await this.collection.delete(args);
    return this.deserialize<SentMailModel>(obj);
  }

  async deleteMany(args: Prisma.SentMailDeleteManyArgs) {
    return this.collection.deleteMany(args)
  }

  async updateMany(args: Prisma.SentMailUpdateManyArgs) {
    return this.collection.updateMany(args)
  }

  async aggregate(args: Prisma.SentMailAggregateArgs) {
    return this.collection.aggregate(args)
  }
}
