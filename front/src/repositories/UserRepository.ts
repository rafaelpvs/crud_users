import type User from "../models/User";
import axiosInstance from "../services/AxiosInstance";

export default class {
  async getAll(): Promise<User[]> {
    const response = await axiosInstance.get("/users");
    return response.data.users;
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
}
