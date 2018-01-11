import { Component, OnInit, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PersonsService } from "../_services/persons.service";
import { UsersService } from "../_services/users.service";
import { Person, Comment } from "../_models/api.model";
import { User } from "../_models/bpm.model";
import { AuthHelper } from "../_helpers/authhelper";

@Component({
  selector: "app-comments",
  templateUrl: "./comments.component.html",
  styleUrls: ["./comments.component.css"]
})
export class CommentsComponent implements OnInit {
  @Input() person_id: string;
  comments: Comment[];
  commentForm: FormGroup;

  constructor(
    private employeesService: PersonsService,
    private usersService: UsersService,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.getComments();
  }

  createForm() {
    this.commentForm = this.fb.group({
      text: ["", Validators.required]
    });
  }

  saveComment() {
    this.usersService.getUserFromUsername().then(user => {
      const formModel = this.commentForm.value;
      let comment = new Comment();
      comment.text = formModel.text;
      comment.person = this.person_id;
      comment.user = user.id;
      this.employeesService.saveComment(comment).then(result => {
        this.getComments();
      });
    });
  }

  getComments() {
    this.comments = [];
    this.employeesService.getCommentsByPerson(this.person_id).then(comments => {
      for (let comment of comments) {
        this.usersService.getUser(comment.user).then(user => {
          comment.username = user.username;
          let commentDate = new Date(comment.created_date);
          comment.formatted_date = commentDate.yyyymmdd();
          this.comments.push(comment);
        });
      }
    });
  }
}
