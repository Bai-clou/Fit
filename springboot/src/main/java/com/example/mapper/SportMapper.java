package com.example.mapper;

import com.example.entity.Sport;

import java.util.List;

public interface SportMapper {
    int insert(Sport sport);

    List<Sport> selectAll(Sport sport);
}
