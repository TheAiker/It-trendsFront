export class Http {}
export class Group {
  Id?: number = 0;
  GroupName: string = "";
  Year: number = 0;
  Program?: string = "";
  President: string = "";
  GroupYear: number = 0;
  Students?: Student[] = [];
}
export class Student {
  Id?: number = 0;
  FirstName: string = "";
  LastName: string = "";
  PhoneNumber: number = 0;
  GroupForeignKey?: number = 0;
}
