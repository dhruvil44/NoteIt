import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Note } from '../model/note';
import { Notebook } from '../model/notebook';
import { NotebookService } from './notebook.service';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  notes: Note[];

  notebookObject: Notebook={
    id: 0,
    name: null
  };

  notebookSubject: Subject<string> = new Subject<string>();

  private url = 'http://localhost:8080/api/notes';

  constructor(private http: HttpClient,
             private notebookService: NotebookService) { }

  //getting all the pinned notes by default
  getNotesDefault(email: string): Observable<Note[]>{
    return this.http.get<Note[]>(`${this.url}/pinned/${email}`);
  }


  //getting notes of a particular notebook
  getNotes(notebookId: number): Observable<Note[]>{
    return this.http.get<Note[]>(`${this.url}/byNotebook/${notebookId}`)
  }

  //getting all notes
  getAllNotes(email: string): Observable<Note[]>{
    return this.http.get<Note[]>(`${this.url}/all/${email}`);
  }


  //getting notes for search result
  getSearchNotes(searchKeyword: string): Observable<Note[]>{
    this.notebookService.notebookSubject.subscribe(
      data=>{
        this.notebookObject = data;
      }
    )

    return this.http.get<Note[]>(`${this.url}/${this.notebookObject.id}/search/${searchKeyword}`);
  }

  //saving a note
  saveNote(notebookId: number, note: Note): Observable<Note>{
    return this.http.post<Note>(`${this.url}/${notebookId}`, note);
  }

  //deleting a notebook
  deleteNote(noteId: number): Observable<Note>{
    return this.http.delete<Note>(`${this.url}/${noteId}`);
  }


}
