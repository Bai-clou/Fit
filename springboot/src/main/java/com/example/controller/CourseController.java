package com.example.controller;

import cn.hutool.core.util.ObjectUtil;
import com.example.common.Result;
import com.example.common.enums.ResultCodeEnum;
import com.example.entity.Course;
import com.example.entity.CourseType;
import com.example.entity.User;
import com.example.service.CourseService;
import com.github.pagehelper.PageInfo;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

@RestController
@RequestMapping("/course")
public class CourseController {

    @Resource
    private CourseService courseService;

    @PostMapping("/add")
    public Result add(@RequestBody Course course){
        //校验
        if(ObjectUtil.isEmpty(course.getTitle()) || ObjectUtil.isEmpty( course.getType())){
            return Result.error(ResultCodeEnum.PARAM_LOST_ERROR);
        }
        courseService.add(course);
        return Result.success();
    }

    @GetMapping("/selectAll")
    public Result selectAll(Course course){
        List<Course> list  = courseService.selectAll(course);
        return Result.success(list);
    }

    @GetMapping("/selectById/{id}")
    public Result selectAll(@PathVariable Integer id) {
        Course course = courseService.selectById(id);
        return Result.success(course);
    }

    @GetMapping("/selectPage")
    public Result selectPage(Course course,
                             @RequestParam(defaultValue = "1") Integer pageNum,
                             @RequestParam(defaultValue = "10") Integer pageSize) {
        PageInfo<Course> pageInfo = courseService.selectPage(course, pageNum, pageSize);
        return Result.success(pageInfo);
    }

    @GetMapping("/selectAllType")
    public Result selectAllType(CourseType type){
        List<CourseType> list  = courseService.selectAllType(type);
        return Result.success(list);
    }

    @DeleteMapping("/delete/{id}")
    public Result delete(@PathVariable Integer id) {
        courseService.deleteById(id);
        return Result.success();
    }

    /**
     * 批量删除
     */
    @DeleteMapping("/delete/batch")
    public Result deleteBatch(@RequestBody List<Integer> ids) {
        courseService.deleteBatch(ids);
        return Result.success();
    }

    @PutMapping("/update")
    public Result update(@RequestBody Course course) {
        courseService.updateById(course);
        return Result.success();
    }
}
