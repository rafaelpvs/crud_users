import type { UserPagination } from "@/models/UserPagination";
import type User from "@/models/User";
import type { PaginationParams, UserRepository } from "@/repositories/UserRepository";

export default class {
  private userRepository: UserRepository;
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  getAll(params: PaginationParams): Promise<UserPagination> {
    return this.userRepository.getAll(params);
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

  changeActive(id: number, active: boolean) {
    return this.userRepository.changeActive(id, active);
  }
}
