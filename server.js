app.put('/api/v1/users/:id', (req, res) => {
    const dataCheck = req.body;
    console.log("dataCheck>>>", dataCheck );
    const idPut = req.params.id;
    // fs.readFile(pathJSON, { encoding: 'utf8' }, (err, data) => {
    //     if (err) throw err;
    //     else {
    //         let dataUser = JSON.parse(data);
    //         const user = dataUser.find(user => user._id === idPut);
    //         if (user) {
    //             // Update the user's data
    //             Object.assign(user, dataCheck);
    //             fs.writeFile(pathJSON, JSON.stringify(dataUser), (err) => {
    //                 if (err) throw err;
    //                 else {
    //                     // console.log(dataUser);
    //                     return res.status(200).json("Update Success");
    //                 }
    //             });
    //         } else {
    //             return res.status(200).json("User not found");
    //         }
    //     }
    // });
});