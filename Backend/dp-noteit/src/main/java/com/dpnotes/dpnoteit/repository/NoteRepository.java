package com.dpnotes.dpnoteit.repository;

import com.dpnotes.dpnoteit.model.Note;
import com.dpnotes.dpnoteit.model.Notebook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@Repository
@CrossOrigin
@RepositoryRestResource(path="notes")
public interface NoteRepository extends JpaRepository<Note, Long> {

    List<Note> findAllByNotebook(Notebook notebook);

    List<Note> findAllByPinned(boolean isPinned);

    List<Note> findByTitleContaining(String title);

    List<Note> findAllByNotebookAndTitleContaining(Notebook notebook, String title);

    //getting all notes
    List<Note> findAllByEmail(String email);

    //get all pinned notes
    List<Note> findAllByEmailAndPinned(String email, boolean isPinned);

}
