package org.vilagszep.servermesetar.data;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.vilagszep.servermesetar.data.entityEnum.AgeGroup;
import org.vilagszep.servermesetar.data.entityEnum.Continent;
import org.vilagszep.servermesetar.data.entityEnum.CopyRight;

import java.util.Set;
import java.util.UUID;

//this (object) 'entity' is created as a reflection of the database table
//an instance of this with data will represent a record of the table --using ORM
@Entity(name = "stories")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Story {
    @JsonIgnore
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String publicId;

    @Column(columnDefinition = "TEXT")
    private String title;

    @Column(columnDefinition = "TEXT")
    private String comment;

    @Column(columnDefinition = "TEXT")
    private String text;

    @Column(columnDefinition = "TEXT")
    private String source;

    @Enumerated(EnumType.STRING)
    private Continent continent;

    @Enumerated(EnumType.STRING)
    private AgeGroup ageGroup;

    @Enumerated(EnumType.STRING)
    private CopyRight copyRight;


    @ManyToMany()
    @JsonBackReference
    private Set<Country> countries;

    @ManyToMany()
    @JsonBackReference
    private Set<StoryBag> storyBags;

    @ManyToMany()
    @JsonBackReference
    private Set<KeyWord> keyWords;


    @ManyToMany(mappedBy = "favouriteStories")
    @JsonManagedReference
    private Set<User> usersWhoLiked;

    //this method will generate a public id for a newly created element
    @PrePersist
    private void generatePublicId() {
        if (publicId == null) {
            publicId = UUID.randomUUID().toString();
        }
    }

    //this method will remove all connections of this record before deleting from the database
    @PreRemove
    private void removeAssociations() {
        this.keyWords.forEach(keyWord -> keyWord.getStories().remove(this));
        this.storyBags.forEach(storyBag -> storyBag.getStories().remove(this));
        this.countries.forEach(country -> country.getStories().remove(this));
        this.usersWhoLiked.forEach(user -> user.getFavouriteStories().remove(this));
    }
}
