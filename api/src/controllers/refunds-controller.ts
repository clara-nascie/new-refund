import { AppError } from "@/utils/AppError"
import { Request, Response } from "express"
import { prisma } from "@/database/prisma"
import { z } from "zod"

const CategoriesEnum = z.enum([
  "food",
  "others",
  "services",
  "transport",
  "accommodation",
])

class RefundsController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      name: z.string().min(1),
      category: CategoriesEnum,
      amount: z.number().positive(),
      filename: z.string().min(20),
    })

    const { name, category, amount, filename } = bodySchema.parse(request.body)

    if (!request.user?.id) {
      throw new AppError("Não autorizado", 401)
    }

    const refund = await prisma.refunds.create({
      data: {
        name,
        category,
        amount,
        filename,
        userId: request.user.id,
      },
    })

    response.status(201).json(refund)
  }

  async index(request: Request, response: Response) {
    const querySchema = z.object({
      name: z.string().optional().default(""),
      page: z.coerce.number().optional().default(1),
      perPage: z.coerce.number().optional().default(10),
    })

    const { name, page, perPage } = querySchema.parse(request.query)

    // Calcular os valores de 'skip' e 'take'
    const skip = (page - 1) * perPage

    // O mesmo filtro precisa valer para a busca e para a contagem: contar sem
    // ele fazia a paginação prometer páginas que voltavam vazias.
    const where = {
      user: {
        name: {
          contains: name.trim(),
        },
      },
    }

    const refunds = await prisma.refunds.findMany({
      skip,
      take: perPage,
      where,
      orderBy: { createdAt: "desc" },
      // Só o nome. Com `include: { user: true }` a resposta levava o registro
      // inteiro do usuário, hash da senha incluído.
      include: { user: { select: { name: true } } },
    })

    // Obter o total de registros para calcular o número de páginas
    const totalRecords = await prisma.refunds.count({ where })
    const totalPages = Math.ceil(totalRecords / perPage)

    response.json({
      refunds,
      pagination: {
        page,
        perPage,
        totalRecords,
        totalPages: totalPages > 0 ? totalPages : 1,
      },
    })
  }

  async show(request: Request, response: Response) {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const refund = await prisma.refunds.findFirst({
      where: { id },
      include: { user: { select: { name: true } } },
    })

    if (!refund) {
      throw new AppError("Reembolso não encontrado", 404)
    }

    // Estar autenticado não basta: sem conferir o dono, bastava trocar o id na
    // URL para ler o reembolso de outra pessoa. O gestor enxerga todos.
    if (request.user?.role !== "manager" && refund.userId !== request.user?.id) {
      throw new AppError("Não autorizado", 403)
    }

    response.json(refund)
  }
}

export { RefundsController }
