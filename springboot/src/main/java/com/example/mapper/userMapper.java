package com.example.mapper;

import com.example.entity.User;

import java.util.List;

/*
*用户相关数据访问接口
* */
public interface userMapper {
    List<User> selectAll(User user);

    int insert(User user);

    int updateById(User user);

    int deleteById(Integer id);
}
