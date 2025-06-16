<template>
  <tr>
    <td class="text-nowrap text-ellipsis">{{ getFullName() }}</td>
    <td>{{ `${getAge()} anos` }}</td>
    <td>
      <input
        style="cursor: pointer"
        class="form-check-input text-success"
        type="checkbox"
        id="checkDefault"
        @change="changeActiveUser"
        v-model="user.active"
      />
    </td>
    <td>{{ getFormatedDateTime(user.created_at) }}</td>
    <td>{{ getFormatedDateTime(user.updated_at) }}</td>
    <td>
      <a @click="removeUser">
        <font-awesome-icon
          icon="trash"
          style="color: red; cursor: pointer; margin-right: 15px"
        />
      </a>
      <a @click="updateUser">
        <font-awesome-icon
          :icon="['fas', 'pen-to-square']"
          style="color: blue; cursor: pointer"
        />
      </a>
    </td>
  </tr>
</template>
<script setup lang="ts">
import { type PropType } from "vue";
import moment from "moment";
import type User from "@/models/User";
const props = defineProps({
  user: {
    required: true,
    type: Object as PropType<User>,
  },
});

const { user } = props;

const getFullName = (): string => {
  return `${user.first_name} ${user.last_name}`;
};
const getAge = (): number => {
  const birthDate = moment(user.birth_date, "YYYY-MM-DD");
  const today = moment();
  return today.diff(birthDate, "years");
};

const getFormatedDateTime = (date?: string | null): string => {
  return moment(date).format("DD/MM/YYYY HH:mm:ss");
};
const emit = defineEmits<{
  (e: "onRemoveUserClick", user: User): Promise<void>;
  (e: "onUpdateUserClick", id: number): void;
  (e: "onActiveUserChange", id: number, active: boolean): void;
}>();
const removeUser = () => emit("onRemoveUserClick", user);

const updateUser = () => emit("onUpdateUserClick", user.id!);
const changeActiveUser = () =>
  emit("onActiveUserChange", user.id!, user.active);
</script>
<style scoped>
.text-ellipsis {
  text-overflow: ellipsis;
}
</style>
