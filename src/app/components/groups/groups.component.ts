import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Group } from "src/app/shared/http.model";
import { HttpService } from "src/app/shared/http.service";
import { Student } from "../students/students.component";

@Component({
  selector: "app-groups",
  templateUrl: "./groups.component.html",
  styleUrls: ["./groups.component.css"],
})
export class GroupsComponent implements OnInit {
  constructor(public service:HttpService) {

  }
  selectedStudents: Student[] = [];

  newGroup: Group = {
    GroupName: "",
      GroupYear: 0,
     President: "",
      Year: 0,
  };

  ngOnInit(): void {
    this.service.getGroups();
  }

  submitGroup() {
    console.log(this.newGroup);
    this.service.addGroup(this.newGroup);
  }

  onGroupClick(group: Group): void {
    this.selectedStudents = group.Students ||  [];
  }
}

