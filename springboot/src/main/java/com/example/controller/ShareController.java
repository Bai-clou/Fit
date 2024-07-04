package com.example.controller;

import cn.hutool.core.util.ObjectUtil;
import com.example.common.Result;
import com.example.common.enums.ResultCodeEnum;
import com.example.entity.Course;
import com.example.entity.Share;
import com.example.entity.UserData;
import com.example.service.ShareService;
import com.github.pagehelper.PageInfo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.sql.Timestamp;
import java.util.List;

@RestController
@RequestMapping("/share")
public class ShareController {
    @Resource
    private ShareService shareService;

    @PostMapping("/add")
    public Result add(@RequestBody Share share){
        //校验
        if(ObjectUtil.isEmpty(share.getTitle()) || ObjectUtil.isEmpty( share.getContent())){
            return Result.error(ResultCodeEnum.PARAM_LOST_ERROR);
        }
        shareService.add(share);
        return Result.success();
    }

    @GetMapping("/selectAll")
    public Result selectAll(Share share){
        List<Share> list  = shareService.selectAll(share);
        return Result.success(list);
    }

    @GetMapping("/selectById/{userid}")
    public Result selectAll(@PathVariable Integer userid) {
        List<Share> list = shareService.selectById(userid);
        return Result.success(list);
    }

    @GetMapping("/selectByShareId/{id}")
    public Result selectByShareId(@PathVariable Integer id) {
        Share share = shareService.selectByShareId(id);
        return Result.success(share);
    }

    @GetMapping("/selectPage")
    public Result selectPage(Share share,
                             @RequestParam(defaultValue = "1") Integer pageNum,
                             @RequestParam(defaultValue = "10") Integer pageSize) {
        PageInfo<Share> pageInfo = shareService.selectPage(share, pageNum, pageSize);
        return Result.success(pageInfo);
    }

    @PutMapping("/update")
    public Result update(@RequestBody Share share) {
        shareService.update(share);
        return Result.success();
    }

    @DeleteMapping("/delete/{id}")
    public Result delete(@PathVariable Integer id) {
        shareService.deleteById(id);
        return Result.success();
    }

    /**
     * 批量删除
     */
    @DeleteMapping("/delete/batch")
    public Result deleteBatch(@RequestBody List<Integer> ids) {
        shareService.deleteBatch(ids);
        return Result.success();
    }
}
