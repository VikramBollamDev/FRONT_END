import { Component, OnInit } from "@angular/core";
import { CommentService, Comment } from "./../../services/comment.service";
import { Subject } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';

@Component({
  selector: "app-comment-feed",
  templateUrl: "./comment-feed.component.html",
  styleUrls: ["./comment-feed.component.css"],
})
export class CommentFeedComponent implements OnInit {
  comments: Comment[];
  errorMessage = "";
  newCommentText: string = "";
  searchTerms = new Subject<string>();

  constructor(private commentService: CommentService) {}

  ngOnInit() {
    this.loadComments();

    this.searchTerms
      .pipe(
        debounceTime(300),
        switchMap((term) => this.commentService.searchComments(term))
      )
      .subscribe((comments) => (this.comments = comments));
  }

  loadComments() {
    this.commentService
      .getComments()
      .subscribe((comments) => (this.comments = comments));
  }

  addComment() {
    if (this.newCommentText.trim()) {
      const newComment = { text: this.newCommentText.trim() };
      this.commentService.addComment(newComment).subscribe(() => {
        this.newCommentText = "";
        this.loadComments();
      });
    }
  }

  deleteComment(id: number) {
    this.commentService.deleteComment(id).subscribe(() => this.loadComments());
  }

  resetCommentFeed() {
    this.commentService.resetComments().subscribe(() => this.loadComments());
  }

  searchComments(term: string): void {
    this.searchTerms.next(term);
  }
}
