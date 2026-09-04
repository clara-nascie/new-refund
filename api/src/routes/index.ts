import { Router } from "express"

import { usersRoutes } from "./users-routes"
import { sessionsRoutes } from "./sessions-routes"
import { refundsRoutes } from "./refunds-routes"
import { uploadsRoutes } from "./uploads-routes"

import { ensureAuthenticated } from "@/middlewares/ensure-authenticated"

const routes = Router()

// Rotas publicas.
routes.use("/users", usersRoutes)
routes.use("/sessions", sessionsRoutes)

// Rotas privadas. O middleware entra por grupo, e nao solto no final: solto,
// ele respondia 401 tambem para caminho inexistente, escondendo o 404.
routes.use("/refunds", ensureAuthenticated, refundsRoutes)
routes.use("/uploads", ensureAuthenticated, uploadsRoutes)

export { routes }
