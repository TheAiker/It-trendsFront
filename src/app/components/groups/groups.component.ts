import { Component, OnInit } from "@angular/core";
import { Group } from "src/app/shared/http.model";
import { HttpService } from "src/app/shared/http.service";
import { Student } from "../../shared/http.model";

@Component({
  selector: "app-groups",
  templateUrl: "./groups.component.html",
  styleUrls: ["./groups.component.css"],
})
export class GroupsComponent implements OnInit {
  selectedStudents: Student[] = [];
  groups: Group[] = [];

  constructor(public service: HttpService) {}

  groupToEdit: Group = {
    GroupName: "",
    GroupYear: 0,
    President: "",
    Year: 0,
  };

  newGroup: Group = {
    GroupName: "",
    GroupYear: 0,
    President: "",
    Year: 0,
  };

  newStudent: Student = {
    FirstName: "",
    LastName: "",
    PhoneNumber: 0,
    GroupForeignKey: 0,
    Image: [],
  };

  studentToEdit: Student = {
    FirstName: "",
    LastName: "",
    PhoneNumber: 0,
    GroupForeignKey: 0,
    Image: [],
  };

  ngOnInit(): void {
    this.loadGroups();
  }

  async loadGroups(): Promise<void> {
    this.groups = await this.service.getGroups();
  }

  delGroup(Id?: number) {
    if (Id) {
      this.service.deleteGroup(Id);
      this.loadGroups();
    }
  }

  editGroup() {
    if (this.groupToEdit) {
      this.service.updateGroup(this.groupToEdit);
      this.loadGroups();
    }
  }

  submitGroup() {
    this.service.addGroup(this.newGroup);
    this.loadGroups();
  }

  onGroupClick(group: Group): void {
    this.selectedStudents = group.Students || [];
  }

  onStudentClick(student: Student): void {
    this.studentToEdit = student;
  }

  submitStudent(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let file: FileList | null = element.files;
    let data: FormData = new FormData();

    data.append("FirstName", this.newStudent.FirstName);
    data.append("LastName", this.newStudent.LastName);
    data.append("PhoneNumber", this.newStudent.PhoneNumber.toString());
    if (this.newStudent.GroupForeignKey) {
      data.append(
        "GroupForeignKey",
        this.newStudent.GroupForeignKey.toString()
      );
    }

    if (file) {
      data.append("Image", file[0]);
    }
    this.service.addStudent(data);
    this.loadGroups();
  }

  editStudent(updateEvent: Event) {
    if (this.studentToEdit) {
      const element = updateEvent.currentTarget as HTMLInputElement;
      let updatedFile: FileList | null = element.files;
      let updateFormData: FormData = new FormData();
      if (this.studentToEdit.Id !== undefined) {
        updateFormData.append("Id", this.studentToEdit.Id.toString());
      }
      updateFormData.append("FirstName", this.studentToEdit.FirstName);
      updateFormData.append("LastName", this.studentToEdit.LastName);
      updateFormData.append(
        "PhoneNumber",
        this.studentToEdit.PhoneNumber.toString()
      );
      if (this.studentToEdit.GroupForeignKey) {
        updateFormData.append(
          "GroupForeignKey",
          this.studentToEdit.GroupForeignKey.toString()
        );
      }

      if (updatedFile) {
        updateFormData.append("Image", updatedFile[0]);
      }
      this.service.updateStudent(updateFormData);
      this.loadGroups();
    }
  }

  delStudent(Id?: number) {
    if (Id) {
      this.service.deleteStudent(Id);
      this.loadGroups();
    }
  }
}
