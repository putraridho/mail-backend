import { Property, CollectionOf, Allow } from "@tsed/schema";
import { MailModel } from "prisma/generated/tsed";

export class GetAllMailsRes {
  @Property(Number)
  page: number;

  @Property(Number)
  total: number;

  @CollectionOf(() => MailModel)
  @Allow(null)
  data?: MailModel[];
}
