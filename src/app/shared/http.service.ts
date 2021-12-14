import { EventEmitter, Injectable, Output } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { OnInit } from "@angular/core";
import { Group, Student } from "./http.model";
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
  dbPath: string;

  @Output() onUploadFinished = new EventEmitter();

  ngOnInit(): void {}

  async getGroups(): Promise<Array<Group>> {
    const groups = await this.HttpClient.get<Array<Group>>(
      "http://localhost:4200/api/api/groups/index"
    )
      .toPromise()
      .catch((err) => console.log(err));
    return groups || [];
  }

  async addGroup(group: Group): Promise<void> {
    await this.HttpClient.post(
      "http://localhost:4200/api/api/group/create",
      group
    )
      .toPromise()
      .catch((err) => console.log(err));
  }

  async deleteGroup(Id: number): Promise<void> {
    await this.HttpClient.post(
      "http://localhost:4200/api/api/group/deleteGroup",
      Id
    )
      .toPromise()
      .catch((err) => console.log(err));
  }

  async updateGroup(groupToEdit: Group) {
    const updatedGroup = await this.HttpClient.put<Group>(
      "http://localhost:4200/api/api/group/updateGroup",
      groupToEdit
    )
      .toPromise()
      .catch((err) => console.log(err));
    return updatedGroup || [];
  }

  async addStudent(student: FormData): Promise<void> {
    if (!student.has("Image")) {
      return console.log("shoto ne to");
    }

    await this.HttpClient.post(
      "http://localhost:4200/api/api/group/images",
      student
    )
      .toPromise()
      .catch((err) => {
        console.log("lol", err);
      });
  }

  async updateStudent(studentToEdit: FormData) {
    console.log(studentToEdit);
    const updatedStudent = await this.HttpClient.put(
      "http://localhost:4200/api/api/group/updateStudent",
      studentToEdit
    )
      .toPromise()
      .catch((err) => console.log(err));
    return updatedStudent || [];
  }

  async deleteStudent(Id: number): Promise<void> {
    await this.HttpClient.post(
      "http://localhost:4200/api/api/group/deleteStudent",
      Id
    )
      .toPromise()
      .catch((err) => {
        console.log("lol", err);
      });
  }
}
