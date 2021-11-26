import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { OnInit } from "@angular/core";

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

@Injectable({
  providedIn: 'root'
})
export class HttpService implements OnInit {
  groups?: Group[] = [];

  constructor(private HttpClient: HttpClient) { }
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
