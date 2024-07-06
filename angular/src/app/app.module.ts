import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { CommentService } from './services/comment.service';

import { AppComponent } from "./app.component";
import { CommentFeedComponent } from "./components/comment-feed/comment-feed.component";

@NgModule({
  declarations: [
    AppComponent,
    CommentFeedComponent
  ],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [CommentService],
  bootstrap: [AppComponent]
})
export class AppModule {}
