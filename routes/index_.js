/* * GET home page. */ var http=require('https'); exports.index = function(req, res){
   //hacer la invocación del servici BBVA
   
var optionsFood = {
  host: 'api.bbva.com',
  port: 443,
  headers:{
        'Authorization': 'TWlFbnRvcm5vQkJWQTpiZGFiMDJhZDc5Zjc3ZTBkNzIyODVmMzAyMTRlODliNzBkYWRkOWYy'
    },
  path: 'https://api.bbva.com/apidatos/zones/cards_cube.json?date_min=20121101&date_max=20130401&group_by=month&zipcode=08800&zoom=2&category=es_food'
};

var optionsTech={
  host: 'api.bbva.com',
  port: 443,
  headers:{
        'Authorization': 'TWlFbnRvcm5vQkJWQTpiZGFiMDJhZDc5Zjc3ZTBkNzIyODVmMzAyMTRlODliNzBkYWRkOWYy'
    },
  path: 'https://api.bbva.com/apidatos/zones/cards_cube.json?date_min=20121101&date_max=20130401&group_by=month&zipcode=08800&zoom=2&category=es_tech'
};

var result='';
var result2='';
http.get(optionsFood, function(res1) {
        res1.on('data', function (chunk) {
                result+=chunk; //va concatenando la respuesta                           
        });
        res1.on('end', function()
        { //cuando se tiene toda el cuerpo de la respuesta con el JSON, se invoca la fusión de html + datos
	 var statsFood=JSON.parse(result).data.stats;
	 var i;
	 var j;
	 var arr=[];
		 for(i=0;i < statsFood.length ;++i){
			arr.date[i]=statsFood[i].
			console.log(statsFood[i].date);
			//console.log(statsFood[i].cube);
			statsFood[i].forEach(function(cubo){
				if(cubo.hash.equals("F#2")){
					console.log(cubo);
				}
			});
			
		 }
		 http.get(optionsTech,function(res2){
			res2.on('data',function(chunk2){
				result2+=chunk2;
			});
			res2.on('end',function(){
				var rp2=JSON.parse(result2);
				var r2stats=rp2.data.stats;
				console.log('\n \n Si hay otros datos \n \n');
		                 for(i=0;i < r2stats.length ;++i){
                		        console.log(r2stats[i].date);
		                        console.log(r2stats[i].cube);
                		 }

				res.render('index',arr)
			});	
		 });

//         res.render('index',rparseado);
        });

  //console.log("Got response: " + res)        ;
}).on('error', function(e) {
  console.log("Got error: " + e.message);
});
  
};
