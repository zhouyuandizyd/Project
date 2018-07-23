var express = require('express')
var app = express()
var mysql = require('mysql')
//post请求需要引入
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json();
//var urlencodedParser = bodyParser.urlencoded({extended:false})
//连接后台数据库
var connection = mysql.createConnection({
    host:'localhost',
    port:3306,
    user:'root',
    database:'zyd'
})
connection.connect(function(err){
    if(err){
        throw err
    }
})
//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "content-type");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    //res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
//初入页面测试
app.get('/',function(req,res){
    res.send('hello world')
})
//登陆接口
app.post('/login',jsonParser,(req,res)=>{
    // console.log('...req',req.body)
    //获取该用户名的数量
    connection.query('select count(*) as num from user where username = ?',[req.body.username],(err,result,fields)=>{
        if(err) throw err;
        if(result[0].num){
            connection.query('select count(*) as num,id from user where username = ? and password = ?',[req.body.username,req.body.password],(err,result,fields)=>{
                if(result[0].num == 1){
                    res.cookie('isLogin2222', 'true');
                    res.json({
                        code:0,
                        id:result[0].id,
                        msg:'登陆成功'
                    })
                }else{
                    res.json({
                        code:-2,
                        msg:'密码错误，登陆失败'
                    })
                }
            })
        }else{ 
            //注册
            // connection.query(`insert into user (username,password,phone,birthday) values('${req.body.username}','${req.body.password}','',${+new Date()})`,(err,result,fields)=>{
            //     if(result.insertId){
            //         res.json({
            //             code:0,
            //             msg:'创建成功'
            //         })

            //     }else{
            //         res.json({
            //             code:-1,
            //             msg:'新增用户失败'
            //         })
            //     }
            // })
            res.json({
                code:-2,
                msg:'不允许创建新用户'
            })
        }
    })
})
//拉取用户列表
app.get('/userList',(req,res)=>{
    connection.query('select id,username,birthday,phone,address from user',(err,result,fields)=>{
        if(err) throw err
        res.json({
            code:0,
            data:result
        })
    })
})
//拉取角色列表
app.get('/rolerList',(req,res)=>{
    let id = req.query.id, allRoler = [];
    console.log(req.query);
    connection.query('select id,rolername from roler',(err,result,fields)=>{
        if(err) throw err
        allRoler = result
        if(id){
            connection.query(`select rid,rolername from user_roler, roler where user_roler.rid = roler.id and user_roler.status=1 and user_roler.uid=${id}`,(err,result,fields)=>{
                if(err) throw err
                console.log("result...." , result)
                res.json({
                    code:0,
                    allRoler,
                    myRoler:result
                })
            })
        }else{
            res.json({
                code:-1,
                allRoler,
                myRoler:[]
            })
        }
    })
})
//添加角色接口
app.get('/addRoler',(req,res)=>{
    let uid = req.query.uid,
        rid = req.query.rid
    //先查询用户是否拥有该角色，如果有则不添加
    connection.query(`select rid from user_roler where uid=? and rid=? and status=1`,[uid,rid],(err,result,fields)=>{
        if(err) throw err
        if(result.length){
            res.json({
                code:-2,
                msg:'已有该角色'
            })
        }else{
            connection.query(`insert into user_roler (uid,rid) values(?,?)`,[uid,rid],(err,result,fields)=>{
                if(err) throw err
                console.log(result)
                if(result.insertId){
                    res.json({
                        code:0,
                        msg:'添加角色成功'
                    })
                }else{
                    res.json({
                        code:-1,
                        msg:'添加角色失败'
                    })
                }
            })
        }
    })
})
//删除身份权限
app.get('/removeRoler',(req,res)=>{
    let uid = req.query.uid
        rid = req.query.rid
    connection.query(`update user_roler set status=0 where uid=? and rid=?`,[uid,rid],(err,result,fields)=>{
        if(err) throw err
        if(result.affectedRows){
            res.json({
                code:0,
                msg:'删除角色成功'
            })
        }else{
            res.json({
                code:-1,
                msg:'删除角色失败'
            })
        }
    })
})
// 获取权限列表
app.get('/accessList', (req, res)=>{
    let uid = req.query.uid;
    connection.query(`select access.accessname from user,user_roler,roler_access,access where user.id=user_roler.uid 
    and user_roler.rid = roler_access.rid and roler_access.aid = access.id and uid=? and user_roler.status=1 group by access.id`,[uid], function(err, result, fields) {
        if (err) throw err;
        console.log(result.length, result);
        res.json({
            code: 0,
            list: result
        })
    });   
})
//生成成绩单数据
app.get('/reportList',(req,res)=>{
    connection.query(`select id from user`,function(err,result,fields){
        if(err) throw err
        //拿到所有用户的id result
        //生成11天的成绩单
        let score = [],
            dayStr = ``
        for(let i=20; i<31; i++){
            let dayScore = []
            //给每个用户生成一个成绩
            for(let y=0; y<result.length; y++){
                dayScore.push({
                    id:result[y].id,
                    score:Math.floor(Math.random()*20)+80
                })
                dayStr += `(${result[y].id},${Math.floor(Math.random()*20)+80},'2018-07-${i}')`
            }
            score.push({
                date:`2018-07-${i}`,
                list:dayScore
            })
        }
        connection.query(`insert into report (uid,score,date) values ${dayStr.slice(0,dayStr.length-1)}`,(err,result,fields)=>{
            res.json(result)
        })
    })
})
app.get('/list',(req,res)=>{
    //查询语句
    connection.query('select * from user',function(err,result,fields){
        if(err){
            throw err
        }
        console.log('the solution is:', result)
    }) 
    //插入语句
    connection.query('insert into user (username,password,phone,birthday) values("kerry",456789,13311456743,3131231)',(err,result,fields)=>{
        if(err) throw err
        console.log('insert:',result)
    })
    //修改语句
    connection.query('update user set username="王俊凯" where username="kerry"',(err,result,fields)=>{
        if(err) throw err
        console.log('update:',result)
    })
    //删除语句
    connection.query('delect from user where id<3',(err,result,fields)=>{
        if(err) throw err
        console.log('delect',result)
    })
    res.send('111')
})
app.listen(8888)