package org.vilagszep.servermesetar.service.PsqlService;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.vilagszep.servermesetar.data.CountryCulture;
import org.vilagszep.servermesetar.data.dto.CountryCultureDto;
import org.vilagszep.servermesetar.repository.CountryCultureRepository;
import org.vilagszep.servermesetar.service.CountryCultureService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CountryCultureServiceImpl implements CountryCultureService {

    private final CountryCultureRepository countryCultureRepository;

    @Override
    public List<CountryCultureDto> getAll() {
        return countryCultureRepository.findAll().stream().map(countryCulture -> CountryCultureDto.builder()
                .publicId(countryCulture.getPublicId())
                .countryCulture(countryCulture.getCountryCulture())
                .build()
        ).toList();
    }

    @Override
    public CountryCultureDto create(CountryCultureDto countryCultureDto) {
        CountryCulture countryCulture = countryCultureRepository.save(CountryCulture.builder()
                .countryCulture(countryCultureDto.getCountryCulture())
                .build());

        return CountryCultureDto.builder().publicId(countryCulture.getPublicId()).countryCulture(countryCultureDto.getCountryCulture()).build();
    }
}
