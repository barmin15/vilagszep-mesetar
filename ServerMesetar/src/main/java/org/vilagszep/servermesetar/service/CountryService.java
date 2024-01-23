package org.vilagszep.servermesetar.service;

import org.springframework.stereotype.Service;
import org.vilagszep.servermesetar.data.dto.CountryCultureDto;

import java.util.List;

@Service
public interface CountryCultureService {

    List<CountryCultureDto> getAll();

    CountryCultureDto create(CountryCultureDto countryCultureDto);
}
