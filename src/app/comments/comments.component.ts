import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators }            from '@angular/forms';
import { EmployeesService } from '../_services/employees.service';
import { Person, Comment } from '../_models/api.model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  @Input() person_id: string;
  comments: Comment[];
  commentForm: FormGroup;

  constructor(private employeesService: EmployeesService, private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    this.getComments();
  }

  createForm() {
    this.commentForm = this.fb.group({
      text: ['', Validators.required]
    })
  }

  prepareSave(): Comment {
    return new Comment()
  }

  saveComment() {
    let updatedComment = this.prepareSave();
    this.employeesService.saveComment(updatedComment).then(result => {
      this.getComments()
    })
  }

  getComments() {
    this.comments = [];
    this.employeesService.getCommentsByPerson(this.person_id).then(comments => {
      this.comments = comments;
    });
  }

}
