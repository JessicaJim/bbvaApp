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
