import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

const API_PREFIX = "/api";
export interface Comment {
  id?: number;
  text: string;
}


@Injectable({
  providedIn: "root",
})
export class CommentService {
  constructor(private http: HttpClient) {}

  /**
   * Reset comments back to original state.
   */
  resetComments(): Observable<any> {
    return this.http.post(`${API_PREFIX}/reset-comments`, {});
  }
  getComments(): Observable<any> {
    return this.http.get(`${API_PREFIX}/comments`);
  }

  getComment(id: number): Observable<any> {
    return this.http.get(`${API_PREFIX}/comments/${id}`);
  }

  addComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${API_PREFIX}/comments`,comment);
  }

  deleteComment(id: number): Observable<any> {
    return this.http.delete(`${API_PREFIX}/comments/${id}`);
  }
  searchComments(query: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${API_PREFIX}?q=${query}`);
  }
}
