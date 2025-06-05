

 // <- This is the correct way to import axios in Node.js


document.getElementById('loadDataBtn').addEventListener('click', ()=>{
    const dataContainer = document.getElementById('dataContainer');
      
    axios.get('/api/data')
    .then(response => {
        
        
       const data=response.data;
       let Content="";
     console.log(response.data[0].name);
     for(let i=0;i<data.length;i++)
     {
Content+=`<h2> Name = ${data[i].name}</h2>`
Content+=`<h2> Age = ${data[i].age}</h2>`
Content+=`<h2> Id = ${data[i].id}</h2>`
    
     }
     dataContainer.innerHTML=Content;
      
      
       
    })

    .catch(error => {
        console.error('Error fetchjjjjjing data:', error);
        document.getElementById('dataContainer').innerHTML = 'Failed to load data.';
    });

});
document.getElementById('btt').addEventListener('click', ()=>{
    const name = document.getElementById('addname').value;
    const age = document.getElementById('addage').value;
    const id = document.getElementById('addid').value;
    axios.post('/api/add' , 
        {name , age , id },
        {headers:{'Content-Type': 'application/json'}}
    ).then(response=>{
        document.getElementById('dataContainer').innerHTML=`<h2> data added succesfully</h2>
        <pre> ${ JSON.stringify(response.data)} </pre>`
    })
    .catch(error => {
        console.error("Error:", error);  // Handle errors properly
      });
});
 
document.getElementById('update_button').addEventListener('click' , ()=>{
    const name = document.getElementById('nameupdate').value;
    const age = document.getElementById('ageupdate').value;
    const id= document.getElementById('idupdate').value;
      
    axios.put('/api/put',{name ,age , id}, {headers:{'Content-Type' :' application/json'}}).then(response => {
       console.log(response);
        document.getElementById('dataContainer').innerHTML=`<h2> the data update successfully</h2>
         <pre> ${ JSON.stringify(response.data)} </pre>`
    })
    .catch(error => {
        if (error.response) {
            // The server responded with a status code outside the 2xx range
             document.getElementById('dataContainer').innerHTML=` <h2> Item with id <pre> ${id}</pre>  not found`
        
          }
    });
    
});
 
document.getElementById('delete_button').addEventListener('click' , ()=>{
    const id = document.getElementById('deleteid').value;
    axios.delete(`/api/delete/${id}` , {headers : {'Content-Type': 'application/json'}})
        .then(response =>{
            document.getElementById('dataContainer').innerHTML=` <h2> Item deleted succefully
            <pre> ${JSON.stringify(response.data)}</pre>`
        })
        .catch(error => {
            if (error.response) {
                // The server responded with a status code outside the 2xx range
                 document.getElementById('dataContainer').innerHTML=` <h2> Item with id  <pre> ${id}</pre> not found`
           
              }
        })
})