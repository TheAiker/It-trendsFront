import { EventEmitter, Injectable, Output } from "@angular/core";
import { HttpClient, HttpEventType } from "@angular/common/http";
import { OnInit } from "@angular/core";
import { Group, Student } from "./http.model";
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
})
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

  groups: Group[] = [];

  ngOnInit(): void {}

  getGroups() {
    this.HttpClient.get<Array<Group>>(
      "http://localhost:4200/api/api/Groups/Index"
    ).subscribe((response) => {
      console.log(response);
      this.groups = response;
    });
  }

  addGroup(group: Group) {
    return this.HttpClient.post(
      "http://localhost:4200/api/api/group/create",
      group
    ).subscribe((response) => {
      console.log(response);
    });
  }
  deleteGroup(Id: number) {
    return this.HttpClient.post(
      "http://localhost:4200/api/api/group/deleteGroup",
      Id
    ).subscribe((response) => {
      console.log(response);
    });
  }


  addStudent = (student: FormData) => {
    if (student === null)
      return;
    if (!student.has("imgFile")) return;

    this.HttpClient.post(
      "http://localhost:4200/api/api/groups/images",
      student,
      { reportProgress: true, observe: 'events', headers: {
        'Accept': 'application/json',
        // 'Content-Type': 'multipart/form-data'
      } }
    ).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress)
        this.progress = Math.round(100 * event.loaded / event.loaded);
      else if(event.type === HttpEventType.Response){
        if(!event.body) {
          return;
        }
        const body = event.body as {"dbPath" : string};
        this.dbPath = body.dbPath as string;
        this.message = 'Upload finished.';
        console.log(this.dbPath);
        this.onUploadFinished.emit(event.body);
      }
    });
  };

  deleteStudent(Id: number) {
    return this.HttpClient.post(
      "http://localhost:4200/api/api/group/deleteStudent",
      Id
    ).subscribe((response) => {
      console.log(response);
    });
  }
}
