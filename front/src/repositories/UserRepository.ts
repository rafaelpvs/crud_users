import type { UserPagination } from "@/models/UserPagination";
import type User from "@/models/User";
import axiosInstance from "@/services/AxiosInstance";
export type PaginationParams = {
  page: {
    number: Number;
    size: number;
  };
};
export class UserRepository {
  async getAll(params: PaginationParams): Promise<UserPagination> {
    const response = await axiosInstance.get("/users", {
      params: { page: params.page.number },
    });
    return response.data;
  }

  async get(id: number): Promise<User> {
    const response = await axiosInstance.get(`/users/${id}`);
    return response.data.user;
  }

  remove(id: number) {
    return axiosInstance.delete(`/users/${id}`);
  }

  create(user: User) {
    return axiosInstance.post("/users", user);
  }
  update(user: User) {
    return axiosInstance.patch(`/users/${user.id}`, user);
  }

  changeActive(id: number, active: boolean) {
    return axiosInstance.patch(`/users/${id}/change_active`, { active });
  }
}
