import { EventEmitter, Injectable, Output } from "@angular/core";
import { HttpClient, HttpEventType } from "@angular/common/http";
import { OnInit } from "@angular/core";
import { Group, Student } from "./http.model";

@Injectable({
  providedIn: "root",
})
export class HttpService implements OnInit {
  constructor(private HttpClient: HttpClient) {}
  message: string;
  progress: number;
  @Output() onUploadFinished = new EventEmitter();

  groups: Group[] = [];
  students?: Student[] = [];

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

  addStudent(students: Student) {
    return this.HttpClient.post(
      "http://localhost:4200/api/api/group/addStudent",
      students
    ).subscribe((response) => {
      console.log(response);
    });
  }

  uploadPhoto = (photos:FileList | null) => {
    if (photos === null)
      return;
    if (photos.length === 0 ) return;

    let photoToUpload = <File>photos[0];
    const formData = new FormData();
    formData.append("photo", photoToUpload, photoToUpload.name);

    this.HttpClient.post(
      "http://localhost:4200/api/api/groups/images",
      formData,
      { reportProgress: true, observe: 'events' }
    ).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress)
        this.progress = Math.round(100 * event.loaded / event.loaded);
      else if(event.type === HttpEventType.Response){
        this.message = 'Upload finished.';
        this.onUploadFinished.emit(event.body);
      }
    });
  };
}
