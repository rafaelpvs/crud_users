import type User from "../models/User";
import type UserRepository from "../repositories/UserRepository";

export default class {
  private userRepository: UserRepository;
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  getAll(): Promise<User[]> {
    return this.userRepository.getAll();
  }
  remove(id: number) {
    return this.userRepository.remove(id);
  }

  create(user: User) {
    return this.userRepository.create(user);
  }
  update(user: User) {
    return this.userRepository.update(user);
  }

  get(id: number) {
    return this.userRepository.get(id);
  }
}
