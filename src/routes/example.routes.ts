import { Router } from 'express';
import ExampleController from '../controllers/example.controller';

class ExampleRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', ExampleController.getExample);
    this.router.post('/', ExampleController.postExample);
  }
}

export default new ExampleRoutes().router;