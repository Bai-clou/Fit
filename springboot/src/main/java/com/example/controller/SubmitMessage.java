package com.example.controller;

import cn.hutool.http.HttpUtil;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import com.example.entity.sendMsg;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
public class SubmitMessage {
    @PostMapping("/sendMsg")
    public String sedMsg(@RequestBody sendMsg Msg) {
        String token=queryToken();
        JSONObject message = new JSONObject(Msg.getMsg());
        return send(token,Msg.getOpenid(),message);
    }

    public String queryToken() {
        String tokenUrl="https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential";
        tokenUrl=tokenUrl+"&appid=wxfcb9a9551ef8bbf6&secret=f8796845153f82e887633b5489c7aeae";
        String result= HttpUtil.get(tokenUrl);
        JSONObject jsonObject= JSONUtil.parseObj(result);
        String token=jsonObject.get("access_token").toString();
        return token;
    }

    public String send(String token, String openid, JSONObject message) {
        String msgUrl="https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token="+token;
        HashMap<String,Object> paramMap =new HashMap<>();
        paramMap.put("touser",openid);
        paramMap.put("template_id","dvXu3GQfCF-5_2aAjOD7fb-28bU9NbqWkWtaWa76XDc");
        paramMap.put("page","pages/sports/sports");

        HashMap<String,Object> data=new HashMap<>();
        data.put("thing1",formatParam((String)message.get("thing1")));
        data.put("thing7",formatParam((String)message.get("thing7")));
        data.put("character_string8",formatParam((String)message.get("character_string8")));
        data.put("thing4",formatParam((String)message.get("thing4")));
        data.put("thing9",formatParam((String)message.get("thing9")));
        paramMap.put("data",data);

        String jsonObject=JSONUtil.toJsonStr(paramMap);
        String result= HttpUtil.post(msgUrl,jsonObject);
        return result;
    }

    public HashMap<String,Object> formatParam(String value){
        HashMap<String,Object> data=new HashMap<>();
        data.put("value",value);
        return data;
    }
}
