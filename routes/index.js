
/* * GET home page. */
var http=require('https');

exports.index = function(req, res){
   //hacer la invocación del servDici BBVA

//Zip Code
var cp='08397-Pineda de Mar';	
if(req.query.zipCode!=null){	
	cp=req.query.zipCode;
}
var zipCode=(cp.substring(0,5));
console.log('Zip Code='+zipCode+'  cp'+cp);
// Categorias
var nombresCat;
var selectCat=new Array();
obtenerCategorias();
var cat_c=new Array();
var cat_n=new Array();
if(req.query.cat!=null){
	for(var i=0;i<req.query.cat.length;i++){
		var curr=req.query.cat[i];
		var indice=parseInt(curr.substring(0,2));
		cat_n[i]=nombresCat[indice];
		selectCat[indice]='true';
		cat_c[i]=curr.substring(2);
	}
	console.log('Request ddesul..'+cat_c+'\n'+cat_n);
}else{
	var cat_c=['es_fashion','es_food','es_tech'];
	var cat_n=['Moda','Comida','Tecnologia'];
	selectCat[3]='true';
	selectCat[2]='true';
	selectCat[15]='true';
}

//Orden
var stringE='edad-anio-cat_n-gene';
var arrDim=['Edad','Mes','Categoria','Genero'];
if(req.query.categoria!=null){	
	stringE=req.query.categoria[0]+'-'+req.query.categoria[1]+'-'+req.query.categoria[2]+'-'+req.query.categoria[3];
	arrDim[0]=setArrOpciones(req.query.categoria[0]);
	arrDim[1]=setArrOpciones(req.query.categoria[1]);
	arrDim[2]=setArrOpciones(req.query.categoria[2]);
	arrDim[3]=setArrOpciones(req.query.categoria[3]);
}

var options=new Array();
var result=new Array();
for(var i=0; i<cat_c.length; i++){
  options[i]= {
    host: 'api.bbva.com',
    port: 443,
    headers:{ 'Authorization' : 'amplc3NpY2EuamltOjkxNWRiM2VkMTUyNWQxYWM1MTJmZTdjY2RkZjJkMzJiNTIyODdjM2Q='},
    path: 'https://api.bbva.com/apidatos/zones/cards_cube.json?date_min=20121101&date_max=20130401&group_by=month&zipcode='+zipCode+'&zoom=2&category='+cat_c[i]
  };
  result[i]='';
}

var gene=['Mujeres','Hombres','Empresa','Indefinido'];
var anio=['Noviembre 2012','Diciembre 2012','Enero 2013','Febrero 2013','Marzo 2013','Abril 2013'];
var edad=['<= 18 años','19-25 años','26-35 años','36-45 años','46-55 años','56-66 años','>= 66 años','Edad Desconocida'];


var ed=0;
var gen=0;
var dia=0;
var j=0;

var arr=new Array();
var miJSON;
var titulos=setTitulos(stringE);

for(var p1=0; p1<titulos.cat0.length; p1++){	
    arr[p1]=new Array();
    for(var p2=0;p2<(titulos.cat1.length)+1;p2++){
    	arr[p1][p2]=new Array();
        for(var p3=0; p3<(titulos.cat2.length)+1; p3++){
	    arr[p1][p2][p3]=new Array();
            for(var p4=0; p4<(titulos.cat3.length)+1; p4++){
                arr[p1][p2][p3][p4]=new Array();
}    }	}   }	

/*</Inicio>*/

function creaFilaConOrden(cati,dia,gen,ed,auxiliar){
    var str=stringE.split('-');
    var cat=cati+1;
    var v0=dameElValor(str[0],cat,dia,gen,ed);
    var v1=dameElValor(str[1],cat,dia,gen,ed);
    var v2=dameElValor(str[2],cat,dia,gen,ed);
    var v3=dameElValor(str[3],cat,dia,gen,ed);

    arr[v0-1][v1][v2][v3]=auxiliar;
}


function creaFila(cat,stats){
    for(dia=1; dia<stats.length+1; dia++){
	var cubo=stats[dia-1].cube;
        for(j=0;j<cubo.length; j++){
	    var genl=cubo[j].hash.substr(0,1);
            var eda=cubo[j].hash.substr(2,3);
                        
		if(eda=="U"){    ed=8;     }
                else{            ed=1+parseInt(eda); }
                        
		if(genl=="F"){  	gen=1;    }
                else if(genl=="M"){  	gen=2;    }
                else if(genl=="E"){  	gen=3;    }
		else if(genl=="U"){ 	gen=4;	  }

			
                var auxiliar=[cubo[j].num_payments, cubo[j].avg , cubo[j].num_cards];
		creaFilaConOrden(cat,dia,gen,ed,auxiliar);
                        //arr[cat][dia][gen][ed]=[cubo[j].num_payments, cubo[j].avg , cubo[j].num_cards];
                        //console.log('cat: '+ cat +' dia='+dia+' gen='+gen+' ed='+ed+'-->['+arr[food][dia][gen][ed]+' ]');
	}
    }
}


http.get(options[0], function(res1) {
	res1.on('data', function (chunk) {
   	result[0]+=chunk; //va concatenando la respuesta
   });
   res1.on('end', function()
   { //cuando se tiene toda el cuerpo de la respuesta con el JSON, se invoca la fusión de html + datos
    var statsCero=JSON.parse(result[0]).data.stats;
    creaFila(0,statsCero);
    if(options.length>1){             
	 http.get(options[1],function(res2){
		res2.on('data',function(chunk2){
			result[1]+=chunk2;
   		});
	  	res2.on('end',function()
		{
		 var statsUno=JSON.parse(result[1]).data.stats;
		 creaFila(1,statsUno);

		 if(options.length>2){
		     http.get(options[2],function(res3){
        	       res3.on('data',function(chunk3){
      		 	     result[2]+=chunk3;
	               });
		       res3.on('end',function()
		       {
		         var statsDos=JSON.parse(result[2]).data.stats;
                          creaFila(2,statsDos);
			

		 	 //hazSumaRows();	

			 //printArr();
			
			 //miJSON={'categorias':nombresCat,'select':selectCat,'dim':arrDim,'dim_id':stringE.split('-'),'titulos':titulos,'datos': arr};
			 //res.render('index',miJSON);
			});
		  });
		} });        
 	 });

   }
    hazSumaRows();

   miJSON={'categorias':nombresCat,'select':selectCat,'dim':arrDim,'dim_id':stringE.split('-'),'titulos':titulos,'codigo':cp,'datos': arr};
   res.render('index',miJSON);
 
   });
}).on('error', function(e) {
  console.log("Got error: " + e.message);
});


function creaTitulos(){
	var titulos={'cat0':cat_n,'cat1':anio,'cat2':gene,'cat3':edad};
	return titulos;
}


function hazSumaRows(){
  
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


function setTitulos(string){
    //var titulos={'cat0':cat_n,'cat1':anio,'cat2':gene,'cat3':edad};
    var st=string.split("-");
    var t={'cat0':getCat(st[0]),'cat1':getCat(st[1]),'cat2':getCat(st[2]),'cat3':getCat(st[3])};
    console.log(t);
    return t;
}

function getCat(st){
   if(st==='cat_n'){		return cat_n;  }
   else if(st==='anio'){	return anio;   }
   else if(st==='gene'){	return gene;   }
   else if(st==='edad'){	return edad;   }
}

function setArrOpciones(st){
   if(st==='cat_n'){            return 'Categoria';  }
   else if(st==='anio'){        return 'Mes';   }
   else if(st==='gene'){        return 'Genero';   }
   else if(st==='edad'){        return 'Edad';   }
}

function dameElValor(st,v0,v1,v2,v3){
   if(st==='cat_n'){            return v0;  }
   else if(st==='anio'){        return v1;   }
   else if(st==='gene'){        return v2;   }
   else if(st==='edad'){        return v3;   }
}

function obtenerCategorias(){
    nombresCat=['Auto','Bares y Restaurantes','Comida','Moda','Salud','Libros y Prensa', 'Casa', 'Hoteles','Viajes','Supermercados','Transporte','Belleza','Gobierno','Deporte y Juguetes','Ocio','Tecnologia'];
    for(var i=0; i<16;i++){
    	selectCat[i]='false';
    }
}

};
