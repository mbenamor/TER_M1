




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



// c'est la matrice qui va contenir tous mes etats
this.m=new Matrice();




// n c'est le nombre d'etats
// e c'est l'ensemble d'etiquettes
// f c'est l'ensemble des etats finaux
// t c'est l'ensemble des transitions
this.initialiser=function(){


//$("#svg").attr("height","10000");

//var element =this.svg;

var element=document.getElementById("svg");
 
 

/*

 if (element.offsetParent !== undefined) {
		do {
			this.offsetX += element.offsetLeft;
			this.offsetY += element.offsetTop;
		} while ((element = element.offsetParent));
	}
  
 */

this.offsetX += $(element).offset().left;
this.offsetY += $(element).offset().top;

var defs=document.getElementById("definition");

this.m.creerMatrice(this.n);



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
	
	//alert("nb ini+"this.initiaux.length);
	
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
				
				/*
				var pom = document.createElement("a");
  						

				
  				 var textNode = document.createTextNode("telecharger le fichier SVG");
  			 
  					 pom.setAttribute('href', 'data:svg/plain;charset=utf-8,' + encodeURIComponent(texte));
  					 pom.setAttribute('download', "automate.svg");
					 
					 pom.click();
					*/
					
};

this.reconaissance=function(t){
	t=t.trim();
	
	var tab=[];

for(i=0;i<this.initiaux.length;i++)
	this.etats[i].reconnaitre(t,tab,0);	

};

this.animation=function(tab,mot){

	this.animations.push(new Animation(tab,mot));
	
	$("#play").show();
	
	$("#ul").append("<li><a href='#'>lancer l'animation "+this.animations.length+"</a></li>");


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







