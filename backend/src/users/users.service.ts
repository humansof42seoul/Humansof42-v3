import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { hashedPassword } from "./utils/bcrypt";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) { }

  async create(createUserDto: CreateUserDto): Promise<void> {
    const password = await hashedPassword(createUserDto.password);
    const newUser: User = this.usersRepository.create({
      email: createUserDto.email,
      nickname: createUserDto.nickname,
      profile: createUserDto.profile,
      role: createUserDto.role,
      password: password,
      created_at: new Date(),
      modified_at: new Date(),
    });
    await this.usersRepository.insert(newUser);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user: User = await this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`${id} not found.`);
    }
    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user: User = await this.usersRepository.findOne({ email });
    if (!user) {
      throw new NotFoundException(`${email} not found.`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<void> {
    await this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.softDelete({ id });
  }
}
