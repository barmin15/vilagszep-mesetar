package org.vilagszep.servermesetar.data;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.vilagszep.servermesetar.security.UserRole;

import java.util.*;

//this (object) 'entity' is created as a reflection of the database table
//an instance of this with data will represent a record of the table --using ORM
@Entity(name = "users")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class User{
    @JsonIgnore
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String publicId;

    private String login;

    private String password;

    @ManyToMany()
    @JsonBackReference
    private Set<Story> favouriteStories;

    @Enumerated(EnumType.STRING)
    private UserRole role;

    //this method will add the stories and to the user-liked-story table in the database
    public void addLikedStory(Story story){
        if(this.favouriteStories == null) this.favouriteStories = new HashSet<>();
        this.favouriteStories.add(story);
    }

    //this method will generate a public id for a newly created element
    @PrePersist
    private void generatePublicId() {
        if (publicId == null) {
            publicId = UUID.randomUUID().toString();
        }
    }

    //this method will remove all connections of this record before deleting from the database
    @PreRemove
    private void removeAssociations(){
        this.favouriteStories.forEach(story -> story.getUsersWhoLiked().remove(this));
    }
}
