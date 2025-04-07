const express = require('express');
const path = require('path');
const app = express();

// Отдаем статические файлы из каталога ru при обращении к /ru
app.use('/ru', express.static(path.join(__dirname, 'ru')));

// Отдаем статические файлы из каталога en при обращении к /en
app.use('/en', express.static(path.join(__dirname, 'en')));

// При обращении к корневому URL перенаправляем пользователя на одну из версий
app.get('/', (req, res) => {
  // Например, можно перенаправлять на русскую версию по умолчанию
  res.redirect('/ru');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
