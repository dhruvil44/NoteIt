import { Component, OnInit, ɵNOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OktaAuthService } from '@okta/okta-angular';
import { Note } from 'src/app/model/note';
import { Notebook } from 'src/app/model/notebook';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {

  notes: Note[];


  notebookObject: Notebook = {
    id: 0,
    name: null
  };

  searchKeyword: string = null;

  currentNotebookId: number = null;

  url: string = null;

  email: string;

  isExpand: boolean = false;

  selectedNoteForExpand: Note = null;

  constructor(private noteService: NoteService,
    private route: ActivatedRoute,
    private router: Router,
    private oktaAuthService: OktaAuthService
  ) { }

  async ngOnInit() {

    // returns an object with user's claims
    const userClaims = await this.oktaAuthService.getUser();

    // email is exposed directly as property
    this.email = userClaims.email;

    this.route.paramMap.subscribe(() => {

      //getting the url to check whether it is '/all' or not
      this.url = this.router.url;

      //initially no notebook is selected for expand
      this.selectedNoteForExpand=null;
      //initially isExpand should always be false
      this.isExpand=false;

      this.listNotes();

    });

  }


  listNotes() {

    //getting the notebook id
    this.route.params.subscribe(data => { this.currentNotebookId = data.id });

    //getting the search keyword
    this.route.params.subscribe(data => { this.searchKeyword = data.searchKeyword });

    //getting selected notebook object
    // this.notebookService.notebookSubject.subscribe(
    //   data => {
    //     this.notebookObject = data;
    //   }
    // );


    // if '/all' is selected the get all notes
    if (this.url == '/all') {
      this.route.paramMap.subscribe(() => { this.getAllNotes(); });
    }

    // Get the notes by notebook
    else if (this.currentNotebookId != null) {
      this.route.paramMap.subscribe(() => { this.getNotesByNotebook(); });
    }

    // Get the pinned notes
    else {
      this.route.paramMap.subscribe(() => { this.getNotesDefault(); });
    }


  }


  //by default getting the pinned notes
  getNotesDefault() {
    this.noteService.getNotesDefault(this.email).subscribe(data => {
      this.notes = data;
    })
  }


  //getAllNotes
  getAllNotes() {
    this.noteService.getAllNotes(this.email).subscribe(data => {
      this.notes = data;
    })
  }


  //getting notes of a particular notebook
  getNotesByNotebook() {
    this.noteService.getNotes(this.currentNotebookId).subscribe(data => {
      this.notes = data;
    })

  }

  //getting notes for search result
  getSearchNotes() {
    this.noteService.getSearchNotes(this.searchKeyword).subscribe(data => {
      this.notes = data;
    })
  }

  //updating the note
  updateNote(note: Note) {
    this.noteService.saveNote(this.currentNotebookId, note).subscribe();
  }

  //deleting the note
  deleteNote(note: Note) {

    this.notes.forEach((tempNote, index) => {
      if (tempNote == note) this.notes.splice(index, 1)
    });

    this.noteService.deleteNote(note.id).subscribe();

    this.isExpand=false;
  }

  //on creating a new note
  onNewNote() {

    if (this.currentNotebookId == null) {
      this.alert();
    }

    else {
      let newNote: Note = {
        id: null,
        title: 'New Note',
        text: 'Write Text Here',
        pinned: false,
        email: this.email,
        lastModifiedOn: null
      }
      this.noteService.saveNote(this.currentNotebookId, newNote).subscribe(
        data => {
          newNote.id = data.id;
          this.notes.unshift(newNote);
        }
      )
    }
  }

  //alert function
  alert() {
    window.alert('Please select a Notebook');
  }

  //On Pinnning a Note
  onPinNote(note: Note) {
    note.pinned = true;
    this.noteService.saveNote(this.currentNotebookId, note).subscribe();
  }

  //On Unpinning a Note
  onUnpinNote(note: Note) {
    note.pinned = false;
    this.noteService.saveNote(this.currentNotebookId, note).subscribe();
  }

  //on Expand a Note
  onExpandNote(note: Note) {
    this.isExpand=true;
    this.selectedNoteForExpand=note;
  }

  //on Compress/Minimize a Note
  onCompressNote() {
    this.isExpand=false;
    this.selectedNoteForExpand=null;
  }

}
