package org.vilagszep.servermesetar.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.vilagszep.servermesetar.data.dto.CountryCultureDto;
import org.vilagszep.servermesetar.service.CountryCultureService;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/country_culture")
public class CountryCultureController {

    private final CountryCultureService countryCultureService;

    @GetMapping
    public List<CountryCultureDto> getAllCountryCulture(){
        return countryCultureService.getAll();
    }

    @PostMapping("/admin/add")
    public CountryCultureDto createCountryCulture(@RequestBody CountryCultureDto countryCultureDto){
        return countryCultureService.create(countryCultureDto);
    }
}
