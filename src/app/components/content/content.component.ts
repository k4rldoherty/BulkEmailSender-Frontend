import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  url = "https://localhost:7148/api/Email/processformdata";

  formData: EmailForm = {
    from: '',
    password: '',
    body: '',
    subject: ''
  }; 
  
  onSubmit() {
    const formData = new FormData();
    formData.append('from', this.formData.from);
    formData.append('password', this.formData.password);
    formData.append('body', this.formData.body);
    formData.append('subject', this.formData.subject);
  
    if (this.formData.photoFooter) {
      formData.append('photoFooter', this.formData.photoFooter, this.formData.photoFooter.name);
    }
  
    if (this.formData.csvFile) {
      formData.append('csvFile', this.formData.csvFile, this.formData.csvFile.name);
    }
  
    return this.http.post(this.url, formData).subscribe(result => {
      console.log(result);
    });
  }
  
  onFileSelected(event: any, fileInput: any) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      if (fileInput === 'photoFooter') {
        this.formData.photoFooter = file;
      } else if (fileInput === 'csvFile') {
        this.formData.csvFile = file;
      }
    }
  }

}

export interface EmailForm {
  from: string;
  password: string;
  body: string;
  subject: string;
  photoFooter?: File;
  csvFile?: File;
}