package com.dpnotes.dpnoteit.controller;

import com.dpnotes.dpnoteit.model.Note;
import com.dpnotes.dpnoteit.model.Notebook;
import com.dpnotes.dpnoteit.repository.NoteRepository;
import com.dpnotes.dpnoteit.repository.NotebookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/api/notes")
public class NoteController {

    @Autowired
    private NoteRepository noteRepository;

    @Autowired
    private NotebookRepository notebookRepository;


    //get all notes
    @GetMapping("/all/{email}")
    public List<Note> getAllNotes(@PathVariable String email)
    {
        List<Note> notes = noteRepository.findAllByEmail(email);
        return notes;
    }

    //get notes where pinned=true
    @GetMapping("/pinned/{email}")
    public List<Note> getPinnedNotes(@PathVariable String email)
    {
        List<Note> notes = noteRepository.findAllByEmailAndPinned(email,true);
        return notes;
    }

    //getting all notes of a specific notebook
    @GetMapping("/byNotebook/{notebookId}")
    public List<Note> getNotes(@PathVariable Long notebookId)
    {
        List<Note> notes = new ArrayList<>();
        Optional<Notebook> notebook = notebookRepository.findById(notebookId);

        if(notebookId==4)
        {
            notes = noteRepository.findAll();
        }

        else if(notebook.isPresent())
        {
            notes = noteRepository.findAllByNotebook(notebook.get());
        }

        return notes;
    }


    //getting all the searched notes by notebook
    @GetMapping("/{notebookId}/search/{keyword}")
    public List<Note> getSearchedNotes(@PathVariable Long notebookId, @PathVariable String keyword)
    {
        Optional<Notebook> notebook = notebookRepository.findById(notebookId);
        List<Note> notes = new ArrayList<>();
        notes = null;
        if(notebook.isPresent()) {
             notes = noteRepository.findAllByNotebookAndTitleContaining(notebook.get(), keyword);
        }
        return notes;
    }


    //saving a note in a specific notebook
    @PostMapping("/{notebookId}")
    public Note saveNote(@PathVariable Long notebookId,@RequestBody Note note)
    {
        //getting the notebook
        Optional<Notebook> notebook = notebookRepository.findById(notebookId);

        //adding the notebook in the note
        note.add(notebook.get());

        noteRepository.save(note);

        return note;
    }

    //deleting a note by id
    @DeleteMapping("/{id}")
    public void deleteNote(@PathVariable Long id)
    {
        noteRepository.deleteById(id);
    }





}
