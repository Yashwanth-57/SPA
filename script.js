const express= require('express');
const path= require('path');
const fs= require('fs');
const PORT=5000; 
const app= express();
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/data', (req, res) => {
 
  fs.readFile('./public/data.json', 'utf8', (err, data) => {
      if (err) {
          console.error('Error reading file:', err);
          res.status(500).send('Internallll Server Error'); // Correct error handling
          return;
      }
      console.log(typeof data);// output as string
      res.json(JSON.parse(data)); // Send data as JSON
  });
});
app.post('/api/add',(req,res)=>{
  const newdata= req.body;
  //console.log(newdata);
  
  fs.readFile('./public/data.json', 'utf8' ,(err, data)=>{
    if(err){
      console.error('error in reading file', err);
    }
    const jsondata=JSON.parse(data);
    jsondata.push(newdata);
    fs.writeFile('./public/data.json', JSON.stringify(jsondata, null , 2),(err)=>{
      if(err)
      {
        console.error("eroor in writing file");
        return ;
      }
     // console.log(newdata);
         res.status(201).json(newdata);
    })
  })
})

app.put('/api/put', (req,res)=>{
  const updatedData = req.body;
  const id1 = updatedData.id; // Extract ID
 // console.log(id1); // Extract new data from request body
  // console.log(updatedData);

   fs.readFile('./public/data.json' , ( err, data)=>{
    if(err){
      console.error("error while rading file");
      return;
      
    }
    const newjson=JSON.parse(data);
    //console.log(newjson);

    const index = newjson.findIndex(entry => entry.id === id1);

    if (index !== -1) {
      // Update the name and age for the found object
      newjson[index].name = updatedData.name;
      newjson[index].age = updatedData.age;
    //  console.log(newjson);
      fs.writeFile('./public/data.json' , JSON.stringify(newjson , null , 2) , 'utf8' , (err) =>{
        if(err){
          res.error('writing file error');
        }
       // console.log(updatedData);
        res.status(201).json(updatedData);
        return;
      })
    }
      else {
res.status(404).send(" id not founddddddddd");
      }
    
    // Index (starts at 0)    

   
   });
    });

   app.delete('/api/delete/:id', (req,res)=>{
    const id=parseInt(req.params.id);
   // console.log(id);
    fs.readFile('./public/data.json', 'utf8', (err,data) => {
    if(err)
    {
      res.status(500).send('error in reading file');
    }
    const newjson = JSON.parse(data);
    const index = newjson.findIndex(entry => entry.id==id)
    if(index==-1)
    {
      console.log('heloooooooo errorr');
      return res.status(404).send('Item not found' );
    

    }
    const deleteddata= newjson[index];
    newjson.splice(index, 1);
    fs.writeFile('./public/data.json', JSON.stringify(newjson, null ,2) , 'utf8', (err) =>{
      if(err)
      {
        res.status(500).send('writing file error')
        return;
      }
      console.log(deleteddata);
      res.status(200).json(( deleteddata));
    });


    });
   });


     

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});