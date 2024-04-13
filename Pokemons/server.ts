import express from 'express';

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use(express.json({ limit: '1mb' }));

app.get('/', (req, res) => {
  res.render('index', {pageTitle : "Thuis"});
});

app.listen(app.get('port'), () => {
  console.log(`Server running on port ${app.get('port')}`);
});