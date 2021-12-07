import { EventEmitter, Injectable, Output } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { OnInit } from "@angular/core";
import { Group } from "./http.model";
import { HttpHeaders } from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};

@Injectable({
  providedIn: "root",
})
export class HttpService implements OnInit {
  constructor(private HttpClient: HttpClient) {}
  message: string;
  progress: number;
  dbPath: string;

  @Output() onUploadFinished = new EventEmitter();

  ngOnInit(): void {}

  async getGroups(): Promise<Array<Group>> {
    const groups = await this.HttpClient.get<Array<Group>>(
      "http://localhost:4200/api/api/Groups/Index"
    ).toPromise();
    return groups || [];
  }

  async addGroup(group: Group): Promise<void> {
    await this.HttpClient.post(
      "http://localhost:4200/api/api/group/create",
      group
    ).toPromise();
  }

  async deleteGroup(Id: number): Promise<void> {
    await this.HttpClient.post(
      "http://localhost:4200/api/api/group/deleteGroup",
      Id
    ).toPromise();
  }

  async addStudent(student: FormData): Promise<void> {
    if (!student.has("imgFile")) {
      return;
    }

    await this.HttpClient.post<{ dbPath: string }>(
      "http://localhost:4200/api/api/groups/images",
      student,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    ).toPromise();
  }

  async deleteStudent(Id: number): Promise<void> {
    await this.HttpClient.post(
      "http://localhost:4200/api/api/group/deleteStudent",
      Id
    ).toPromise();
  }
}
