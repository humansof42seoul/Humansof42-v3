import * as bcrypt from "bcrypt";
import { bcryptConstants } from "./constants";

export async function hashedPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, bcryptConstants.saltOrRounds);
}
