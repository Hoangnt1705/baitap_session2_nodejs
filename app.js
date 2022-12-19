const express = require('express')
const app = express()
const port = 3000
const fs = require('fs');
const bodyParser = require('body-parser');
var multer = require('multer');
const { log } = require('console');
var upload = multer();
const router = express.Router();
//config body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// for parsing multipart/form-data
app.use(upload.array());
app.use(express.static('public'));
let pathJSON = './starter/users.json';


const checkExist = (req, res, next) => {
    // Lấy id và email từ request
    const { id, email } = req.params;
  
    // Đọc file JSON và parse dữ liệu thành object
    fs.readFile(pathJSON, { encoding: "utf8" }, (err, data) => {
      if (err) throw err;
  
      // Tìm kiếm user theo id và email
      const dataUser = JSON.parse(data);
      const user = dataUser.find(user => user._id === id || user.email === email);
        console.log(user);
      // Nếu không tìm thấy user, trả về thông báo lỗi và trạng thái 404 (Not Found)
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Nếu tìm thấy user, gọi hàm next() để chuyển sang callback function tiếp theo
      next();
    });
  };



app.get("/api/v1/users/:id", checkExist, (req, res) => {
    res.end("Hello get");
});

app.post("/api/v1/users", checkExist, (req, res) => {
    res.end("Hello post");

});

app.put("/api/v1/users/:id", checkExist, (req, res) => {
    res.end("Hello put");
});

app.delete("/api/v1/users/:id", checkExist, (req, res) => {
    res.end("Hello delete");

});








// app.post('/api/v1/users', (req, res) => {
//     const dataCheck = req.body;
//     const searchUser = dataCheck.email;
//     fs.readFile(pathJSON, { encoding: 'utf8' }, (err, data) => {
//         if (err) throw err;
//         else {
//             let flag = true;
//             let dataUser = JSON.parse(data);
//             let checkUserAlreadyExists = '';
//             let checkUserNotAlreadyExists = '';
//             for (let i = 0; i < dataUser.length; i++) {
//                 if (dataUser[i].email.indexOf(searchUser) !== -1) {
//                     flag = false;
//                     checkUserNotAlreadyExists = dataUser[i].email.indexOf(searchUser);
//                     return res.status(200).json("User already exists");
//                 }
//                 else if (dataUser[i].email.indexOf(searchUser) == -1) {
//                     checkUserNotAlreadyExists = dataUser[i].email.indexOf(searchUser);
//                 };
//             };
//             if (checkUserNotAlreadyExists === -1 && checkUserAlreadyExists === '' && flag === true) {
//                 const obj = JSON.parse(JSON.stringify(dataCheck)); // req.body = [Object: null prototype] { title: 'product' }
//                 dataUser.push(obj);
//                 fs.writeFile(pathJSON, JSON.stringify(dataUser), (err) => {
//                     if (err) throw err;
//                     else {
//                         console.log(dataUser);
//                         return res.status(200).json("Create successfully");
//                     };
//                 });
//             };
//         };
//     });
// });
// app.put('/api/v1/users/:id', (req, res) => {
//     const dataCheck = req.body;
//     console.log("dataCheck>>>", dataCheck);
//     const idPut = req.params.id;
//     fs.readFile(pathJSON, { encoding: 'utf8' }, (err, data) => {
//         if (err) throw err;
//         else {
//             let dataUser = JSON.parse(data);
//             // hàm find sẽ lọc các phần tử trong mảng dataUser, user chính là các phần tử đang được
//             // lọc, user => ...., thì user là tham số của callbackFunction
//             // user.id sẽ trỏ đến thuộc tính trong từng phần tử của array đó
//             // và sẽ so sánh với các điều kiện ....
//             const user = dataUser.find(user => user._id === idPut);
//             console.log("check>>>", user);
//             if (user) {
//                 // Update the user's data
//                 // Object.assign sẽ thay đổi giá trị bên trong, vd:
//                 //          target // source...(sẽ thay đổi vào target);
//                 Object.assign(user, dataCheck);
//                 fs.writeFile(pathJSON, JSON.stringify(dataUser), (err) => {
//                     if (err) throw err;
//                     else {
//                         console.log(dataUser);
//                         return res.status(200).json("Update Success");
//                     }
//                 });
//             } else {
//                 return res.status(404).send({ message: 'User not found' });
//             };
//         };
//     });
// });

// app.delete('/api/v1/users/:id', (req, res) => {
//     const dataCheck = req.body;
//     const idPut = req.params.id;
//     fs.readFile(pathJSON, { encoding: 'utf8' }, (err, data) => {
//         let dataUser = JSON.parse(data);
//         if (err) throw err;
//         else {
//             // hãy nhớ finIndex là tìm chỉ só(vị trí của phần tử 
//             // trong array), còn find là tìm value bên trong phần tử đó
//             const index = dataUser.findIndex(user => user._id === idPut);
//             console.log(index);
//             if (index !== -1) {
//                 dataUser.splice(index, 1);
//                 fs.writeFile(pathJSON, JSON.stringify(dataUser), (err) => {
//                     if (err) throw err;
//                     else {
//                         return res.status(200).send({ message: 'Delete successfully' });
//                     }
//                 });
//             }
//             else {
//                 return res.status(404).send({ message: 'User not found' });
//             };
//         };
//     });
// });

// app.get('/api/v1/users', (req, res) => {
//     fs.readFile(pathJSON, { encoding: 'utf8' }, (err, data) => {
//         if (err) throw err;
//         else {
//             res.status(200).json(JSON.parse(data));
//         }
//     });
// });
// app.get('/api/v1/users/:id', (req, res) => {
//     console.log(req.params.id);
//     let id = req.params.id;
//     fs.readFile(pathJSON, { encoding: 'utf8' }, (err, data) => {
//         if (err) throw err;
//         else {
//             let dataParse = JSON.parse(data);
//             res.status(200).json(dataParse[id]);
//         }
//     });
// });

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});





module.exports = app;



// kiến thức
// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

// app.post('/products', (req, res) => {
//     res.send('Got a POST request')
//     console.log("hello world");
// });

// Biến app (express()) dùng để hứng những request từ người dùng
// Request:
// GET (Lấy dữ liệu )
// POST(Thêm dữ liệu)
// PUT/PATCH (Update dữ liệu)
// Delete( Xóa dữ liệu)
// fetch() Javascript
// Thực hiện được cả 4 rquest ở trên

// Form HTML
// Thực hiện được GET/PST request
// Gõ vào + enter thanh url(browser)
// THực hiện được GET reqest

// Toàn bộ thông tin người dùng gửi lên sẽ nhằm trong req(request) object
// chúng ta có thể responese cho người dùng thông qua các phương thức
// nằm trong res(respone) object
// Hứng dữ liệu từ GET/DELETE Request
// Params request
// request là yêu cầu kh gửi lên cho server
// response là phản hồi server gửi lại về cho khách hàng

// baitap 1 + 2:
// app.get('/', (req, res) => {
//     res.send('This is homepage')
//     // console.log(req.params);
// });
// app.get('/overview', (req, res) => {
//     res.send('This is overview page')
//     // console.log(req.params);
// }); app.get('/product', (req, res) => {
//     res.send('This is product page')
//     // console.log(req.params);
// }); app.get('/user/:id', (req, res) => {
//     res.send('<h1>Hello World!</h1>')
//     // console.log(req.params);
// });
// app.get('*', function(req, res){
//     res.send('PAGE NOT FOUND???', 404);
//   });
