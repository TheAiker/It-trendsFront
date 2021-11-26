import { Component, OnInit } from '@angular/core';

export class Student {
  constructor(
    public Id: number,
    public FirstName: string,
    public LastName: string,
    public PhoneNumber: number,
    public GroupForeignKey: number,
  ){}
}
@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  students?: Student[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
