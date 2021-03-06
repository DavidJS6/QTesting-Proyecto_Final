package com.example.qtestingserver.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class HomeController {

    @RequestMapping(
            value = "/",
            method = RequestMethod.GET
    )
    public String index() {
        return "index";
    }

    @RequestMapping(
            value = "/home",
            method = RequestMethod.GET
    )
    public String homePage(){
        return "home";
    }

}
