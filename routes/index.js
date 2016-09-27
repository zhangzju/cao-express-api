var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ExpressUserSystem' });
});

router.put('/', function(req, res, next){
  res.send('Default put request!');
});

router.get('/login', function(req, res){
  res.render('login.html', { title: 'User Login'});
});

router.post('/login', function(req, res){
  var User = global.dbHandle.getModel('user');
  var uname = req.body.uname;
  User.findOne({name:uname}, function(err, doc){
    if(err){
      res.send(500);
      console.log(err);
    }else if(!doc){
      res.session.error = '用户名不存在';
      res.send(404);
      res.redirect("/login");
    }else{
      if (req.body.upwd != doc.password) {
        req.session.error = "密码错误";
        res.send(404);
        res.redirect("/login");
      }else{
        req.session.user = doc;
        // res.send(200);
        res.redirect("/home");
      }
    }
  });
});

router.get('/register', function(req, res){
  res.render('register.html',{title: 'User Register'});
});

router.post('/register', function(req, res){
  var User = global.dbHandle.getModel('user');
  var uname = req.body.uname;
  var upwd = req.body.upwd;
  User.findOne({name: uname},function(err,doc){   // 同理 /login 路径的处理方式
        if(err){
            res.send(500);
            req.session.error =  '网络异常错误！';
            console.log(err);
        }else if(doc){
            req.session.error = '用户名已存在！';
            res.send(500);
        }else{
            User.create({                             // 创建一组user对象置入model
                name: uname,
                password: upwd
            },function(err,doc){
                 if (err) {
                        res.send(500);
                        console.log(err);
                    } else {
                        req.session.error = '用户名创建成功！';
                        res.send(200);
                    }
                });
        }
    });
});

router.get('/home', function(req, res) {
  if (!req.session.user) {
    req.session.error = "请先登录";
    res.redirect("/login");
  }
  res.render('home.html', {title: 'Home'});
});

router.get('/logout', function(req, res) {
    req.session.user = null;
    req.session.error = null;
    res.redirect("/");
});

module.exports = router;
