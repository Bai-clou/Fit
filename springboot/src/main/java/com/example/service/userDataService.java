package com.example.service;

import cn.hutool.core.util.ObjectUtil;
import com.example.common.enums.ResultCodeEnum;
import com.example.common.enums.RoleEnum;
import com.example.entity.User;
import com.example.entity.UserData;
import com.example.exception.CustomException;
import com.example.mapper.userDataMapper;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Objects;

@Service
public class userDataService {
    @Resource
    private userDataMapper userDataMapper;

    public List<UserData> selectAll(UserData userData) {
        return userDataMapper.selectAll(userData);
    }

    public UserData selectById(Integer userid) {
        UserData params = new UserData();
        params.setUserid(userid);
        List<UserData> list = this.selectAll(params);
        return list.size() == 0 ? null : list.get(0);
    }

    public void updateById(UserData userData) {
        UserData dbUser1 = selectById(userData.getUserid());
        if (ObjectUtil.isEmpty(dbUser1)) {
            throw new CustomException(ResultCodeEnum.USER_NOT_EXIST_ERROR);
        }
        userDataMapper.updateById(userData);
    }

    public void add(UserData userData) {
        userDataMapper.insert(userData);
    }
}
