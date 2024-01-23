package org.vilagszep.servermesetar.data;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.UUID;

@Entity(name = "country_cultures")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CountryCulture {
    @JsonIgnore
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column( unique = true, nullable = false)
    private String publicId;

    private String countryCulture;

    @ManyToMany(mappedBy = "countryCultures")
    @JsonBackReference
    private List<Story> stories;

    @PrePersist
    private void generatePublicId() {
        if (publicId == null) {
            publicId = UUID.randomUUID().toString();
        }
    }
}
