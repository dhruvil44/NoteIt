import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private noteService: NoteService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  //when the search button is entered
  doSearch(searchKeyword: string){
    
    //navigate to the url 'localhost:4200/note/:searchKeyword' which will go to the NoteList Component
    this.router.navigateByUrl(`note/${searchKeyword}`);
  }


}
