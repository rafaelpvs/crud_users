import type { UserPagination } from "@/models/UserPagination";
import type User from "@/models/User";
import axiosInstance from "@/services/AxiosInstance";
export type Params = {
  page: number;
  q: Filters | null;
};

export type Filters = {
  full_name_cont: string;
  birth_date_eq: string;
  created_at_date_eq: string;
  updated_at_date_eq: string;
  active_eq: boolean | null;
};
export class UserRepository {
  async getAll(params: Params): Promise<UserPagination> {
    const response = await axiosInstance.get("/users", {
      params: params,
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

  export() {
    return axiosInstance.get("/users/export");
  }
}
