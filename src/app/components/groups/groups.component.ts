import { HttpClient } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTable } from "@angular/material/table";

export class Group {
  constructor(
    public Id: number,
    public GroupName: string,
    public Year: number,
    public Program: string,
    public President: string,
    public GroupYear: number
  ) {}
}
@Component({
  selector: "app-groups",
  templateUrl: "./groups.component.html",
  styleUrls: ["./groups.component.css"],
})
export class GroupsComponent implements OnInit {

  groups?: Group[] = [];
  constructor(private HttpClient: HttpClient) {}

  ngOnInit(): void {
    this.getGroups();
  }

  getGroups() {
    this.HttpClient.get<Array<Group>>("http://localhost:4200/api/Home/Groups").subscribe(
      response => {
        console.log(response);
        this.groups = response;
      }
    );
  }

}
