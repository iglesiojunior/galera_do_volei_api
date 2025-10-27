import express from 'express';
import { userRouter } from './userRoutes.js';
import { matchRouter } from './matchRoutes.js';
import { inviteRouter } from './inviteRoutes.js';

const app = express();
app.use(express.json());

// Routes
app.use('/', userRouter);
app.use('/', matchRouter);
app.use('/', inviteRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

export { app };