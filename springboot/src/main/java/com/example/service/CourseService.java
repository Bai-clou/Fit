package com.example.service;

import cn.hutool.core.util.ObjectUtil;
import com.example.common.enums.ResultCodeEnum;
import com.example.entity.Course;
import com.example.entity.CourseType;
import com.example.entity.User;
import com.example.exception.CustomException;
import com.example.mapper.CourseMapper;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Objects;

@Service
public class CourseService {
    @Resource
    private CourseMapper courseMapper;

    public void add(Course course) {

        courseMapper.insert(course);
    }

    public List<Course> selectAll(Course course) {
        return courseMapper.selectAll(course);
    }

    public Course selectById(Integer id) {
        Course params = new Course();
        params.setId(id);
        List<Course> list = this.selectAll(params);
        return list.size() == 0 ? null : list.get(0);
    }

    public List<CourseType> selectAllType(CourseType type) {
        return courseMapper.selectAllType(type);
    }

    public void deleteById(Integer id) {
        courseMapper.deleteById(id);
    }

    public void deleteBatch(List<Integer> ids) {
        for (Integer id : ids) {
            this.deleteById(id);
        }
    }

    public PageInfo<Course> selectPage(Course course, Integer pageNum, Integer pageSize) {
        PageHelper.startPage(pageNum, pageSize);
        List<Course> list = courseMapper.selectAll(course);
        return PageInfo.of(list);
    }

    public void updateById(Course course) {
        Course dbCourse1 = selectById(course.getId());
        if (ObjectUtil.isEmpty(dbCourse1)) {
            throw new CustomException(ResultCodeEnum.USER_NOT_EXIST_ERROR);
        }
        courseMapper.updateById(course);
    }
}
