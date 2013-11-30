
/* * GET home page. */
var http=require('https');

exports.index = function(req, res){
   //hacer la invocación del servDici BBVA

var options = {
  host: 'api.bbva.com',
  port: 443,
  headers:{ 'Authorization' : 'amplc3NpY2EuamltOjkxNWRiM2VkMTUyNWQxYWM1MTJmZTdjY2RkZjJkMzJiNTIyODdjM2Q='},
  path: 'https://api.bbva.com/apidatos/zones/cards_cube.json?date_min=20121101&date_max=20130401&group_by=month&zipcode=08800&zoom=2'
};

var optionsFood={
  host: 'api.bbva.com',
  port: 443,
  headers:{ 'Authorization' : 'amplc3NpY2EuamltOjkxNWRiM2VkMTUyNWQxYWM1MTJmZTdjY2RkZjJkMzJiNTIyODdjM2Q='},
  path: 'https://api.bbva.com/apidatos/zones/cards_cube.json?date_min=20121101&date_max=20130401&group_by=month&zipcode=08800&zoom=2&category=es_food'
};

var optionsTech={
  host: 'api.bbva.com',
  port: 443,
  headers:{ 'Authorization' : 'amplc3NpY2EuamltOjkxNWRiM2VkMTUyNWQxYWM1MTJmZTdjY2RkZjJkMzJiNTIyODdjM2Q='},
  path: 'https://api.bbva.com/apidatos/zones/cards_cube.json?date_min=20121101&date_max=20130401&group_by=month&zipcode=08800&zoom=2&category=es_tech'
};

var optionsBar={
  host: 'api.bbva.com',
  port: 443,
  headers:{ 'Authorization' : 'amplc3NpY2EuamltOjkxNWRiM2VkMTUyNWQxYWM1MTJmZTdjY2RkZjJkMzJiNTIyODdjM2Q='},
  path: 'https://api.bbva.com/apidatos/zones/cards_cube.json?date_min=20121101&date_max=20130401&group_by=month&zipcode=08800&zoom=2&category=es_barsandrestaurants'
};

var cate=['Comida','Tecnologia','Bar'];
var gene=['Femenino','Masculino','Empresa','Indefinido'];
var anio=['Noviembre 2012','Diciembre 2012','Enero 2013','Febrero 2013','Marzo 2013','Abril 2013'];
var edad=['<= 18','19-25','26-35','36-45','46-55','56-66','>= 66','Desconocida'];


//var patronGuardado=['cate-gene-anio-edad','cate-gene-edad-anio','cate-';

var food=0; var tech=1; var bar=2;
var ed=0;
var gen=0;
var dia=0;
var j=0;

var resultFood='';
var resultTech='';
var resultBar='';

var arr=new Array();
var miJSON;

function creaFila(cat,stats){
	for(dia=0;dia< stats.length+1 ;dia++){
        	arr[cat][dia]=new Array();
                for(gen=0; gen<4+1; gen++){
			arr[cat][dia][gen]=new Array();
                        for(ed=0; ed<8+1;ed++){
                        	arr[cat][dia][gen][ed]=new Array();
	}	}	}                
        for(dia=1; dia<stats.length+1; dia++){
		var cubo=stats[dia-1].cube;

                for(j=0;j<cubo.length; j++){

                	var genl=cubo[j].hash.substr(0,1);
                        var eda=cubo[j].hash.substr(2,3);
                        
			if(eda=="U"){    ed=8;     }
                        else{           ed=1+parseInt(eda); }
                        
			if(genl=="F"){  	gen=1;    }
                        else if(genl=="M"){  	gen=2;    }
                        else if(genl=="E"){  	gen=3;    }
			else if(genl=="U"){ 	gen=4;	  }

                        arr[cat][dia][gen][ed]=[cubo[j].num_payments, cubo[j].avg , cubo[j].num_cards];
                        //console.log('cat: '+ cat +' dia='+dia+' gen='+gen+' ed='+ed+'-->['+arr[food][dia][gen][ed]+' ]');
		}
	}
}


http.get(optionsFood, function(res1) {
        res1.on('data', function (chunk) {
                resultFood+=chunk; //va concatenando la respuesta
        });
        res1.on('end', function()
        { //cuando se tiene toda el cuerpo de la respuesta con el JSON, se invoca la fusión de html + datos
         var statsFood=JSON.parse(resultFood).data.stats;
         arr[food]=new Array();
	 creaFila(food,statsFood);
                 
	 http.get(optionsTech,function(res2){
		res2.on('data',function(chunk2){
			resultTech+=chunk2;
                });
                res2.on('end',function()
		{
		 var statsTech=JSON.parse(resultTech).data.stats;
		 arr[tech]=new Array();
		 creaFila(tech,statsTech);
		
		 http.get(optionsBar,function(res3){
                	res3.on('data',function(chunk3){
		                resultBar+=chunk3;
                	});
		        res3.on('end',function()
                	{
		         var statsBar=JSON.parse(resultBar).data.stats;
                	 arr[bar]=new Array();
		         creaFila(bar,statsBar);
			

			 hazSumaRows();	
	
			 //printArr();
			
			 titulos={'cat0':cate,'cat1':anio,'cat2':gene,'cat3':edad};
			 miJSON={'titulos':titulos,'datos': arr};
			 res.render('index',miJSON);
			});
		 });
		});        
 	 });

        });
}).on('error', function(e) {
  console.log("Got error: " + e.message);
});




function hazSumaRows(){
  
//    for(var a=0; a<arr.length; a++){
  var suma=[0,0,0]; var sumb=[0,0,0];
  var sumc=[0,0,0]; var sumd=[0,0,0];
    for(var a=0; a<arr.length; a++){
	sumb=[0,0,0];
  	for(var b=0; b<arr[a].length;b++){
		sumc=[0,0,0];
        	for (var c=0; c<arr[a][b].length; c++){
			sumd=[0,0,0];
                	for(var d=0; d<arr[a][b][c].length;d++){
                        	if(arr[a][b][c][d][0]==null){	arr[a][b][c][d][0]=0;	} 
                        	if(arr[a][b][c][d][1]==null){	arr[a][b][c][d][1]=0;	}
                        	if(arr[a][b][c][d][2]==null){	arr[a][b][c][d][2]=0;	}
				
				//console.log('Suma de '+a+' '+b+' '+c+' '+d+' .. es '+ parseInt(arr[a][b][c][d][0])+ ' - '+ parseInt(arr[a][b][c][d][1])+' - '+parseInt(arr[a][b][c][d][2]));
                                sumd[0]+=Math.round(parseFloat(arr[a][b][c][d][0])*100)/100;
				sumd[1]+=Math.round(parseFloat(arr[a][b][c][d][1])*100)/100;
				sumd[2]+=Math.round(parseFloat(arr[a][b][c][d][2])*100)/100;
			}
			arr[a][b][c][0]=[Math.round(sumd[0]*100)/100,Math.round(sumd[1]*100)/100,Math.round(sumd[2]*100)/100];
			sumc[0]+=Math.round(sumd[0]*100)/100;
			sumc[1]+=Math.round(sumd[1]*100)/100;
			sumc[2]+=Math.round(sumd[2]*100)/100;
			sumd=[0,0,0]
		}
		arr[a][b][0][0]=[Math.round(sumc[0]*100)/100,Math.round(sumc[1]*100)/100,Math.round(sumc[2]*100)/100];
		sumb[0]+=Math.round(sumc[0]*100)/100;
		sumb[1]+=Math.round(sumc[1]*100)/100;
		sumb[2]+=Math.round(sumc[2]*100)/100;
		sumc=[0,0,0];
	}
	arr[a][0][0][0]=[Math.round(sumb[0]*100)/100,Math.round(sumb[1]*100)/100,Math.round(sumb[2]*100)/100];
	//suma[0]+=sumb[0];
	//suma[1]+=sumb[1];
	//suma[2]+=sumb[2];
	sumb=[0,0,0];
  }
  //arr[0][0][0][0]=[suma[0],suma[1],suma[2]];
}


function printArr(){
	for(var a=0; a<arr.length; a++){
		for(var b=0; b<arr[a].length;b++){
			for(var c=0; c<arr[a][b].length; c++){
				for(var d=0; d<arr[a][b][c].length; d++){
					console.log('Categoria:'+a+'C Dia:'+b+' Genero:'+c+' Edad:'+d+' -->'+arr[a][b][c][d]+'\n');
	}	}	}	}
}

};
