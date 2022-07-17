package com.example.SonamuProject.controller;


import com.example.SonamuProject.service.FormService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class HomeController {

    private final FormService formService;

    public HomeController(FormService formService) {
        this.formService = formService;
    }

    @GetMapping("/")
    public String home(Model model, @RequestParam(value = "form", defaultValue = "0") String formNumber) {
        String form = formService.getForm(formNumber);
        model.addAttribute("source", form);
        return "index";
    }

    @GetMapping("/form-popup")
    public String formPopup() {
        return "form-popup";
    }

}
