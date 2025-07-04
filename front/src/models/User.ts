export default interface User {
  id?: number | null;
  first_name: string;
  last_name: string;
  birth_date: string;
  active: boolean;
  created_at?: string | null;
  updated_at?: string | null;
}
