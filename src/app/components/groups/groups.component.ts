import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Group } from 'src/app/shared/http.model';
import { HttpService } from 'src/app/shared/http.service';
import { Student } from '../../shared/http.model';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css'],
})
export class GroupsComponent implements OnInit {
  selectedStudents: Student[] = [];


  constructor(public service: HttpService) {}

  newGroup: Group = {
    GroupName: '',
    GroupYear: 0,
    President: '',
    Year: 0,
  };

  newStudent: Student = {
    FirstName: '',
    LastName: '',
    PhoneNumber: 0,
    GroupForeignKey: 0,
  };

  ngOnInit(): void {
    this.service.getGroups();
  }

  delGroup(Id?: number) {
    if (Id) this.service.deleteGroup(Id);
  }
  submitGroup() {
    console.log(this.newGroup);
    this.service.addGroup(this.newGroup);
  }

  onGroupClick(group: Group): void {
    this.selectedStudents = group.Students || [];
  }

  submitStudent(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    let data = new FormData();

    data.append('FirstName', this.newStudent.FirstName);
    data.append('LastName',  this.newStudent.LastName);
    data.append('PhoneNumber', this.newStudent.PhoneNumber.toString());
    if (this.newStudent.GroupForeignKey) {
      data.append('GroupForeignKey',  this.newStudent.GroupForeignKey.toString());
    }
    if (fileList) {
      data.append('imgFile', fileList[0]);
    }
    this.service.addStudent(data);
  }

  delStudent(Id?: number) {
    if (Id) this.service.deleteStudent(Id);
  }

}
