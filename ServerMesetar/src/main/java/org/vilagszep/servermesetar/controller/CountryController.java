package org.vilagszep.servermesetar.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.vilagszep.servermesetar.data.dto.story.helper.CountryDto;
import org.vilagszep.servermesetar.service.CountryService;

import java.util.List;

//this object is for receiving http requests for anything related to the countries stored in the database
//only users with ADMIN role can send requests to endpoints that have admin in them
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/country")
public class CountryController {
    //beans
    private final CountryService countryService;

    //this method will return all the countries from the dataabse
    @GetMapping
    public List<CountryDto> getAllCountryCulture() {
        return countryService.getAll();
    }

    //this method is to create new country records in the database
    //only users with ADMIN role can do this
    @PostMapping("/admin/add")
    public CountryDto createCountryCulture(@RequestBody CountryDto countryDto) {
        return countryService.create(countryDto);
    }
}
