package com.example.SonamuProject.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import org.springframework.stereotype.Service;

@Service
public class FormService {

    public String getForm(String formNumber) {
        if (formNumber.equals("0")) {
            return "";
        }
        Path path = Paths.get("src/main/resources/form/form-" + formNumber + ".sonamu");
        String form;
        try {
            form = Files.readString(path);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return form;
    }

}
