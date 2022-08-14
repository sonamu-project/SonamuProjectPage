package com.example.SonamuProject.dto;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

public class SourceCode {

    String code;
    String typeOfCode;

    public String getTypeOfCode() {
        return typeOfCode;
    }

    public void setTypeOfCode(String typeOfCode) {
        this.typeOfCode = typeOfCode;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}
