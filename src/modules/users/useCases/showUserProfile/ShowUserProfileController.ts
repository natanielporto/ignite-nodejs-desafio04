import { Request, Response } from "express";

import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

class ShowUserProfileController {
  constructor(private showUserProfileUseCase: ShowUserProfileUseCase) {}

  handle(request: Request, response: Response): Response {
    try {
      const { user_id } = request.params;

      const user = this.showUserProfileUseCase.execute({
        user_id,
      });

      return response.json(user);
    } catch (err) {
      if (err.message === "User not found.") {
        return response.status(404).json({ error: err.message });
      }
      return response.status(400).json({
        error: err.message,
      });
    }
  }
}

export { ShowUserProfileController };
