package com.dpnotes.dpnoteit.repository;

import com.dpnotes.dpnoteit.model.Notebook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@Repository
@CrossOrigin
public interface NotebookRepository extends JpaRepository<Notebook, Long> {

    Notebook findByName(String name);

    //Apply @transactional and @modifying while updating any attribute
    @Transactional
    @Modifying
    @Query("update Notebook n set n.name=:name where n.id=:id")
    void updateName(@Param("name") String name,@Param("id") Long id);


    List<Notebook> findAllByEmail(String email);


}
