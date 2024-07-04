package com.example.mapper;

import com.example.entity.Course;
import com.example.entity.CourseType;

import java.util.List;

public interface CourseMapper {
    int insert(Course course);

    List<Course> selectAll(Course course);

    List<CourseType> selectAllType(CourseType type);

    int deleteById(Integer id);

    int updateById(Course course);
}
