/*
 * Validaciones para ESPAÑA 
 */


/**
 * Validacion DNI/NIF
 * @param {*} abc 
 * @returns 
 */
function isValidNif(abc){
	abc = abc.value;
	let dni = abc.substring(0,abc.length-1);
	let=abc.charAt(abc.length-1);
	if (!isNaN(let)) {
		alert('Falta la letra en el DNI');
		return false;
	}else{
		cadena = "TRWAGMYFPDXBNJZSQVHLCKET";
		posicion = dni % 23;
		letra = cadena.substring(posicion,posicion+1);
		if (letra!=let.toUpperCase()){
			alert("DNI no válido");
			return false;
		}
	}
	//alert("Nif válido");
	return true;
}

/**
 * Validacion CIF
 * @param {*} abc 
 * @returns 
 */
function isValidCif(abc){
	//alert("dentro del is valid cif");
	let par = 0;
	let non = 0;
	let letras = "ABCDEFGHKLMNPQRS";
	let letra = abc.charAt(0);
	
	if (abc.length!=9) {
		alert('El Cif debe tener 9 dígitos');
		return false;
	}
	
	if (letras.indexOf(letra.toUpperCase())==-1) {
		alert("El comienzo del Cif no es válido");
		return false;
	}
	
	for (zz=2;zz<8;zz+=2) {
		par = par+parseInt(abc.charAt(zz));
	}
	
	for (zz=1;zz<9;zz+=2) {
		nn = 2*parseInt(abc.charAt(zz));
		if (nn > 9) nn = 1+(nn-10);
		non = non+nn;
	}
	
	let parcial = par + non;
	let control = (10 - ( parcial % 10));
	if (control==10) control=0;
	
	if (control!=abc.charAt(8)) {
		alert("El Cif no es válido");
		return false;
	}
	//alert("El Cif es válido");
	return true;
}


/**
 * Validacion numero Seguridad Social
 * @param {*} num 
 * @returns 
 */
function isValidNumSS(num){
	if(num.length < 12){
		alert("El número de la Seguridad Social debe tener 12 digitos");
		return false;
	}else if(isNaN( num )){
		alert("El número de la Seguridad Social debe tener 12 digitos");
		return false;
	}else{
		return true;
	}
}