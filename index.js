const express= require('express');
const app=express();
const path=require('node:path')
app.use(express.json());
// cấu hình kiểu tập tin template
app.engine('.html', require('ejs').__express);
// Cấu hình thư mục template views
app.set('views', path.join(__dirname, 'views'));
// Without this you would need to
// supply the extension to res.render()
// ex: res.render('users.html').
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req,res,next)=>{
    res.send('hello express');
});
app.get('/', (req,res,next)=>{
    const user={
        id:1,
        name:'tho',
        email:'tho@gmail.com'
    }
    const users=[
        {id:1,
        name:'tho',
        email:'tho@gmail.com'},
         {id:2,
        name:'ho',
        email:'ho@gmail.com'}

    ]
    const title="home page"
    res.render('index',{user})
});
app.get('/blog',(req,res,next)=>{
    const {pagelimit}=req.query
    res.send('blog page');
})
app.get('/blog/:id',(req,res,next)=>{
    // const id=req.params.id;
    const {id}=req.params;
    res.send('blog page detail'+id);
})
app.get('/tin-tuc/:slug',(req,res,next)=>{
    res.send('blog page with slug');
})
app.get('/user', (req, res) => {
  res.json({ name: 'John', age: 30 });
});
app.post('/users',(req,res)=>{
    res.send('Method Post')
})
app.put('/users',(req,res)=>{
    res.send('Method Put')
})
//tạo server
app.listen(8080,()=>{
    console.log('server running at http://localhost:8080');
})
