# project-talenthub

**Instal NPM**
`npm install`

**Lakukan Migrasi Sequelize**
`npx sequelize-cli db:migrate`

**Get All Artikel**
`localhost:3000/artikel`
```
    {
        "id": 34,
        "judul": "artikel - foto",
        "tgl_update": "2023-10-05T03:00:00.000Z",
        "id_kategori": 1,
        "isi": "belum ada isi",
        "foto": "1696503355822-337381216.jpeg",
        "createdAt": "2023-10-05T10:55:55.000Z",
        "updatedAt": "2023-10-05T10:55:55.000Z"
    },
```

**Post Data Artikel**
`localhost:3000/artikel`
Gunakan form untuk post data :
```
judul : (string)
tgl_update : (datetime)
id_kategori: (int)
isi : (string)
foto : (file)
```


