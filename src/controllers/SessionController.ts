import { Request, Response } from "express";
import AuthenticateUserService from "../services/AuthenticateUserService";

class SessionController {
  async store(request: Request, response: Response) {
    try {
      const { email, password } = request.body

      const authenticateUser = new AuthenticateUserService()

      const webtoken = await authenticateUser.execute(email, password)

      return response.json(webtoken)
    }
   catch (err) {
     return response.status(400).json({error: err.message})  
   }
    
  }
}

export default SessionController