import { Prisma, PrismaClient } from "@prisma/client";
import { Controller, Inject } from "@tsed/di";
import { QueryParams } from "@tsed/platform-params";
import { Get, Returns } from "@tsed/schema";
import { MailRepository } from "prisma/generated/tsed";
import { GetAllMailsRes } from "src/models/MailsModel";

let prisma = new PrismaClient();

@Controller("/mail")
export class MailsController {
  @Inject()
  protected service: MailRepository;

  @Get("/")
  @Returns(200, GetAllMailsRes)
  async getAll(
    @QueryParams("page") page: number = 0,
    @QueryParams("size") size: number = 50,
    @QueryParams("sort") sort: "asc" | "desc" = "desc",
    @QueryParams("sortBy") sortBy: "from" | "createdAt" = "createdAt",
    @QueryParams("from") from?: Date,
    @QueryParams("to") to?: Date
  ): Promise<GetAllMailsRes> {
    let params: Prisma.MailFindManyArgs = {
      skip: page * size,
      take: size,
      orderBy:
        sortBy == "from"
          ? { from: { user: { email: sort } } }
          : { [sortBy]: sort },
      include: { from: { include: { user: true } }, to: true },
    };

    if (from || to) {
      params.where = {
        createdAt: {
          lte: to,
          gte: from,
        },
      };
    }

    return {
      page,
      total: Number(
        (await prisma.mail.count({
          where: {
            createdAt: {
              lte: to,
              gte: from,
            },
          },
        })) || 0
      ),
      data: await this.service.findMany(params),
    };
  }
}
