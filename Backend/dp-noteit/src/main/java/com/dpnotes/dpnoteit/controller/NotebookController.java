package com.dpnotes.dpnoteit.controller;

import com.dpnotes.dpnoteit.model.Note;
import com.dpnotes.dpnoteit.model.Notebook;
import com.dpnotes.dpnoteit.repository.NoteRepository;
import com.dpnotes.dpnoteit.repository.NotebookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/api/notebooks")
public class NotebookController {

    @Autowired
    private NotebookRepository notebookRepository;

    @Autowired
    private NoteRepository noteRepository;


    //getting all the notebooks
    @GetMapping("/all/{email}")
    public List<Notebook> getAllNotebooks(@PathVariable String email)
    {
        List<Notebook> notebooks = notebookRepository.findAllByEmail(email);
        return notebooks;
    }

    //saving a new created notebook
    @PostMapping
    public Notebook saveNotebook(@RequestBody Notebook notebook)
    {
        notebookRepository.save(notebook);
        return notebook;
    }

    //deleting a notebook by id
    @DeleteMapping("/{id}")
    public void deleteNotebook(@PathVariable Long id)
    {
        //getting the notebook by id
        Optional<Notebook> notebook = notebookRepository.findById(id);

        //if the notebook is present
        if(notebook.isPresent()) {
            //getting all the notes of the notebook
            List<Note> notes = noteRepository.findAllByNotebook(notebook.get());

            for(Note note: notes)
            {
                //deleting all the notes of the notebook
                noteRepository.delete(note);
            }
        }
        //deleting the notebook
        notebookRepository.deleteById(id);
    }

    @PutMapping
    public void updateNotebook(@RequestBody Notebook notebook)
    {
        notebookRepository.updateName(notebook.getName(),notebook.getId());
    }
}
