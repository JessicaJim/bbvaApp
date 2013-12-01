function displayCat(cat0,cat1,cat2){
	var divcat='div_cat_'+cat0+''+cat1+''+cat2;
	var divmin='min_cat_'+cat0+''+cat1+''+cat2;
	var divmas='mas_cat_'+cat0+''+cat1+''+cat2;
	var divdat='dat_cat_'+cat0+''+cat1+''+cat2;

	xDisplay(divcat, 'block')
	xDisplay(divmin, 'block')
	xDisplay(divmas, 'none')
	xDisplay(divdat, 'none')
}

function undisplayCat(cat0,cat1,cat2){
        var divcat='div_cat_'+cat0+''+cat1+''+cat2;
        var divmin='min_cat_'+cat0+''+cat1+''+cat2;
        var divmas='mas_cat_'+cat0+''+cat1+''+cat2;
        var divdat='dat_cat_'+cat0+''+cat1+''+cat2;

	xDisplay(divcat, 'none')
	xDisplay(divmin, 'none')
	xDisplay(divmas, 'block')
	xDisplay(divdat, 'block')
}

function init(select){
	checkboxlimit($('.catChecked'), 3);
	seleccionar(2);
	checkBoxesInit(select);
}

function checkBoxesInit(select){
	for(var i=0; i<select.length;i++){
		$("#cat"+i).prop('checked',select[i]);
	}
}

function validar(idForm){
	if ($('#1a_cat option:selected').text() ===""
	|| $('#2a_cat option:selected').text() === ""
	|| $('#3a_cat option:selected').text() === ""
	|| $('#4a_cat option:selected').text() === ""){
		//return false;
		alert("Debes seleccionar un valor para todas las dimensiones")
	}else{
		document.getElementById(idForm).submit();
	}
}

function daAlert(){
	alert("Debes seleccionar un valor para todas las dimensiones");
}

function validar1213(){
	if ($('#1a_cat option:selected').text() ===""
	|| $('#2a_cat option:selected').text() === ""
	|| $('#3a_cat option:selected').text() === ""
	|| $('#4a_cat option:selected').text() === ""){
		return false;
	}
	return true;
}

function checkboxlimit(checkgroup, limit){
	var checkgroup=checkgroup
	var limit=limit
	for (var i=0; i<checkgroup.length; i++){
		checkgroup[i].onclick=function(){
		var checkedcount=0
		for (var i=0; i<checkgroup.length; i++)
			checkedcount+=(checkgroup[i].checked)? 1 : 0
		if (checkedcount>limit){
			alert("Solo puedes seleccionar "+limit+" categorias")
			this.checked=false
			}
		}
	}
}
function daFormato(datos){
    for(var x=0;x<datos.length;x++){
    	for(var y=1; y<datos[x].length;y++){
            for(var z=1; z<datos[x][y].length;z++){
            	unDisplayCat(x,y,z);
            }
            unDisplayCat(x,y,-1);
        }
   }
}

function seleccionar(idSiguiente){
	a = idSiguiente;
	var actual = $('#'+(a-1)+'a_cat');
	var options = {};
	$('#'+(idSiguiente-1)+'a_cat option').each(function(){
				options[this.text]=$(this).attr('value');
	});
	while(a<=4){
		var siguiente = $('#'+a+'a_cat');
		siguiente.empty();
		var seleccionado = $('#'+(a-1)+'a_cat option:selected').text();	
			delete options[seleccionado];
			$.each(options, function(key, valor){
				$('#'+a+'a_cat').append($("<option></option>").attr("value",valor).text(key));
			});
			a++;
	}
}

function seleccionar_12(idSiguiente){
   	a = idSiguiente;
        var actual = $('#'+(a-1)+'a_cat');
        while(a<=4){
        	var siguiente = $('#'+a+'a_cat');
                siguiente.empty();
                if(a>idSiguiente){
                         siguiente.attr('disabled',true);
                }
                else{
                     siguiente.removeAttr('disabled');
                     var seleccionado = $('#'+(idSiguiente-1)+'a_cat option:selected').text();
                     var options = {};
                     $('#'+(idSiguiente-1)+'a_cat option').each(function(){
                     options[this.text]=$(this).attr('value');
                 });
                 delete options[seleccionado];
        	 $.each(options, function(key, valor){
        	        $('#'+a+'a_cat').append($("<option></option>").attr("value",valor).text(key));
                 });
                }
               a++;
         }
}



function hideMin(c0,c1,c2){

}
//1-4
function display1aCat_4(){
        xDisplay('1aCat_4', 'block')
        xDisplay('min_1aCat_4', 'block')
        xDisplay('mas_1aCat_4', 'none')
        xDisplay('datos_1aCat_4','none')
}
function undisplay1aCat_6(){
        xDisplay('1aCat_4', 'none')
        xDisplay('min_1aCat_4', 'none')
        xDisplay('mas_1aCat_4', 'block')
        xDisplay('datos_1aCat_4', 'block')
}
//1-5
function display1aCat_5(){
        xDisplay('1aCat_5', 'block')
        xDisplay('min_1aCat_5', 'block')
        xDisplay('mas_1aCat_5', 'none')
        xDisplay('datos_1aCat_5','none')
}
function undisplay1aCat_6(){
        xDisplay('1aCat_5', 'none')
        xDisplay('min_1aCat_5', 'none')
        xDisplay('mas_1aCat_5', 'block')
        xDisplay('datos_1aCat_5', 'block')
}
//1-6
function display1aCat_6(){
	xDisplay('1aCat_6', 'block') 
	xDisplay('min_1aCat_6', 'block') 
	xDisplay('mas_1aCat_6', 'none')
	xDisplay('datos_1aCat_6','none') 
}
function undisplay1aCat_6(){
	xDisplay('1aCat_6', 'none') 
	xDisplay('min_1aCat_6', 'none') 
	xDisplay('mas_1aCat_6', 'block')
	xDisplay('datos_1aCat_6', 'block') 
}
