package org.vilagszep.servermesetar.data;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.UUID;

@Entity(name = "keyWords")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class KeyWords {
    @JsonIgnore
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID publicId;

    @ManyToMany(mappedBy = "keyWords")
    @JsonBackReference
    private List<Story> stories;
}
