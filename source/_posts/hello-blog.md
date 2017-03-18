---
layout:     post
title:      "Welcome to Chaoming Blog"
subtitle:   " \"Hello World, Hello Blog\""
date:       2017-03-18 11:23:26
author:     "Damon"
header-img: "post-bg-unix-linux.jpg"
tags:
    - 生活
---

> “Yeah It's on. ”


## 前言

Chaoming 的 Blog 就这么开通了。

[跳过废话，直接看技术实现 ](#build)



2017 年，学习web前端快2年了,终于抽出了时间把自己的博客搞起来。让文字有个安身的地方。


作为一个程序员， Blog 这种轮子要是挂在大众博客程序上就太没意思了。一是觉得大部分 Blog 服务都太丑，二是觉得不能随便定制不好玩。之前因为太懒没有折腾，结果就一直连个写 Blog 的地儿都没有。

这段时间上github的时候hexo引起了我的注意，hexo理念是快速简洁,加上可以使用Markdown语法写博文,正合我胃口!
<p id = "build"></p>
---

## 正文

接下来说说搭建这个博客的技术细节。  

Hexo其优点非常明显：

* **Markdown** 带来的优雅写作体验
* 非常熟悉的 Git workflow ，**Git Commit 即 Blog Post**
* 利用 GitHub Pages 的域名和免费无限空间，不用自己折腾主机
    * 如果需要自定义域名，也只需要简单改改 DNS 加个 CNAME 就好了


本来觉得最大的缺点可能是 GitHub 在国内访问起来太慢，所以第二天一起床就到 GitCafe(Chinese GitHub Copy) 迁移了一个[镜像](http://huxpro.gitcafe.io)出来，结果还是巨慢。

哥哥可是个前端好嘛！ 果断开 Chrome DevTool 查了下网络请求，原来是 **pending 在了 Google Fonts** 上，页面渲染一直被阻塞到请求超时为止，难怪这么慢。  
忍痛割爱，只好把 Web Fonts 去了（反正超时看到的也只能是 fallback ），果然一下就正常了!

---

配置的过程中也没遇到什么坑，基本就是 Git 的流程，相当顺手。

Theme 我是直接使用huxblog的主题,因为绝命毒师头像一下子吸引了我,最爱这部神美剧了有木有。加上自己懒得重新布局页面的，全部沿用huxblog的主题元素。这么一来,博客一下午弄了3个小时就上线了，直接**hexo d**提交到自己github上。这真的超级方便！瞬间爱上Hexo！

不得不说，提交git的时候遇到了一个小坑。因为我写这个Markdown的时候用的命令行是sublimetext提供的powershell，运行啊，开服务啊之类的都通通不是问题。但是到了我使用**hexo d**提交代码的时候就出事了,直接报错&%$*&^*%^。 气死~  后来才找到原因，原来powershell没有权限让我输入git的用户名和密码，所以才提交失败。后来立马换上git bash命令行，果然瞬间解决了问题，就是上传速度还是硬伤（一如既往的慢）。

最后，博客顺利上线。决定以后要多写写文字，多弄弄博客，在写这篇博文的过程中，才发现自己的文字表达能力比起以前退步很多很多，有时候词穷了，有时候逻辑不清晰了，各种毛病。一句话总结就是，不能好好说话了。

以后，好好说话呗。。。



