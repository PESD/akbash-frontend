export class ModelLog {
  model_id: number;
  model_module: string;
  model_class: string;
  model_field_name: string;
  old_value: string;
  new_value: string;
  change_date: Date;
  user: string;
}
