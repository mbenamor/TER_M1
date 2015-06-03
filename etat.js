
function Etat(n,aut){

this.num=n;
this.trans=[];
this.cercle=null;
this.cercle2=null;
this.x=0;
this.y=0;
this.ligne=0;
this.colonne=0;
this.clicked=false;
this.automate=aut;
this.g=null;
this.texte=null;
this.ini=false;
this.fin=false;
this.dx=0;
this.dy=0;


// c'est l'element du dom svg dans lequel l'etat sera dessinée
this.el=null;


this.getColor=function(){

	return this.automate.getColorState();
};

this.getColorIndice=function(){

	return this.automate.getColorIndice();
};

this.setColor=function(c){

	this.cercle.setAttribute("fill",c);
	if(this.fin)
	this.cercle2.setAttribute("fill",c);
};

this.setColorIndice=function(c){
	this.texte.setAttribute("fill",c);
};


this.reconnu=function(mot){

	$("#pasReconnu").hide();
	$("#reconnu").show();
	var str="<table><tr>";
	var id;
	for(i=0;i<mot.length;i++){
		id="c"+i;
		str=str+"<td id='"+id+"' ><font  size='10px' color='green'>"+mot.charAt(i)+"</font></td>";
	}
	str=str+"</tr></table>"
		
    $("#reconnu").html("Le mot a été reconnu "+str);
   
  

};


this.pasReconnu=function(mot,ind){

    var rec=mot.substring(0,ind);
    var pr=mot.substring(ind,mot.length);
  
    $("#reconnu").hide();
    $("#pasReconnu").show();
    	var str="<table><tr>";
	var id;
	for(i=0;i<rec.length;i++){
		id="c"+i;
		str=str+"<td id='"+id+"' ><font  size='10px' color='green'>"+mot.charAt(i)+"</font></td>";
	}
	for(i=0;i<pr.length;i++){
		
		str=str+"<td><font  size='10px' color='red'>"+pr.charAt(i)+"</font></td>";
	}

	str=str+"</tr></table>"
		
    $("#pasReconnu").html("Le mot n'a pas été reconnu  "+str);


};

this.clignoter=function(){


this.cercle.setAttribute("fill","yellow");
u=this;

setTimeout(function(){

u.getCercle().setAttribute("fill",this.getColor());


},500);

};


this.getCercle=function(){

	return this.cercle;

};

this.getCercle2=function(){
	return this.cercle2;
};

this.estInitial=function(){

	return this.ini;
};

this.estFinal=function(){
	return this.fin;

};


this.isInitial=function(){
	this.ini=true;
};

this.isFinal=function(){

	this.fin=true;
};


this.ajouterTransition=function(k){
	
	
	 this.trans.push(k);
	 

};


this.getTrans=function(){


return this.trans;
};

this.getNum=function(){

	return this.num;
};

this.getAutomate=function(){

return this.automate;
};

// et c'est l'element dans le dom des transitions

this.addEl=function(e){

	
	this.el=e;
	

};


this.tester=function(){
	
	
	for(var i=0;i<this.trans.length;i++)
		console.log(this.trans[i].getDe()+"->"+this.trans[i].getEtiquette()+"->"+this.trans[i].getA());
};


this.ecart=function(e){

return Math.abs(this.num-e.getNum)-1;

};

this.dessiner=function(){
	

		this.x=this.colonne*300+200;
		this.y=this.ligne*200+100;
		this.cercle=document.createElementNS("http://www.w3.org/2000/svg","circle");
	    this.cercle.setAttribute("stroke-width","3");
		this.cercle.setAttribute("cx",this.x);
		this.cercle.setAttribute("cy",this.y);
		
		if(this.ini)
			 this.cercle.setAttribute("fill","white");
		else this.cercle.setAttribute("fill",this.getColor());
		
		this.cercle.setAttribute("stroke","black");
		this.cercle.setAttribute("r","40");
		this.cercle.setAttribute("filter","url(#dropShadow)");
		
		if(this.fin){

		this.cercle2=document.createElementNS("http://www.w3.org/2000/svg","circle");
		this.cercle2.setAttribute("stroke-width","3");
		this.cercle2.setAttribute("cx",this.x);
		this.cercle2.setAttribute("cy",this.y);
		this.cercle2.setAttribute("fill",this.getColor());
		this.cercle2.setAttribute("stroke","black");
		this.cercle2.setAttribute("r","35");
	}
		this.g=document.createElementNS("http://www.w3.org/2000/svg","g");
		this.g.appendChild(this.cercle);
		if(this.fin)
		this.g.appendChild(this.cercle2);

		this.texte=document.createElementNS("http://www.w3.org/2000/svg","text");
	var textNode = document.createTextNode(this.num);
		this.texte.setAttribute("x",this.x);
		this.texte.setAttribute("y",this.y+20);
		this.texte.setAttribute("class","id");
		this.texte.setAttribute("fill",this.getColorIndice());


		this.texte.setAttribute("font-size","50");
		this.texte.appendChild(textNode);
		this.g.appendChild(this.texte);
		this.el.appendChild(this.g);
	var u=this;
	
	$(this.g).on("mousedown",function(e){
	

		u.down();
		u.dx=e.pageX;
		u.dy=e.pageY;
		e.stopPropagation();
	
	});
	
	
	$(document).on("mouseup",function(){
	
	u.up();
	
	});
	
	$("body").on("mousemove",function(e){
	
	if(u.isClicked()){
		//u.setCord(e.pageX-u.getAutomate().getOffsetX(),e.pageY-u.getAutomate().getOffsetY());
		 u.setCord(e.pageX-u.dx,e.pageY-u.dy)
		 u.dx=e.pageX;
		 u.dy=e.pageY;
		// ceci permet de redessiner toutes les transitions
		//u.getAutomate().redessinerTrans();;
		
		// cette methode permet de redessiner seulement les transitions en rapport avec 
		// les etats sortantes ou entrantes
		u.redessinerTrans();
		u.getAutomate().redessinerTransitions(u.getNum());
		}
	});

};

this.redessinerTrans=function(){


for(var i=0;i<this.trans.length;i++){

	this.trans[i].redessiner();
}

};


this.down=function(){

	this.clicked=true;
};

this.up=function(){

this.clicked=false;

};

this.isClicked=function(){

	return this.clicked;
};

this.setX=function(i){

this.ligne=i;
//this.x=i*300+150;

};

this.setY=function(c){

this.colonne=c;

//this.y=c*200+100;
};

this.setCord=function(xcor,ycor){

	this.x+=(xcor/this.getAutomate().getScale());
	this.y+=(ycor/this.getAutomate().getScale());
	this.cercle.setAttribute("cx",this.x);
	this.cercle.setAttribute("cy",this.y);
	
	if(this.fin){
	this.cercle2.setAttribute("cx",this.x);
	this.cercle2.setAttribute("cy",this.y);
	}
	this.texte.setAttribute("x",this.x);
	this.texte.setAttribute("y",this.y+20);
};


this.getX=function(){

return this.x;
};


this.getY=function(){

return this.y;

};


this.getLigne=function(){

return this.ligne;
};

this.getColonne=function(){

	return this.colonne;

};


this.surMemeAxe=function(e){

// return vrai si l'etat e et l'etat courant sont sur le meme axe

return ((this.ligne==e.getLigne())||(this.colonne==e.getColonne()))  ;


};


this.lienDirect=function(e){
// si les deux etats ne sont pas sur le meme axe donc pas de problem

if(this.surMemeAxe(e)==false){

return true;
} 

// si c'est sur le meme axe il faut pas qu'il y ait un etat qui gene la transition sinon il faut courber la transition


if(this.memeLigne(e)){

// s'ils se trouve sur la meme colonne

	return  this.getAutomate().getMatrice().verifLigne(this.ligne,this.colonne,e.getColonne());
	

}else{


// s'ils se trouvent sur la meme ligne
return this.getAutomate().getMatrice().verifColonne(this.colonne,this.ligne,e.getLigne());
  

}



};


this.memeLigne=function(e){
	// renvoie vrai si les deux transation ont le meme indice ligne
	return (this.ligne==e.getLigne());
};

this.auDessus=function(e){
// verifie si l'etat courant se situe au dessus de l'etat a


return (this.ligne<e.getLigne());
};

this.aGauche=function(e){
// verifie si l'etat courant se situe sur la gauche de l'etat a


return (this.colonne<e.getColonne());

};


this.existeTransation=function(e){


var t=e.getTrans();
	
for(var i=0;i<t.length;i++){

	
	if(t[i].getA()==this.num) 
	{
		
		return true;
	}



}


return false;

};


this.reconnaitre=function(mot,tab,ind){
$("#reconnu").hide();
$("#pasReconnu").hide();


if(ind==mot.length){

	
	if(this.estFinal()){

		
		$("#reconnu").show();
		this.getAutomate().animation(tab,mot);
		this.reconnu(mot);


	}else{


		this.pasReconnu(mot,ind);
		this.getAutomate().animation(tab,mot);	

	}



}else{

	
	
	
	for(i=0;i<this.trans.length;i++){


		if(this.trans[i].getEtiquette()==mot.charAt(ind)){
			ind++;
			tab.push(this.trans[i]);
			var etatArrivee=this.trans[i].getA();
				
			this.getAutomate().getEtat(etatArrivee).reconnaitre(mot,tab,ind);
			return;
		}



	}

	this.pasReconnu(mot,ind);
	this.getAutomate().animation(tab,mot);

}




};

}




