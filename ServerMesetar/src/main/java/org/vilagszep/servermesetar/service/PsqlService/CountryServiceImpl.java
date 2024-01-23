package org.vilagszep.servermesetar.service.PsqlService;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.vilagszep.servermesetar.data.Country;
import org.vilagszep.servermesetar.data.dto.story.helper.CountryDto;
import org.vilagszep.servermesetar.repository.CountryRepository;
import org.vilagszep.servermesetar.service.CountryService;

import java.util.List;

//this object is a service for country requests
@Service
@RequiredArgsConstructor
public class CountryServiceImpl implements CountryService {

    //bean
    private final CountryRepository countryRepository;
    private final static String NO_ELEMENT = "THIS_IS_FOR_ALL_ENTITIES";

    //this method will return all the elements, except  'NO_ELEMENT'
    @Override
    public List<CountryDto> getAll() {
        return countryRepository.findAllByElementIsNotOrderByElementAsc(NO_ELEMENT).stream().map(country -> CountryDto.builder()
                .publicId(country.getPublicId())
                .element(country.getElement())
                .build()
        ).toList();
    }

    //this method will add a new element to the database
    @Override
    public CountryDto create(CountryDto countryDto) {
        Country country = countryRepository.save(Country.builder()
                .element(countryDto.getElement())
                .build());

        return CountryDto.builder().publicId(country.getPublicId()).element(countryDto.getElement()).build();
    }
}
