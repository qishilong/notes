<?php
/**
 * @name 获取微信用户信息并执行登录/注册
 */
function getWeiXinUserInfo(){
    // 获取临时登录code
    $code = input('code');
    // 请求微信接口，获取openid等其他信息
    $url = "https://api.weixin.qq.com/sns/jscode2session?appid=".$this->appid."&secret=". $this->appSecret."&js_code=".$code."&grant_type=authorization_code";
    // 使用file_get_content函数获取接口返回信息
    $info  = file_get_contents($url);
    // 这里是获取到的信息,解析json
    $userinfo = json_decode($info);
    // 获取openid
    $open_id = $userinfo->openid;
    // 获取session_key
    $session_key = $userinfo->session_key;
    $time = date('Y-m-d H:i:s',time());
    // 查询用户信息，根据openid
    $user = db('user');
    $userinfo = $user->where("mini_openid = '{$open_id}'")->find();
    // 如果用户信息有值，说明该用户注册过了
    if(!isset($userinfo['id'])){
        // 将用户信息写入数据库
        $res = Db::execute("INSERT INTO user (mini_openid,regtime,session_key)
                VALUES ('{$open_id}','{$time}','{$session_key}')");
    }
    else{
        // 将用户信息更新数据库
        $res = Db::execute("UPDATE user SET session_key = '{$session_key}' WHERE id = '{$userinfo['id']}'");
    }
    if($res <= 0){
        $userinfo['code'] = -1;
    }
    else{
        $userinfo['code'] = 1;
    }
    $userinfo['mini_openid'] = $open_id;
    $userinfo['session_key'] = $session_key;
    $result = json_encode($userinfo);
    return $result;
}
?>