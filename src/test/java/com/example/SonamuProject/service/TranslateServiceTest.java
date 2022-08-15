package com.example.SonamuProject.service;

import com.example.SonamuProject.dto.SourceCode;
import java.io.FileNotFoundException;
import java.io.UnsupportedEncodingException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class TranslateServiceTest {

    private SourceCode sourceCode;

    @BeforeEach
    void setUp() {
        // 번역할 코드를 입력하고 테스트 가능
        String code = "";
        sourceCode = new SourceCode();
        sourceCode.setCode(code);
        sourceCode.setTypeOfCode("solidity");
    }

    @Test
    void viewResult() throws FileNotFoundException, UnsupportedEncodingException {
        TranslateService service = new TranslateService();
        String result = service.translate(sourceCode);
        System.out.println(result);
    }

}