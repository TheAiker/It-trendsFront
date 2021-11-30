import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { OnInit } from "@angular/core";
import { Group } from './http.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService implements OnInit {
  constructor(private HttpClient: HttpClient) { }

  groups: Group[] = [];

  ngOnInit(): void {
  }

  getGroups() {
    this.HttpClient.get<Array<Group>>(
      "http://localhost:4200/api/api/Groups/Index"
    ).subscribe((response) => {
      console.log(response);
      this.groups = response;
    });
  }

  addGroup(group : Group) {
    return this.HttpClient.post(
      "http://localhost:4200/api/api/group/create", group
      ).subscribe((response) => {
      console.log(response);
    })
  }
}
