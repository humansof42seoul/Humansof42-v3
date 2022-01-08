import * as bcrypt from "bcrypt";
import { BCRYPT } from "./constants";

export async function hashedPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, BCRYPT.SALTORROUNDS);
}
