export class WorkflowCreate {
  process_id?: any;
  person_id?: any;

  constructor(processID: string, personID: string) {
        this.process_id = processID;
        this.person_id = personID;
  }
}
