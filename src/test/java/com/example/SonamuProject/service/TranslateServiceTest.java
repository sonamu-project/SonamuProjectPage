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
        String code = "// SPDX-License-Identifier: MIT\n"
            + "pragma solidity ^0.8.13;\n"
            + "\n"
            + "library IterableMapping {\n"
            + "    // Iterable mapping from address to uint;\n"
            + "    struct Map {\n"
            + "        address[] keys;\n"
            + "        mapping(address => uint) values;\n"
            + "        mapping(address => uint) indexOf;\n"
            + "        mapping(address => bool) inserted;\n"
            + "    }\n"
            + "\n"
            + "    function get(Map storage map, address key) public view returns (uint) {\n"
            + "        return map.values[key];\n"
            + "    }\n"
            + "\n"
            + "    function getKeyAtIndex(Map storage map, uint index) public view returns (address) {\n"
            + "        return map.keys[index];\n"
            + "    }\n"
            + "\n"
            + "    function size(Map storage map) public view returns (uint) {\n"
            + "        return map.keys.length;\n"
            + "    }\n"
            + "\n"
            + "    function set(\n"
            + "        Map storage map,\n"
            + "        address key,\n"
            + "        uint val\n"
            + "    ) public {\n"
            + "        if (map.inserted[key]) {\n"
            + "            map.values[key] = val;\n"
            + "        } else {\n"
            + "            map.inserted[key] = true;\n"
            + "            map.values[key] = val;\n"
            + "            map.indexOf[key] = map.keys.length;\n"
            + "            map.keys.push(key);\n"
            + "        }\n"
            + "    }\n"
            + "\n"
            + "    function remove(Map storage map, address key) public {\n"
            + "        if (!map.inserted[key]) {\n"
            + "            return;\n"
            + "        }\n"
            + "\n"
            + "        delete map.inserted[key];\n"
            + "        delete map.values[key];\n"
            + "\n"
            + "        uint index = map.indexOf[key];\n"
            + "        uint lastIndex = map.keys.length - 1;\n"
            + "        address lastKey = map.keys[lastIndex];\n"
            + "\n"
            + "        map.indexOf[lastKey] = index;\n"
            + "        delete map.indexOf[key];\n"
            + "\n"
            + "        map.keys[index] = lastKey;\n"
            + "        map.keys.pop();\n"
            + "    }\n"
            + "}\n"
            + "\n"
            + "contract TestIterableMap {\n"
            + "    using IterableMapping for IterableMapping.Map;\n"
            + "\n"
            + "    IterableMapping.Map private map;\n"
            + "\n"
            + "    function testIterableMap() public {\n"
            + "        map.set(address(0), 0);\n"
            + "        map.set(address(1), 100);\n"
            + "        map.set(address(2), 200); // insert\n"
            + "        map.set(address(2), 200); // update\n"
            + "        map.set(address(3), 300);\n"
            + "\n"
            + "        for (uint i = 0; i < map.size(); i++) {\n"
            + "            address key = map.getKeyAtIndex(i);\n"
            + "\n"
            + "            assert(map.get(key) == i * 100);\n"
            + "        }\n"
            + "\n"
            + "        map.remove(address(1));\n"
            + "\n"
            + "        // keys = [address(0), address(3), address(2)]\n"
            + "        assert(map.size() == 3);\n"
            + "        assert(map.getKeyAtIndex(0) == address(0));\n"
            + "        assert(map.getKeyAtIndex(1) == address(3));\n"
            + "        assert(map.getKeyAtIndex(2) == address(2));\n"
            + "    }\n"
            + "}\n";
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