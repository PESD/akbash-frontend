import { SelectItem } from 'primeng/primeng';

export class FormHelper {

  public getGenders(): SelectItem[] {
    return [
      {label: "Female", value: "F"},
      {label: "Male", value: "M"},
    ];
  }

  public getRaces(): SelectItem[] {
    return [
      {label: "American Indian", value: "race_american_indian"},
      {label: "Asian", value: "race_asian"},
      {label: "Black", value: "race_black"},
      {label: "Pacific Islander", value: "race_islander"},
      {label: "White", value: "race_white"},
    ];
  }

  public getEthnicities(): SelectItem[] {
    return [
      {label: "Hispanic", value: "Hispanic"},
      {label: "Non-Hispanic", value: "Non-Hispanic"},
    ];
  }
}
