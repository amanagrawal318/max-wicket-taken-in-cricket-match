//load cheerio module using require
let cheerio = require('cheerio');
//load request module using require
let request=require("request");
//load fs module using require
let fs=require("fs");
let maxW=0;
let name="";

function responsehandler(err,res,body){
    if(!err){ 
        // load the body in loadedhtml
        let loadedhtml = cheerio.load(body);
        // to load the all rows of the table in to html of the selector
        let allRows=loadedhtml(".table.bowler>tbody>tr");   
        //loop to iterate all the index of allrows array
       for(let i=0;i<allRows.length;i++){
           let allColumns=loadedhtml(allRows[i]).find("td"); // to find the td tag from the ith position of allrows to get aal columns
           let currName=loadedhtml(allColumns[0]).text().trim(); //to find the 0th ind text of currname
           let currW=loadedhtml(allColumns[4]).text();  // to find the wicket of that name persion at 4th ind
           if(maxW<=currW){                            // to check if maximum between currw and maxw
               maxW=currW;                              // update maxw and name
               name=currName;
           }
       }
       // print name of the player who have maximum wicket in a match
    console.log(name+" => "+maxW);                                 
    }
}
//we request for url of the match and passing responsehandler functinn
request("https://www.espncricinfo.com/series/england-tour-of-india-2020-21-1243364/india-vs-england-5th-t20i-1243392/full-scorecard",responsehandler);

// trim() is used to remove extra spaces and /n /r 