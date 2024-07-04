package com.example.controller;

import cn.hutool.core.util.ObjectUtil;
import com.example.common.Result;
import com.example.common.enums.ResultCodeEnum;
import com.example.entity.Course;
import com.example.entity.Share;
import com.example.entity.Sport;
import com.example.service.SportService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

@RestController
@RequestMapping("/sport")
public class SportController {
    @Resource
    private SportService sportService;

    @PostMapping("/add")
    public Result add(@RequestBody Sport sport){
        sportService.add(sport);
        return Result.success();
    }

    @GetMapping("/selectAll")
    public Result selectAll(Sport sport){
        List<Sport> list  = sportService.selectAll(sport);
        return Result.success(list);
    }

    @GetMapping("/selectById/{userid}")
    public Result selectAll(@PathVariable Integer userid) {
        List<Sport> sport = sportService.selectById(userid);
        return Result.success(sport);
    }
}
