import { Injectable } from '@angular/core';
import { Notebook } from '../model/notebook';


import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotebookService { 

  // notebooks: Notebook[];

  notebookSubject: Subject<Notebook> = new Subject<Notebook>();

  
  private url = 'http://localhost:8080/api/notebooks';
  constructor(private http: HttpClient) { }


  //getting all the notebooks
  getNotebooks(email: string): Observable<Notebook[]>{
    return this.http.get<Notebook[]>(`${this.url}/all/${email}`);
  }

  //saving a notebook
  saveNotebook(notebook: Notebook): Observable<Notebook>{
    return this.http.post<Notebook>(`${this.url}` , notebook );
  }

  //deleting a notebook
  deleteNotebook(notebookId: number):Observable<Notebook>{
    return this.http.delete<Notebook>(`${this.url}/${notebookId}`);
  }

  //publishing the current notebook object to all the subscribers
  getCurrentNotebookObject(notebook: Notebook){
    this.notebookSubject.next(notebook);
  }

  //update A notebook
  updateNotebook(notebook: Notebook):Observable<Notebook>{
    return this.http.put<Notebook>(`${this.url}`,notebook);
  }


}

