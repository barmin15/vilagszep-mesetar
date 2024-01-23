package org.vilagszep.servermesetar.service.PsqlService;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.vilagszep.servermesetar.data.KeyWord;
import org.vilagszep.servermesetar.data.dto.story.helper.KeyWordDto;
import org.vilagszep.servermesetar.repository.KeyWordRepository;
import org.vilagszep.servermesetar.service.KeyWordService;

import java.util.List;

//this object is a service for keyword requests
@Service
@RequiredArgsConstructor
public class KeyWordServiceImpl implements KeyWordService {
    //bean
    private final KeyWordRepository keyWordRepository;
    private final static String NO_ELEMENT = "THIS_IS_FOR_ALL_ENTITIES";

    //this method will return all the elements, except  'NO_ELEMENT'
    @Override
    public List<KeyWordDto> getAll() {
        List<KeyWord> keyWords = keyWordRepository.findAllByElementIsNotOrderByElementAsc(NO_ELEMENT);

        return keyWords.stream()
                .map(keyWord -> KeyWordDto.builder().publicId(keyWord.getPublicId()).element(keyWord.getElement()).build()).toList();
    }

    //this method will add a new element to the database
    @Override
    public KeyWordDto addKeyWord(KeyWordDto keyWordDto) {
        KeyWord keyWord = keyWordRepository.save(KeyWord.builder().element(keyWordDto.getElement()).build());

        return KeyWordDto.builder().publicId(keyWord.getPublicId()).element(keyWord.getElement()).build();
    }
}
