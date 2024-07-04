package com.example.controller;

import cn.hutool.core.util.ObjectUtil;
import com.example.common.Result;
import com.example.common.enums.ResultCodeEnum;
import com.example.entity.Comment;
import com.example.entity.User;
import com.example.entity.UserData;
import com.example.service.CommentService;
import com.example.service.userService;
import com.example.service.userDataService;
import com.github.pagehelper.PageInfo;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

/*
* 用户相关接口
* */
@RestController
@RequestMapping("/user")
public class UserController {

    @Resource
    private userService userService;
    @Resource
    private userDataService userDataService;

    @Resource
    private CommentService commentService;;

    @PostMapping("/add")
    public Result add(@RequestBody User user){
        //校验
        if(ObjectUtil.isEmpty(user.getUsername()) || ObjectUtil.isEmpty(user.getPassword())){
            return Result.error(ResultCodeEnum.PARAM_LOST_ERROR);
        }
        userService.add(user);
        return Result.success();
    }

    @GetMapping("/selectAll")
    public Result selectAll(User user){
        List<User>  list  = userService.selectAll(user);
        return Result.success(list);
    }

    @GetMapping("/selectById/{id}")
    public Result selectAll(@PathVariable Integer id) {
        User user = userService.selectById(id);
        return Result.success(user);
    }

    /**
     * 分页条件查询
     */
    @GetMapping("/selectPage")
    public Result selectPage(User user,
                             @RequestParam(defaultValue = "1") Integer pageNum,
                             @RequestParam(defaultValue = "10") Integer pageSize) {
        PageInfo<User> pageInfo = userService.selectPage(user, pageNum, pageSize);
        return Result.success(pageInfo);
    }

    @PostMapping("/addUserData")
    public Result add(@RequestBody UserData userData){
        userDataService.add(userData);
        return Result.success();
    }

    @GetMapping("/selectUserData")
    public Result selectUserData(UserData userData){
        List<UserData>  list  = userDataService.selectAll(userData);
        return Result.success(list);
    }

    @GetMapping("/selectUserDataById/{userid}")
    public Result selectUserData(@PathVariable Integer userid) {
        UserData userData = userDataService.selectById(userid);
        return Result.success(userData);
    }

    @PutMapping("/updateUserData")
    public Result update(@RequestBody UserData userData) {
        userDataService.updateById(userData);
        return Result.success();
    }

    @PutMapping("/update")
    public Result update(@RequestBody User business) {
        userService.updateById(business);
        return Result.success();
    }

    @DeleteMapping("/delete/{id}")
    public Result delete(@PathVariable Integer id) {
        userService.deleteById(id);
        return Result.success();
    }

    /**
     * 批量删除
     */
    @DeleteMapping("/delete/batch")
    public Result deleteBatch(@RequestBody List<Integer> ids) {
        userService.deleteBatch(ids);
        return Result.success();
    }

    /*
    评论
     */
    @PostMapping("/addComment")
    public Result add(@RequestBody Comment comment){
        commentService.add(comment);
        return Result.success();
    }

    @GetMapping("/selectAllComment")
    public Result selectAll(Comment comment){
        List<Comment>  list  = commentService.selectAll(comment);
        return Result.success(list);
    }
}
