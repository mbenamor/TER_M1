/*

l'objectid est de stocker les etats dans une matrice car ceci pourra nous faciliter le travail
donc ca va etre des etats qui dessinent le contour d'un rectangle

*/
function Matrice(){

this.matrice=null;


this.creerMatrice=function(nb){


var kk=0;
while((kk*4)<nb){

kk++;

}

kk++;

var mat=[];

//var hauteure=Math.floor((nb-6)/2)+2+(nb-6)%2;;
//var hauteure;
//if(nb<=3) hauteure=1;
//else if(nb<=6) hauteure=2;
//else hauteure=2+Math.floor((nb-6)/2)+nb%2;


for(var i=0;i<kk;i++){
	mat[i]=[];
	for(var j=0;j<kk;j++)
		mat[i][j]=false;
	}


	for(i=0;i<kk;i++){

		for(j=0;j<kk;j++){

			if((i==0)||(i==kk-1)||(j==0)||(j==kk-1)) mat[i][j]=true;
			else mat[i][j]=false;

						}

	}
	
	this.matrice=mat;
	
};



this.ajouter=function(e){


	for(var i=0;i<this.matrice.length;i++){
	
		for(var j=0;j<this.matrice.length;j++){
			if(this.matrice[i][j]==true){
				
				this.matrice[i][j]=e;
				return;
				
				}

		}

	}


};

this.placer=function(e){

// permet de placer les etats dans la matrice

for(var i=0;i<e.length;i++){
	
	

	this.ajouter(e[i]);

}


this.falserCasesLibres();


};

this.falserCasesLibres=function(){

	for(var i=0;i<this.matrice.length;i++){
	
		for(var j=0;j<this.matrice.length;j++){
			
		
			if(this.matrice[i][j]==true){
				this.matrice[i][j]=false;
		
				
			}
		}
	
	}

};





this.dessiner=function(){

for(var i=0;i<this.matrice.length;i++){

	for(var j=0;j<this.matrice.length;j++){

		if(this.matrice[i][j]!=false){
		this.matrice[i][j].setX(i);
		this.matrice[i][j].setY(j);
		this.matrice[i][j].dessiner();

		}


	}
}


};


this.getMatrice=function(){

	return this.matrice;

	};


 this.verifLigne=function(l,a,b){
 	// cette methode retourne vrai s'il existe un etat entre les deux etats

 	
 	var aux;
 	if(a>b){

 		aux=a;
 		a=b;
 		b=aux;

 	}

 	for (var i=a+1;i<b;i++)
 			if(this.matrice[i][l]!=false){
 				
 				return false;
 				
				}
 				return true;


 };


 this.verifColonne=function(c,a,b){


 	
 	var aux;
 	if(a>b){

 		aux=a;
 		a=b;
 		b=aux;

 	}

 	for (var i=a+1;i<b;i++)
 			if(this.matrice[c][i]!=false)
 				return false;
 				return true;



 };



}



