import { Controller, Inject } from "@tsed/di";
import { PathParams } from "@tsed/platform-params";
import { UserModel, UsersRepository } from "prisma/generated/tsed";
import { Get, Returns } from "@tsed/schema";

@Controller("/user")
export class UsersController {
  @Inject()
  protected service: UsersRepository;

  @Get("/")
  @Returns(200, Array).Of(UserModel)
  async getAllUsers(): Promise<UserModel[]> {
    return this.service.findMany();
  }

  @Get("/:id")
  @Returns(200, UserModel)
  async getUser(@PathParams("id") id: string): Promise<UserModel | null> {
    return this.service.findFirst({ where: { id } });
  }
}
