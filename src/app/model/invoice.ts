export class Invoice {
  id: string;
  direction: string;
  number: number;
  date_created: string;
  date_created_str: string; // используется для фильтрации
  date_due: string;
  date_due_str: string; // используется для фильтрации
  date_supply: string;
  date_supply_str: string; // используется для фильтрации
  comment: string;
}
