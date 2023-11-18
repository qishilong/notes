# Mac OS 下三种修改Hosts文件的方法

## 一.系统偏好设置修改

1.打开系统偏好设置，底部有一个Hosts的快捷入口
2.输入ip和hostname后，回车确定，勾选改host即可

![img](https://qiniucloud.qishilong.space/images/webp)

## 二.终端命令行修改

>   sudo vi /etc/hosts

![img](https://qiniucloud.qishilong.space/images/webp-20231116140942394)

1.输入本机密码后，打开hosts文件，键盘输入 i （插入），修改hosts文件后，按 esc 键退出,再按shift+：键，再输入w和q，保存退出

2.不保存退出，则按q和！键

## 三.直接修改系统Hosts文件

### 方法A

1.打开Finder，按快捷键组合 Shift+Command+G 查找文件，输入/etc/hosts,确认前往

![img](https://qiniucloud.qishilong.space/images/webp-20231116140942406)

2.进入文件夹后，复制该文件到桌面，修改成功后保存，将原先的host文件替换掉即可

### 方法B

1.1.打开Finder，按快捷键组合 Shift+Command+G 查找文件，输入/private,确认前往后可看到 etc 文件夹，邮件选择'显示简介'，在底部打开‘共享和权限’

![img](https://qiniucloud.qishilong.space/images/webp-20231116140942418)

2.将everyone的权限改为‘读与写’，保存后直接修改hosts文件，最后完成后将权限改回来