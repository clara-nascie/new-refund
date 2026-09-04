import express from "express"
import "express-async-errors"
import cors from "cors"

import { routes } from "./routes"
import { errorHandling } from "./middlewares/error-handling"
import uploadConfig from "@/configs/upload"

const app = express()
app.use(cors())
app.use(express.json())

app.use("/uploads", express.static(uploadConfig.UPLOADS_FOLDER))

app.use(routes)

// Caminho que nao casa com nenhuma rota responde 404 em JSON, no mesmo
// formato dos outros erros, em vez do HTML padrao do Express.
app.use((_request, response) => {
  response.status(404).json({ message: "Rota nao encontrada" })
})

app.use(errorHandling)

export { app }
