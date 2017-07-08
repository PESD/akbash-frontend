import { User } from './bpm.model';

export class Vendor {
  id?: any;
  name?: any;
  short_name?: any;
  vendor_type?: any;
}

export class Employee {
  api_url?: any;
  id?: any;
  type?: any;
  employee_id?: any;
  first_name?: any;
  last_name?: any;
  middle_name?: any;
  badge_number?: any;
  birth_date?: any;
  gender?: any;
  race_white?: any;
  race_asian?: any;
  race_black?: any;
  race_islander?: any;
  race_american_indian?: any;
  ethnicity?: any;
  hqt?: any;
  ssn?: any;
  tcp_id?: any;
  talented_id?: any;
  onboarding_date?: any;
  visions_id?: any;
  sub_type?: any;
  marked_as_hired?: any;
  epar_id?: any;
  is_onboarded?: any;
  onboarded_date?: any;
  onboarded_by?: any;
  is_tcp_fingerprinted?: any;
  tcp_fingerprinted_date?: any;
  tcp_fingerprinted_by?: any;
  is_badge_created?: any;
  badge_created_date?: any;
  badge_created_by?: any;
  is_emp_record_created?: any;
  emp_record_created_date?: any;
  emp_record_created_by?: any;
  is_position_linked?: any;
  position_linked_date?: any;
  position_linked_by?: any;
  is_visions_account_needed?: any;
  is_visions_account_created?: any;
  visions_account_created_date?: any;
  visions_account_created_by?: any;
  is_synergy_account_needed?: any;
  is_synergy_account_created?: any;
  synergy_account_created_date?: any;
  synergy_account_created_by?: any;
  is_ad_account_created?: any;
  ad_account_created_date?: any;
  ad_account_created_by?: any;
  is_cell_phone_needed?: any;
  is_cell_phone_created?: any;
  cell_phone_created_date?: any;
  cell_phone_created_by?: any;
  is_desk_phone_created?: any;
  desk_phone_created_date?: any;
  desk_phone_created_by?: any;
  services?: any;
}

export class Person {
    api_url?: string;
    id?: number;
    type?: any;
    first_name?: string;
    last_name?: string;
    middle_name?: string;
    badge_number?: any;
    birth_date?: string;
    gender?: string;
    race_white?: boolean;
    race_asian?: boolean;
    race_black?: boolean;
    race_islander?: boolean;
    race_american_indian?: boolean;
    ethnicity?: string;
    hqt?: string;
    ssn?: string;
    tcp_id?: any;
    talented_id?: number;
    visions_id?: any;
    sub_type?: any;
    marked_as_hired?: any;
    epar_id?: any;
    is_onboarded?: boolean;
    onboarded_date?: any;
    onboarded_by?: any;
    is_tcp_fingerprinted?: boolean;
    tcp_fingerprinted_date?: any;
    tcp_fingerprinted_by?: any;
    is_badge_created?: boolean;
    badge_created_date?: any;
    badge_created_by?: any;
    is_emp_record_created?: boolean;
    emp_record_created_date?: any;
    emp_record_created_by?: any;
    is_position_linked?: boolean;
    position_linked_date?: any;
    position_linked_by?: any;
    is_visions_account_created?: boolean;
    visions_account_created_date?: any;
    visions_account_created_by?: any;
    is_synergy_account_created?: boolean;
    synergy_account_created_date?: any;
    synergy_account_created_by?: any;
    is_ad_account_created?: boolean;
    ad_account_created_date?: any;
    ad_account_created_by?: any;
    services?: any[];
    vendor?: any;
    employee_id?: any;
}

export class Contractor {
    api_url?: string;
    id?: number;
    type?: any;
    first_name?: string;
    last_name?: string;
    middle_name?: string;
    badge_number?: any;
    birth_date?: any;
    gender?: string;
    race_white?: boolean;
    race_asian?: boolean;
    race_black?: boolean;
    race_islander?: boolean;
    race_american_indian?: boolean;
    ethnicity?: string;
    hqt?: string;
    ssn?: string;
    tcp_id?: any;
    talented_id?: number;
    is_onboarded?: boolean;
    onboarded_date?: any;
    onboarded_by?: any;
    is_tcp_fingerprinted?: boolean;
    tcp_fingerprinted_date?: any;
    tcp_fingerprinted_by?: any;
    is_badge_created?: boolean;
    badge_created_date?: any;
    badge_created_by?: any;
    is_emp_record_created?: boolean;
    emp_record_created_date?: any;
    emp_record_created_by?: any;
    is_position_linked?: boolean;
    position_linked_date?: any;
    position_linked_by?: any;
    is_visions_account_created?: boolean;
    visions_account_created_date?: any;
    visions_account_created_by?: any;
    is_synergy_account_created?: boolean;
    synergy_account_created_date?: any;
    synergy_account_created_by?: any;
    is_ad_account_created?: boolean;
    ad_account_created_date?: any;
    ad_account_created_by?: any;
    services?: any[];
    vendor?: any;
}

export interface Location {
        api_url: string;
        id: number;
        name: string;
        short_name: string;
        location_number: string;
    }

export class Position {
        api_url: string;
        id: number;
        title?: string;
        person: number;
        last_updated_date?: any;
        last_updated_by?: string;
        location?: Location;
        department?: any;
        position_type?: any;
    }

export class Comment {
  id: any;
  person: any;
  text?: string;
  user?: any;
  created_date?: string;
  username?: string;
  formatted_date?: string;
}
