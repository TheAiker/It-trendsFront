
export class Http {

}
export class Group {
    Id?: number=0;
    GroupName: string='';
    Year: number=0;
    Program?: string='';
    President: string='';
    GroupYear: number=0;
    Students?: Student[]=[];
}
export class Student {
  constructor(
    public Id: number,
    public FirstName: string,
    public LastName: string,
    public PhoneNumber: number,
    public GroupForeignKey: number,
  ){}
}
