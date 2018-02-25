var formElement=null;
var numeroSecreto=null;
var respuestaSelect=null;
var respuestasCheckbox = [];
var respuestasRadioButton = [];
var respuestaSelect2=null;
var numeroSecreto2=null;
var respuestasCheckbox2 = [];
var respuestasRadioButton2 = [];
var nota = 0;  //nota de la prueba sobre 3 puntos (hay 3 preguntas)

//**************************************************************************************************** 
//Después de cargar la página (onload) se definen los eventos sobre los elementos entre otras acciones.
window.onload = function(){ 

 //CORREGIR al apretar el botón
 formElement=document.getElementById('myform');
 formElement.onsubmit=function(){
   inicializar();
   if (comprobar()){
    corregirNumber();
    corregirSelect();
    corregirCheckbox();
	corregirRadioButton();
	corregirSelect2();
	corregirNumber2();
	corregirCheckbox2();
	corregirRadioButton2();
    presentarNota();
   }
   return false;
 }
 
 //LEER XML de xml/preguntas.xml
 var xhttp = new XMLHttpRequest();
 xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
   gestionarXml(this);
  }
 };
 xhttp.open("GET", "xml/preguntas.xml", true);
 xhttp.send();
}

//****************************************************************************************************
// Recuperamos los datos del fichero XML xml/preguntas.xml
// xmlDOC es el documento leido XML. 
function gestionarXml(dadesXml){
 var xmlDoc = dadesXml.responseXML; //Parse XML to xmlDoc
 
 //NUMBER
 //Recuperamos el título y la respuesta correcta de Input, guardamos el número secreto
 var tituloInput=xmlDoc.getElementsByTagName("title")[0].innerHTML;
 ponerDatosInputHtml(tituloInput);
 numeroSecreto=parseInt(xmlDoc.getElementsByTagName("answer")[0].innerHTML);
 
  var tituloInput2=xmlDoc.getElementsByTagName("title")[0].innerHTML;
 ponerDatosInput2Html(tituloInput2);
 numeroSecreto2=parseInt(xmlDoc.getElementsByTagName("answer")[0].innerHTML);
 
 //SELECT
 //Recuperamos el título y las opciones, guardamos la respuesta correcta
 var tituloSelect=xmlDoc.getElementsByTagName("title")[1].innerHTML;
 var opcionesSelect = [];
 var nopt = xmlDoc.getElementById("pregunta_02").getElementsByTagName('option').length;
  for (i = 0; i < nopt; i++) { 
    opcionesSelect[i] = xmlDoc.getElementById("pregunta_02").getElementsByTagName('option')[i].innerHTML;
 }
 ponerDatosSelectHtml(tituloSelect,opcionesSelect);
 respuestaSelect=parseInt(xmlDoc.getElementsByTagName("answer")[1].innerHTML);
 
  //SELECT2
 //Recuperamos el título y las opciones, guardamos la respuesta correcta
 var tituloSelect2=xmlDoc.getElementsByTagName("title")[1].innerHTML;
 var opcionesSelect2 = [];
 var nopt = xmlDoc.getElementById("pregunta_05").getElementsByTagName('option').length;
  for (i = 0; i < nopt; i++) { 
    opcionesSelect2[i] = xmlDoc.getElementById("pregunta_05").getElementsByTagName('option')[i].innerHTML;
 }
 ponerDatosSelect2Html(tituloSelect2,opcionesSelect2);
 respuestaSelect2=parseInt(xmlDoc.getElementsByTagName("answer")[1].innerHTML);

 //CHECKBOX
 //Recuperamos el título y las opciones, guardamos las respuestas correctas
 var tituloCheckbox = xmlDoc.getElementsByTagName("title")[2].innerHTML;
 var opcionesCheckbox = [];
 var nopt = xmlDoc.getElementById("pregunta_03").getElementsByTagName('option').length;
 for (i = 0; i < nopt; i++) { 
    opcionesCheckbox[i]=xmlDoc.getElementById("pregunta_03").getElementsByTagName('option')[i].innerHTML;
 }  
 ponerDatosCheckboxHtml(tituloCheckbox,opcionesCheckbox);
 var nres = xmlDoc.getElementById("pregunta_03").getElementsByTagName('answer').length;
 for (i = 0; i < nres; i++) { 
  respuestasCheckbox[i]=xmlDoc.getElementById("pregunta_03").getElementsByTagName("answer")[i].innerHTML;
 }
  //CHECKBOX2
 //Recuperamos el título y las opciones, guardamos las respuestas correctas
 var tituloCheckbox2 = xmlDoc.getElementsByTagName("title")[2].innerHTML;
 var opcionesCheckbox2 = [];
 var nopt = xmlDoc.getElementById("pregunta_07").getElementsByTagName('option').length;
 for (i = 0; i < nopt; i++) { 
    opcionesCheckbox2[i]=xmlDoc.getElementById("pregunta_07").getElementsByTagName('option')[i].innerHTML;
 }  
 ponerDatosCheckbox2Html(tituloCheckbox2,opcionesCheckbox2);
 var nres = xmlDoc.getElementById("pregunta_07").getElementsByTagName('answer').length;
 for (i = 0; i < nres; i++) { 
  respuestasCheckbox2[i]=xmlDoc.getElementById("pregunta_07").getElementsByTagName("answer")[i].innerHTML;
 }
 
 
 
 
 //Radio
 var tituloRadioButton = xmlDoc.getElementsByTagName("title")[3].innerHTML;
 var opcionesRadioButton = [];
 var nopt = xmlDoc.getElementById("pregunta_04").getElementsByTagName('option').length;
 for (i = 0; i < nopt; i++) { 
    opcionesRadioButton[i]=xmlDoc.getElementById("pregunta_04").getElementsByTagName('option')[i].innerHTML;
 }  
 ponerDatosRadioButtonHtml(tituloRadioButton,opcionesRadioButton);
 var nres = xmlDoc.getElementById("pregunta_04").getElementsByTagName('answer').length;
 for (i = 0; i < nres; i++) { 
  respuestasRadioButton[i]=xmlDoc.getElementById("pregunta_04").getElementsByTagName("answer")[i].innerHTML;
 }
}
 //Radio
 var tituloRadioButton2 = xmlDoc.getElementsByTagName("title")[3].innerHTML;
 var opcionesRadioButton2 = [];
 var nopt = xmlDoc.getElementById("pregunta_08").getElementsByTagName('option').length;
 for (i = 0; i < nopt; i++) { 
    opcionesRadioButton2[i]=xmlDoc.getElementById("pregunta_08").getElementsByTagName('option')[i].innerHTML;
 }  
 ponerDatosRadioButton2Html(tituloRadioButton2,opcionesRadioButton2);
 var nres = xmlDoc.getElementById("pregunta_08").getElementsByTagName('answer').length;
 for (i = 0; i < nres; i++) { 
  respuestasRadioButton2[i]=xmlDoc.getElementById("pregunta_08").getElementsByTagName("answer")[i].innerHTML;
 
}


//****************************************************************************************************
//implementación de la corrección

function corregirNumber(){
  //Vosotros debéis comparar el texto escrito con el texto que hay en el xml
  //en este ejemplo hace una comparación de números enteros
  var s=formElement.elements[0].value;     
  if (s==numeroSecreto) {
   darRespuestaHtml("P1: Exacto!");
   nota +=1;
  }
  else {
    if (s>numeroSecreto) darRespuestaHtml("P1: Te has pasado");
    else darRespuestaHtml("P1: Te has quedado corto");
  }
}

function corregirNumber2(){
  //Vosotros debéis comparar el texto escrito con el texto que hay en el xml
  //en este ejemplo hace una comparación de números enteros
  var s=formElement.elements[11].value;     
  if (s==numeroSecreto2) {
   darRespuestaHtml("P6: Eso es!!");
   nota +=1;
  }
  else {
    if (s>numeroSecreto2) darRespuestaHtml("P6: Te has pasadoo");
    else darRespuestaHtml("P6: Te has quedado cortoo");
  }
}


function corregirSelect(){
  //Compara el índice seleccionado con el valor del íncide que hay en el xml (<answer>2</answer>)
  //para implementarlo con type radio, usar value para enumerar las opciones <input type='radio' value='1'>...
  //luego comparar ese value con el value guardado en answer
  var sel = formElement.elements[1];  
  if (sel.selectedIndex-1==respuestaSelect) { //-1 porque hemos puesto una opción por defecto en el select que ocupa la posición 0
   darRespuestaHtml("P2: Correcto");
   nota +=1;
  }
  else darRespuestaHtml("P2: Incorrecto");
}
function corregirSelect2(){
  //Compara el índice seleccionado con el valor del íncide que hay en el xml (<answer>2</answer>)
  //para implementarlo con type radio, usar value para enumerar las opciones <input type='radio' value='1'>...
  //luego comparar ese value con el value guardado en answer
  var sel = formElement.elements[10];  
  if (sel.selectedIndex-1==respuestaSelect2) { //-1 porque hemos puesto una opción por defecto en el select que ocupa la posición 0
   darRespuestaHtml("P5: Correcto");
   nota +=1;
  }
  else darRespuestaHtml("P5: Incorrecto");
}

//Si necesitáis ayuda para hacer un corregirRadio() decirlo, lo ideal es que a podáis construirla modificando corregirCheckbox
function corregirCheckbox(){
  //Para cada opción mira si está checkeada, si está checkeada mira si es correcta y lo guarda en un array escorrecta[]
  var f=formElement;
  var escorrecta = [];
  var correctas = 0;
  var incorrectas = 1;
  for (i = 0; i < f.color.length; i++) {  //"color" es el nombre asignado a todos los checkbox
   if (f.color[i].checked) {
    escorrecta[i]=false;     
    for (j = 0; j < respuestasCheckbox.length; j++) {
     if (i==respuestasCheckbox[j]) escorrecta[i]=true;
    }
    //si es correcta sumamos y ponemos mensaje, si no es correcta restamos y ponemos mensaje.
    if (escorrecta[i]) {
		
     nota +=1.0/respuestasCheckbox.length;  //dividido por el número de respuestas correctas   
     //darRespuestaHtml("P3: "+i+" correcta");    
    } else {
     nota -=1.0/respuestasCheckbox.length;  //dividido por el número de respuestas correctas   
     //darRespuestaHtml("P3: "+i+" incorrecta");
    }   
   } 
  }
  darRespuestaHtml("P3: Correcto");
}
function corregirCheckbox2(){
  //Para cada opción mira si está checkeada, si está checkeada mira si es correcta y lo guarda en un array escorrecta[]
  var f=formElement;
  var escorrecta = [];
  var correctas = 0;
  var incorrectas = 1;
  for (i = 0; i < f.color.length; i++) {  //"color" es el nombre asignado a todos los checkbox
   if (f.color[i].checked) {
    escorrecta[i]=false;     
    for (j = 0; j < respuestasCheckbox2.length; j++) {
     if (i==respuestasCheckbox2[j]) escorrecta[i]=true;
    }
    //si es correcta sumamos y ponemos mensaje, si no es correcta restamos y ponemos mensaje.
    if (escorrecta[i]) {
		
     nota +=1.0/respuestasCheckbox2.length;  //dividido por el número de respuestas correctas   
     //darRespuestaHtml("P3: "+i+" correcta");    
    } else {
     nota -=1.0/respuestasCheckbox2.length;  //dividido por el número de respuestas correctas   
     //darRespuestaHtml("P3: "+i+" incorrecta");
    }   
   } 
  }
  darRespuestaHtml("P7: Correcto");
}
function corregirRadioButton(){
  //Para cada opción mira si está checkeada, si está checkeada mira si es correcta y lo guarda en un array escorrecta[]
  var f=formElement;
  var escorrecta = [];
  for (i = 0; i < f.pene.length; i++) {  //"color" es el nombre asignado a todos los checkbox
   if (f.pene[i].checked) {
    escorrecta[i]=false;     
    for (j = 0; j < respuestasRadioButton.length; j++) {
     if (i==respuestasRadioButton[j]) escorrecta[i]=true;
    }
    //si es correcta sumamos y ponemos mensaje, si no es correcta restamos y ponemos mensaje.
    if (escorrecta[i]) {
		
     nota +=1.0/respuestasRadioButton.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("P4: Correcta");    
    } else {
     darRespuestaHtml("P4: incorrecta");
    }   
   } 
  }
}
function corregirRadioButton2(){
  //Para cada opción mira si está checkeada, si está checkeada mira si es correcta y lo guarda en un array escorrecta[]
  var f=formElement;
  var escorrecta = [];
  for (i = 0; i < f.pene.length; i++) {  //"color" es el nombre asignado a todos los checkbox
   if (f.pene[i].checked) {
    escorrecta[i]=false;     
    for (j = 0; j < respuestasRadioButton2.length; j++) {
     if (i==respuestasRadioButton2[j]) escorrecta[i]=true;
    }
    //si es correcta sumamos y ponemos mensaje, si no es correcta restamos y ponemos mensaje.
    if (escorrecta[i]) {
		
     nota +=1.0/respuestasRadioButton2.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("P4: Correcta");    
    } else {
     darRespuestaHtml("P4: incorrecta");
    }   
   } 
  }
}

//****************************************************************************************************
// poner los datos recibios en el HTML
function ponerDatosInputHtml(t){
 document.getElementById("tituloInput").innerHTML = t;
}
function ponerDatosInput2Html(t){
 document.getElementById("tituloInput2").innerHTML = t;
}

function ponerDatosSelectHtml(t,opt){
  document.getElementById("tituloSelect").innerHTML=t;
  var select = document.getElementsByTagName("select")[0];
  for (i = 0; i < opt.length; i++) { 
    var option = document.createElement("option");
    option.text = opt[i];
    option.value=i+1;
    select.options.add(option);
 }  
}

function ponerDatosSelect2Html(t,opt){
  document.getElementById("tituloSelect2").innerHTML=t;
  var select = document.getElementsByTagName("select")[1];
  for (i = 0; i < opt.length; i++) { 
    var option = document.createElement("option");
    option.text = opt[i];
    option.value=i+1;
    select.options.add(option);
 }  
}

function ponerDatosCheckboxHtml(t,opt){
 var checkboxContainer=document.getElementById('checkboxDiv');
 document.getElementById('tituloCheckbox').innerHTML = t;
 for (i = 0; i < opt.length; i++) { 
    var input = document.createElement("input");
    var label = document.createElement("label");
    label.innerHTML=opt[i];
    label.setAttribute("for", "color_"+i);
    input.type="checkbox";
    input.name="color";
    input.id="color_"+i;;    
    checkboxContainer.appendChild(input);
    checkboxContainer.appendChild(label);
    checkboxContainer.appendChild(document.createElement("br"));
 }  
}

function ponerDatosCheckbox2Html(t,opt){
 var checkbox2Container=document.getElementById('checkboxDiv2');
 document.getElementById('tituloCheckbox2').innerHTML = t;
 for (i = 0; i < opt.length; i++) { 
    var input = document.createElement("input");
    var label = document.createElement("label");
    label.innerHTML=opt[i];
    label.setAttribute("for", "color_"+i);
    input.type="checkbox";
    input.name="color";
    input.id="color_"+i;;    
    checkbox2Container.appendChild(input);
    checkbox2Container.appendChild(label);
    checkbox2Container.appendChild(document.createElement("br"));
 }  
}

function ponerDatosRadioButtonHtml(t,opt){
 var RadioButtonContainer=document.getElementById('radioButtonDiv');
 document.getElementById('tituloRadioButton').innerHTML = t;
 for (i = 0; i < opt.length; i++) { 
    var input = document.createElement("input");
    var label = document.createElement("label");
    label.innerHTML=opt[i];
    label.setAttribute("for", "pene"+i);
    input.type="radio";
    input.name="pene";
    input.id="pene_"+i;;    
    RadioButtonContainer.appendChild(input);
    RadioButtonContainer.appendChild(label);
    RadioButtonContainer.appendChild(document.createElement("br"));
 }  
}
function ponerDatosRadioButton2Html(t,opt){
 var RadioButtonContainer=document.getElementById('radioButtonDiv2');
 document.getElementById('tituloRadioButton2').innerHTML = t;
 for (i = 0; i < opt.length; i++) { 
    var input = document.createElement("input");
    var label = document.createElement("label");
    label.innerHTML=opt[i];
    label.setAttribute("for", "pene"+i);
    input.type="radio";
    input.name="pene";
    input.id="pene_"+i;;    
    RadioButtonContainer.appendChild(input);
    RadioButtonContainer.appendChild(label);
    RadioButtonContainer.appendChild(document.createElement("br"));
 }  
}

//****************************************************************************************************
//Gestionar la presentación de las respuestas
function darRespuestaHtml(r){
 var p = document.createElement("p");
 var node = document.createTextNode(r);
 p.appendChild(node);
 document.getElementById('resultadosDiv').appendChild(p);
}

function presentarNota(){
   darRespuestaHtml("Nota: "+nota+" puntos sobre 7");
}

function inicializar(){
   document.getElementById('resultadosDiv').innerHTML = "";
   nota=0.0;
}

//Comprobar que se han introducido datos en el formulario
function comprobar(){
   var f=formElement;
   var checkedCheckbox=false;
   var checkedCheckbox2=false;
   var checkedRadioButton=false;
    var checkedRadioButton2=false;
   for (i = 0; i < f.color.length; i++) {  //"color" es el nombre asignado a todos los checkbox
      if (f.color[i].checked) checkedCheckbox=true;
   }
     for (i = 0; i < f.color.length; i++) {  //"color" es el nombre asignado a todos los checkbox
      if (f.color[i].checked) checkedCheckbox2=true;
   }
   for (i = 0; i < f.pene.length; i++) {
	if (f.pene[i].checked) checkedRadioButton=true;
   }
 
   if (f.elements[0].value=="") {
    f.elements[0].focus();
    alert("Escribe un número");
    return false;
   } else if (f.elements[1].selectedIndex==0) {
    f.elements[1].focus();
    alert("Selecciona una opción");
    return false;
   } if (!checkedCheckbox) {    
    document.getElementsByTagName("h3")[2].focus();
    alert("Selecciona una opción del checkbox");
    return false;

   } if (!checkedRadioButton) {    
    document.getElementsByTagName("h3")[3].focus();
    alert("Selecciona una opción del radioButton");
    return false;

	
   } else  return true;
}
