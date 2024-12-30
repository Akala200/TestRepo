import dotenv from 'dotenv';
import App from './app';

dotenv.config();

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

const app = new App(PORT);
app.listen();