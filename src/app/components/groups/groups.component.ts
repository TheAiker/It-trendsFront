import { HttpClient, HttpEvent } from "@angular/common/http";
import { Component, OnInit, Injectable } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from "@angular/material/tree";
import { SelectionModel } from "@angular/cdk/collections";
import { FlatTreeControl } from "@angular/cdk/tree";
import { BehaviorSubject } from "rxjs";
import { Student } from "../students/students.component";

export class Group {
  constructor(
    public Id: number,
    public GroupName: string,
    public Year: number,
    public Program: string,
    public President: string,
    public GroupYear: number,
    public Students: Student[]
  ) {}
}
@Component({
  selector: "app-groups",
  templateUrl: "./groups.component.html",
  styleUrls: ["./groups.component.css"],
})
export class GroupsComponent implements OnInit {
  groups?: Group[] = [];
  selectedStudents: Student[] = [];
  constructor(private HttpClient: HttpClient, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.getGroups();
  }

  onGroupClick(group: Group): void {
    this.selectedStudents = group.Students;
  }

  clearForm() {
    this.groups = [];
    return this.groups;
  }

  getGroups() {
    this.HttpClient.get<Array<Group>>(
      "http://localhost:4200/api/Home/Groups"
    ).subscribe((response) => {
      console.log(response);
      this.groups = response;
    });
  }

  addGroupForm = this.formBuilder.group({
    groupName: '',
    groupYear: '',
    president: '',
    year: ''
  })

  onSubmit(): void {

    this.groups = this.clearForm();
    console.warn('Group has been added', this.addGroupForm.value);
    this.addGroupForm.reset();
  }
}
