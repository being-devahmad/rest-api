const express = require('express')
const app = express()
const port = 8080
const path = require('path')
const { v4: uuidv4 } = require('uuid');
uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
var methodOverride = require('method-override')

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.set(express.static(path.join(__dirname, 'public')))


let posts = [
    {
        id: uuidv4(),
        username: 'apna college',
        content: "i love coding",
    },
    {
        id: uuidv4(),
        username: 'ahmadowais',
        content: "i love coding 2",
    },
    {
        id: uuidv4(),
        username: 'muhammadahmad',
        content: "i love coding 3",
    },
    {
        id: uuidv4(),
        username: 'hellocoding',
        content: "i love coding 4",
    },
];


app.get("/posts", (req, res) => {
    res.render('index.ejs', { posts });
})
app.get("/posts/new", (req, res) => {
    res.render('new.ejs');
})
app.post("/posts", (req, res) => {
    // console.log(req.body);
    let { username, content } = req.body;
    let id = uuidv4()
    posts.push({ id, username: username, content: content })

    // res.send("post request working");
    res.redirect("/posts");
});
app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    console.log(post)
    res.render("show.ejs", { post });
    // res.redirect("/posts");
});
app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    console.log(post)
    // res.send("patch post working");
    res.redirect("/posts");
});
app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render('edit.ejs', { post: post });
});
app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
    // res.render('edit.ejs', { post: post });
    // res.send("deleted successfully");
});


app.listen(port, () => console.log(`Example app listening on port ${port}`))