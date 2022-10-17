let uniqueArr = []; //1

function deleteNth(arr, n) { 
    arr.forEach(elt => {
        let count =uniqueArr.filter((e)=>{
            return e == elt;
        });
        console.log("count of" + elt + "is: "+ count.length);
        console.log("index of" + elt + "is: "+ uniqueArr.indexOf(elt));
        if (uniqueArr.indexOf(elt) < 0 || count.length !== n ) uniqueArr.push(elt);
    });

    console.log(uniqueArr);
   
   
};

deleteNth([1,1,3,3,7,2,2,2,2], 3);


