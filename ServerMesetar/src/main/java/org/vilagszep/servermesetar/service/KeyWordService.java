package org.vilagszep.servermesetar.service;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.vilagszep.servermesetar.data.KeyWord;
import org.vilagszep.servermesetar.data.dto.story.StoryDto;
import org.vilagszep.servermesetar.data.dto.story.helper.KeyWordDto;

import java.util.List;
import java.util.Set;

//this is an interface for a service. In case you want to add a new database, you can implement this
@Service
public interface KeyWordService {

    List<KeyWordDto> getAll();

    KeyWordDto addKeyWord(KeyWordDto keyWordDto);
}
