package com.example.controller;

import com.example.common.Result;
import com.example.entity.Hotsearch;
import com.example.entity.Notice;
import com.example.service.HotsearchService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

@RestController
@RequestMapping("/hotsearch")
public class HotsearchController {
    @Resource
    private HotsearchService hotsearchService;

    @PostMapping("/add")
    public Result add(@RequestBody Hotsearch hotsearch) {
        hotsearchService.add(hotsearch);
        return Result.success();
    }

    @GetMapping("/selectAll")
    public Result selectAll(Hotsearch hotsearch ) {
        List<Hotsearch> list = hotsearchService.selectAll(hotsearch);
        return Result.success(list);
    }

}
