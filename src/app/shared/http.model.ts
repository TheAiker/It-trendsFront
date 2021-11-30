import { Student } from "../components/students/students.component";



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
