package com.example.service;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.util.ObjectUtil;
import com.example.common.enums.ResultCodeEnum;
import com.example.common.enums.RoleEnum;
import com.example.entity.Account;
import com.example.entity.User;
import com.example.exception.CustomException;
import com.example.mapper.userMapper;
import com.example.utils.TokenUtils;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Objects;

/*
* 用户相关方法
* */
@Service
public class userService {
    @Resource
    private userMapper userMapper;

    public void add(User user) {
        User dbBusiness = this.selectByUsername(user.getUsername());
        if(ObjectUtil.isNotEmpty(dbBusiness)){
            throw new CustomException(ResultCodeEnum.USER_EXIST_ERROR);
        }
        user.setRole(RoleEnum.NormalUser.name());
        userMapper.insert(user);
    }

    public void updateById(User user) {
        User dbUser1 = selectById(user.getId());
        if (ObjectUtil.isEmpty(dbUser1)) {
            throw new CustomException(ResultCodeEnum.USER_NOT_EXIST_ERROR);
        }
        User dbUser2 = this.selectByUsername(user.getUsername());
        //  根据当前更新的商家的账号查询数据库  如果数据库存在跟当前更新商家一样账号的数据  那么当前的更新是不合法的  数据重复了
        if (ObjectUtil.isNotEmpty(dbUser2) && !Objects.equals(dbUser2.getId(), user.getId())) {
            throw new CustomException(ResultCodeEnum.USER_EXIST_ERROR);
        }
        userMapper.updateById(user);
    }

    /*
    * 根据用户名查询
    */
    private User selectByUsername(String username) {
        User params = new User();
        params.setUsername(username);
        List<User> list = this.selectAll(params);
        return CollUtil.isEmpty(list) ? null : list.get(0);
    }

    /*
     * 根据id查询
     */
    public User selectById(Integer id) {
        User params = new User();
        params.setId(id);
        List<User> list = this.selectAll(params);
        return list.size() == 0 ? null : list.get(0);
    }

    public void deleteById(Integer id) {
        userMapper.deleteById(id);
    }

    /*批量删除*/
    public void deleteBatch(List<Integer> ids) {
        for (Integer id : ids) {
            this.deleteById(id);
        }
    }

    public List<User> selectAll(User user){
        return userMapper.selectAll(user);
    }

    public PageInfo<User> selectPage(User user, Integer pageNum, Integer pageSize) {
        PageHelper.startPage(pageNum, pageSize);
        List<User> list = userMapper.selectAll(user);
        return PageInfo.of(list);
    }

    /**
     * 商家登录
     */
    public Account login(Account account) {
        Account dbUser = this.selectByUsername(account.getUsername());
        if (ObjectUtil.isNull(dbUser)) {
            throw new CustomException(ResultCodeEnum.USER_NOT_EXIST_ERROR);
        }
        if (!account.getPassword().equals(dbUser.getPassword())) {   // 比较用户输入密码和数据库密码是否一致
            throw new CustomException(ResultCodeEnum.USER_ACCOUNT_ERROR);
        }
        // 生成token
        String tokenData = dbUser.getId() + "-" + RoleEnum.NormalUser.name();
        String token = TokenUtils.createToken(tokenData, dbUser.getPassword());
        dbUser.setToken(token);
        return dbUser;
    }

    public void register(Account account) {
        User user = new User();
        BeanUtils.copyProperties(account, user);  // 拷贝账号和密码2个属性
        this.add(user);  // 添加账户信息
    }
}
