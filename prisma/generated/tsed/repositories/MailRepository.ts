import { isArray } from "@tsed/core";
import { deserialize } from "@tsed/json-mapper";
import { Injectable, Inject } from "@tsed/di";
import { PrismaService } from "../services/PrismaService";
import { Prisma, Mail } from "../client";
import { MailModel } from "../models";

@Injectable()
export class MailRepository {
  @Inject()
  protected prisma: PrismaService;

  get collection() {
    return this.prisma.mail
  }

  get groupBy() {
    return this.collection.groupBy.bind(this.collection)
  }

  protected deserialize<T>(obj: null | Mail | Mail[]): T {
    return deserialize<T>(obj, { type: MailModel, collectionType: isArray(obj) ? Array : undefined })
  }

  async findUnique(args: Prisma.MailFindUniqueArgs): Promise<MailModel | null> {
    const obj = await this.collection.findUnique(args);
    return this.deserialize<MailModel | null>(obj);
  }

  async findFirst(args: Prisma.MailFindFirstArgs): Promise<MailModel | null> {
    const obj = await this.collection.findFirst(args);
    return this.deserialize<MailModel | null>(obj);
  }

  async findMany(args?: Prisma.MailFindManyArgs): Promise<MailModel[]> {
    const obj = await this.collection.findMany(args);
    return this.deserialize<MailModel[]>(obj);
  }

  async create(args: Prisma.MailCreateArgs): Promise<MailModel> {
    const obj = await this.collection.create(args);
    return this.deserialize<MailModel>(obj);
  }

  async update(args: Prisma.MailUpdateArgs): Promise<MailModel> {
    const obj = await this.collection.update(args);
    return this.deserialize<MailModel>(obj);
  }

  async upsert(args: Prisma.MailUpsertArgs): Promise<MailModel> {
    const obj = await this.collection.upsert(args);
    return this.deserialize<MailModel>(obj);
  }

  async delete(args: Prisma.MailDeleteArgs): Promise<MailModel> {
    const obj = await this.collection.delete(args);
    return this.deserialize<MailModel>(obj);
  }

  async deleteMany(args: Prisma.MailDeleteManyArgs) {
    return this.collection.deleteMany(args)
  }

  async updateMany(args: Prisma.MailUpdateManyArgs) {
    return this.collection.updateMany(args)
  }

  async aggregate(args: Prisma.MailAggregateArgs) {
    return this.collection.aggregate(args)
  }
}
