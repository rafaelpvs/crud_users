<template>
  <tr>
    <td class="text-nowrap text-ellipsis">{{ getFullName() }}</td>
    <td>{{ `${getAge()} anos` }}</td>
    <td>{{ getFormatedDateTime(user.created_at) }}</td>
    <td>{{ getFormatedDateTime(user.updated_at) }}</td>
    <td>
      <button type="button" class="btn btn-danger btn-sm" @click="removeUser">
        Remove user
      </button>
      <button class="btn btn-info btn-sm" @click="updateUser">
        Atualizar usuario
      </button>
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
}>();
const removeUser = () => emit("onRemoveUserClick", user);

const updateUser = () => emit("onUpdateUserClick", user.id!);
</script>
<style scoped>
.text-ellipsis {
  text-overflow: ellipsis;
}
</style>
