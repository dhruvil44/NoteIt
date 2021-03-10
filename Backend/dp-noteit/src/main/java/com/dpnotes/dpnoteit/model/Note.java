package com.dpnotes.dpnoteit.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "note")
@JsonIgnoreProperties(ignoreUnknown=true)
public class Note {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name="title")
    private String title;

    @Column(name="text")
    private String text;

    @JsonIgnore
    @JoinColumn(name="notebook_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Notebook notebook;

    @Column(name="pinned")
    private boolean pinned;

    @Column(name="email")
    private String email;

    @Column(name="last_modified_on")
    private Date lastModifiedOn;

    public Note()
    {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Notebook getNotebook() {
        return notebook;
    }

    public void setNotebook(Notebook notebook) {
        this.notebook = notebook;
    }

    public Date getLastModifiedOn() {
        return lastModifiedOn;
    }

    public void setLastModifiedOn(Date lastModifiedOn) {
        this.lastModifiedOn = lastModifiedOn;
    }

    public boolean isPinned() {
        return pinned;
    }

    public void setPinned(boolean pinned) {
        this.pinned = pinned;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    //adding a convinience method
    public void add(Notebook notebook)
    {
        this.notebook = notebook;
    }


    @Override
    public String toString() {
        return "Note{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", text='" + text + '\'' +
                ", notebook=" + notebook +
                ", pinned=" + pinned +
                ", email='" + email + '\'' +
                ", lastModifiedOn=" + lastModifiedOn +
                '}';
    }
}
