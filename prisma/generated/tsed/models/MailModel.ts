import { Mail } from "../client";
import { Required, Property, Allow, Format, CollectionOf } from "@tsed/schema";
import { UserModel } from "./UserModel";
import { SentMailModel } from "./SentMailModel";

export class MailModel implements Mail {
  @Property(String)
  @Required()
  id: string;

  @Property(String)
  @Allow(null)
  subject: string | null;

  @Property(Boolean)
  @Allow(null)
  attachment: boolean | null;

  @Property(Date)
  @Format("date-time")
  @Required()
  createdAt: Date;

  @CollectionOf(() => UserModel)
  @Required()
  to: UserModel[];

  @Property(() => SentMailModel)
  @Allow(null)
  from: SentMailModel | null;
}

