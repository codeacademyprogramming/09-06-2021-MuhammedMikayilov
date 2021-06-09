import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { NextFunction } from "express";

const comparePassword = (password: string, hashedPassword: string) => {
  return bcrypt.compareSync(password, hashedPassword);
};

async function requiredAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token) {
    try {
      const userPayload = await verify(token, "loginmymusicapp");
      if (userPayload) {
        next();
      }
    } catch (err) {
      res.status(401).json({ errors: err.message });
    }
  } else {
    res.status(401).json({
      errors: ["Not Allowed"],
    });
  }
}

export { comparePassword, requiredAuth };
