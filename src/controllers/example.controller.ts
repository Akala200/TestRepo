import { Request, Response } from 'express';

class ExampleController {
  public getExample(req: Request, res: Response): void {
    res.status(200).send({ message: 'Hello, world!' });
  }

  public postExample(req: Request, res: Response): void {
    const { data } = req.body;
    res.status(201).send({ message: `You sent: ${data}` });
  }
}

export default new ExampleController();