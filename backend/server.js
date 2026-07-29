// uvozimo express
const express = require("express");
// inicijalizujemo aplikaciju
const app = express();
// uvozimo path modul koji nam omogucava da radimo sa putanjama fajlova
const path = require("path");
// definisemo port na kom ce server raditi
const PORT = process.env.PORT || 3500;

// gde ce express da trazi staticke fajlove (html, css, js)
app.use('/', express.static(path.join(__dirname, "public")));

// definisemo rute za nasu aplikaciju
app.use('/', require("./routes/root"));

// definisemo rutu za 404 gresku
app.all(/.*/, (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
})

// pokrecemo server da slusa zahteve
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
