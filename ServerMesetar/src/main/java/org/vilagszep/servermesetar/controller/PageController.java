package org.vilagszep.servermesetar.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {

    @GetMapping("/login")
    public String getLoginPage(){return "forward:/index.html";}

    @GetMapping("/app/**")
    public String getAppPage(){return "forward:/index.html";}
}
