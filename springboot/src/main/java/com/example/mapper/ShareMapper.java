package com.example.mapper;

import com.example.entity.Course;
import com.example.entity.Share;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

public interface ShareMapper {
    int insert(Share share);

    List<Share> selectAll(Share share);

    int updateById(Share share);

    int deleteById(Integer id);
}
