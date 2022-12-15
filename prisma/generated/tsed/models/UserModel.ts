import { User } from "../client";
import { Required, Property, Format, CollectionOf } from "@tsed/schema";
import { SentMailModel } from "./SentMailModel";
import { MailModel } from "./MailModel";

export class UserModel implements User {
  @Property(String)
  @Required()
  id: string;

  @Property(String)
  @Required()
  email: string;

  @Property(Date)
  @Format("date-time")
  @Required()
  createdAt: Date;

  @Property(Date)
  @Format("date-time")
  @Required()
  updatedAt: Date;

  @CollectionOf(() => SentMailModel)
  @Required()
  sent: SentMailModel[];

  @CollectionOf(() => MailModel)
  @Required()
  inbox: MailModel[];
}

