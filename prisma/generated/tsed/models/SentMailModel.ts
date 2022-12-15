import { SentMail } from "../client";
import { Integer, Required, Property } from "@tsed/schema";
import { UserModel } from "./UserModel";
import { MailModel } from "./MailModel";

export class SentMailModel implements SentMail {
  @Property(Number)
  @Integer()
  @Required()
  id: number;

  @Property(() => UserModel)
  @Required()
  user: UserModel;

  @Property(String)
  @Required()
  userId: string;

  @Property(() => MailModel)
  @Required()
  mail: MailModel;

  @Property(String)
  @Required()
  mailId: string;
}

