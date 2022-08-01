package com.example.SonamuProject.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class FormTestController {

    @GetMapping("form-test")
    public String formTest() {
        return "form-test";
    }
}
