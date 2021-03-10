import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OktaAuthService } from '@okta/okta-angular';
import { Notebook } from 'src/app/model/notebook';
import { NotebookService } from 'src/app/services/notebook.service';

@Component({
  selector: 'app-notebook-list',
  templateUrl: './notebook-list.component.html',
  styleUrls: ['./notebook-list.component.css']
})
export class NotebookListComponent implements OnInit {

  notebooks: Notebook[];

  updatedName: string;

  email: string;


  constructor(private notebookService: NotebookService,
    private route: ActivatedRoute,
    private oktaAuthService: OktaAuthService
  ) { }

  async ngOnInit() {

    // returns an object with user's claims
    const userClaims = await this.oktaAuthService.getUser();

    // email is exposed directly as property
    this.email = userClaims.email;

    this.route.paramMap.subscribe(() => {
      this.listNotebooks();
    });

  }

  //listing all the notebooks
  listNotebooks() {
    this.notebookService.getNotebooks(this.email).subscribe(data => {
      this.notebooks = data;
      for (let notebook of this.notebooks) {
        notebook.isEditing = false;
      }
    })

  }

  //making the notebook in the edit mode
  onEditNotebook(notebook: Notebook) {
    notebook.isEditing = true;
  }

  //updating the notebook
  updateNotebook(notebook: Notebook) {
    this.notebookService.updateNotebook(notebook).subscribe();
    notebook.isEditing = false;
  }

  //getting the selected notebook
  selectedNotebook(notebook: Notebook) {
    this.notebookService.getCurrentNotebookObject(notebook);
  }

  //delete the notebook
  onDeleteNotebook(notebook: Notebook) {

    //deleting the notebook from the notebooks array
    this.notebooks.forEach((tempNotebook, index) => {
      if (tempNotebook === notebook) this.notebooks.splice(index, 1)
    });

    this.notebookService.deleteNotebook(notebook.id).subscribe();

  }

  //creating new notebook
  onNewNotebook() {
    let newNotebook: Notebook = {
      id: null,
      name: 'New Notebook',
      email: this.email
    }

    this.notebookService.saveNotebook(newNotebook).subscribe(
      data => {
        newNotebook.id = data.id;
        this.notebooks.push(newNotebook);
      }
    );



  }
}
