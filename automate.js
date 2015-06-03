




function Automate(nb,e,f,ini,t,s){


this.n=nb;
this.etats=[];
this.finaux=f;
this.initiaux=ini;
this.etiquettes=e;
this.svg=s;
this.trans=t;
this.animations=[];
this.offsetX=0;
this.offsetY=0;

this.colorState="red";
this.colorTransition="blue";
this.colorAnimation="yellow";
this.colorIndice="black";
this.colorEtiquette="black";
this.colorBackground="white";
this.colorToChange=0;
this.coef=0.01;



this.scale=1;
this.plus=true;
this.x=0;
this.y=0;
this.dx=2;

this.getScale=function(){
	return this.scale;
};

this.translateX=function(xx){

this.x+=xx/this.scale;
this.updateOffsetX(xx);

$("#ctn").attr("transform","scale("+this.scale+")translate("+this.x+" "+this.y+")");


};

this.scalePlus=function(){
	
this.plus=true;
this.scale*=1.05;
this.coef+=0.0001;
this.updateOffsetX(this.dx*-1*0.1);
this.dx*=1.225;
$("#ctn").attr("transform","scale("+this.scale+")translate("+this.x+" "+this.y+")");
};

this.scaleMoin=function(){



this.plus=false;
this.scale*=0.95;

console.log(this.scale);
$("#ctn").attr("transform","scale("+this.scale+")translate("+this.x+" "+this.y+")");
};

this.scaleMoinBis=function(xx){

this.plus=false;
this.scale*=xx;

console.log(this.scale);
$("#ctn").attr("transform","scale("+this.scale+")translate("+this.x+" "+this.y+")");
};

this.translateY=function(yy){

this.y+=yy/this.scale;
$("#ctn").attr("transform","scale("+this.scale+")translate("+this.x+" "+this.y+")");
this.updateOffsetY(yy);
};




this.updateOffsetX=function(x){
	this.offsetX+=x;
};

this.updateOffsetY=function(y){
this.offsetY+=(y);
};




this.getColorToChange=function(){

	return this.colorToChange;
};

this.setColorToChange=function(c){

	this.colorToChange=c;
};


this.getColorBackground=function(){
	return this.colorBackground;
};

this.setColorBackground=function(c){
	this.colorBackground=c;
};
this.getColorState=function(){
 return this.colorState;
};

this.setColorState=function(c){

	this.colorState=c;
};

this.getColorTransition=function(){

 return this.colorTransition;
};

this.setColorTransition=function(c){
	this.colorTransition=c;
};

this.getColorAnimation=function(){
	return this.colorAnimation;
};

this.setColorAnimation=function(c){
	this.colorAnimation=c;
};

this.getColorIndice=function(){
	return this.colorIndice;
};

this.setColorIndice=function(c){
	this.colorIndice=c;
};

this.getColorEtiquette=function(){

	return this.colorEtiquette;
};

this.setColorEtiquette=function(c){

	this.colorEtiquette=c;
};


this.colorerEtats=function(c){

	this.setColorState(c);
	for(i=0;i<this.etats.length;i++){

		this.etats[i].setColor(c);

	}

};

this.colorerTransitions=function(c){

	this.setColorTransition(c);
	for(i=0;i<this.trans.length;i++){

		this.trans[i].setColor(c);
	}
};

this.colorerEtiquettes=function(c){

	this.setColorEtiquette(c);
	for(i=0;i<this.trans.length;i++){

		this.trans[i].setColorEtiquette(c);
	}
};

this.colorerIndices=function(c){

this.setColorIndice(c);
	for(i=0;i<this.etats.length;i++){

		this.etats[i].setColorIndice(c);

	}

};

this.colorerAnimation=function(c){

	this.setColorAnimation(c);


};


this.colorerBackground=function(c){

	this.setColorBackground(c);
};

this.modifyColor=function(c){


var i=this.getColorToChange();

switch(i){


	case 0 : {this.colorerEtats(c);break;}

	case 1 : {this.colorerTransitions(c);break;}

	case 2 : {this.colorerIndices(c);break;}

	case 3 : {this.colorerEtiquettes(c);break;}

	case 4 : {this.colorerAnimation(c);break;}

	case 5 : {this.colorerBackground(c);break;}

}

};

// c'est la matrice qui va contenir tous mes etats
this.m=new Matrice();




// n c'est le nombre d'etats
// e c'est l'ensemble d'etiquettes
// f c'est l'ensemble des etats finaux
// t c'est l'ensemble des transitions
this.initialiser=function(){



var element=document.getElementById("svg");
 


this.offsetX += $(element).offset().left;
this.offsetY += $(element).offset().top;

var defs=document.getElementById("definition");
var elem=this;
this.m.creerMatrice(this.n,elem);



var i;
var u=this;
var g=document.getElementById("ctn");

for(i=0;i<this.n;i++){
	
	var e=new Etat(i,u);
	    
	   // e.addEl(this.svg);	
	    e.addEl(g);
	    this.etats[i]=e;

	
	}
	
for( i=0;i<t.length;i++)
			{
	
	 t[i].addAutomate(u);
	 
	 //t[i].addEl(this.svg);
	 t[i].addEl(g);
	 this.etats[t[i].getDe()].ajouterTransition(t[i]);
	
	
	



	}
	
	
	var indice;

	
	for(i=0;i<this.initiaux.length;i++){
		

		
		indice=this.initiaux[i];

		this.etats[parseInt(indice)].isInitial();
		
		
	}
	
	
	
	for(i=0;i<this.finaux.length;i++){
		
		
		indice=this.finaux[i];
		
		this.etats[parseInt(indice)].isFinal();
		
		
	}
	
	// placer les etats dans la matrice
	this.m.placer(this.etats);
	this.dessinerTrans();
	this.m.dessiner();
	this.redessinerTrans();    

	$("#textarea").show();




	
};



this.getEtat=function(i){

return this.etats[i];
};

this.getInitiaux=function(){

	return this.initiaux;
};

this.ajouterEtat=function(e){

this.etats.push(e);

};


this.supprimerEtat=function(e){

//this.etats.enlever(e);

};


this.redessinerTrans=function(){

	for(var i=0;i<this.trans.length;i++)
		this.trans[i].redessiner();

};


this.redessinerTransitions=function(k){
	
	for(var i=0;i<this.trans.length;i++)
		if(this.trans[i].getA()==k)
			this.trans[i].redessiner();

};


this.dessinerTrans=function(){

for(var i=0;i<this.trans.length;i++)
		this.trans[i].dessiner();
};


this.getMatrice=function(){

	return this.m;

};


this.getOffsetX=function(){

	return this.offsetX;
};

this.getOffsetY=function(){

	return this.offsetY;
};


this.telecharger=function(){
			
				
				var texte=$('#droite').html();
				
				$("#texte").html(texte);
				return texte;
				
					
};

this.telecharger2=function(){
			
				
				var texte=$('#svg').html();
				$("#texte").html(texte);
				return "<svg>"+texte+"</svg>";
				
					
};

this.reconaissance=function(t){
	t=t.trim();
	
	var tab=[];

for(i=0;i<this.initiaux.length;i++)
	this.etats[i].reconnaitre(t,tab,0);	

};

this.animation=function(tab,mot){

	u=this;
	this.animations.push(new Animation(tab,mot,u));
	
	$("#play").show();
	
	$("#ul").wrap("<li><a href='#'>lancer l'animation "+this.animations.length+"</a></li>");


	var u=this;
	$("#ul li").click(function(){



					u.animer($("#ul li").index($(this)));

				});

};


this.animer=function(ind){

	this.animations[parseInt(ind)].animer();
};

this.animer2=function(){
this.animations[this.animations.length-1].play();
this.animations[this.animations.length-1].animer();
$("#play").hide();
$("#stop").show();

};




 this.pause=function(){

 	this.animations[this.animations.length-1].pause();
 	$("#play").show();
	$("#stop").hide();
 };

this.vitesse=function(v){

console.log(100-parseInt(v));
this.animations[this.animations.length-1].vitesse(100-parseInt(v));

};

}







