package org.vilagszep.servermesetar.data;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.UUID;

//this (object) 'entity' is created as a reflection of the database table
//an instance of this with data will represent a record of the table --using ORM
@Entity(name = "countries")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Country {
    @JsonIgnore
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column( unique = true, nullable = false)
    private String publicId;

    private String element;

    @ManyToMany(mappedBy = "countries")
    @JsonBackReference
    private List<Story> stories;

    //this method will generate a public id for a newly created element
    @PrePersist
    private void generatePublicId() {
        if (publicId == null) {
            publicId = UUID.randomUUID().toString();
        }
    }
}
