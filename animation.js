
function Animation(t,m){

	this.tab=t;
	this.mot=m;
    this.anime=true;
    this.ind=parseInt(0);
	this.animateMotion=null;
    this.animateMotion1=null;
    this.cercle=creerCercle();
    this.vit=0;
    
    t[0].getEl().appendChild(this.cercle);
    

    this.vitesse=function(v){

    	this.vit=v;

    };


    this.getVitesse=function(){

    	return this.vit;
    };

    this.getCercle=function(){


    	return this.cercle;
    };


    function creerCercle(){


    var cercle=document.createElementNS("http://www.w3.org/2000/svg","circle");
	cercle.setAttribute("cx","-15");
	cercle.setAttribute("cx","-15");
	cercle.setAttribute("r","15");
	cercle.setAttribute("fill","black");
	cercle.setAttribute("stroke-width","1");
    cercle.setAttribute("stroke","black");
    return cercle;

    }
  
    this.getTab=function(){

    	return this.tab;
    };



    this.test=function(x,taille,path,u){

    	if(x>taille){

            if (u.getTab()[u.getIndex()].getEtatDe().estInitial())
                u.getTab()[u.getIndex()].getEtatDe().getCercle().setAttribute("fill","white");
            else u.getTab()[u.getIndex()].getEtatDe().getCercle().setAttribute("fill","red");
            u.getTab()[u.getIndex()].getEtatA().getCercle().setAttribute("fill","yellow");

            if (u.getTab()[u.getIndex()].getEtatA().estFinal())
                u.getTab()[u.getIndex()].getEtatA().getCercle2().setAttribute("fill","yellow");
          //  u[this.ind].getEtatA().getCercle().setAttribute("fill","yellow");


    		u.incrementIndex();
    		if(u.getIndex()==u.getTab().length){
                $(u.getCercle()).remove();
                setTimeout(function(){

                  
                     u.getTab()[u.getIndex()-1].getEtatA().getCercle().setAttribute("fill","red");
                     u.getTab()[u.getIndex()-1].getEtatA().getCercle2().setAttribute("fill","red");
                    
                },1000);
                

               // u.getTab[u.getIndex()-1].getEtatA().clignoter();
                //alert(u.getTab[u.getIndex()-1].getEtatA());
    			for(i=0;i<u.getTab().length;i++)
    				u.getTab()[i].setColor("blue");
    		}else u.animer();

    	}else{

            if(u.getAnime()){
    	    point=path.getPointAtLength(x);
        	u.getCercle().setAttribute("cx",point.x);
        	u.getCercle().setAttribute("cy",point.y);
        	
        	 setTimeout(function(){ 

        	 	u.test(x+2,taille,path,u);

        	 //	console.log(u.getVitesse());
        	 },u.getVitesse());


            }
    	}


    };

    this.animer=function(){

    	/*
    	if(this.ind==0){

    		for(i=0;i<this.tab.length;i++)
    			this.tab[i].setColor("yellow");


    	}
	*/

		//if(this.ind==0) u[this.ind].getEtatDe().clignoter();
    	
    	var u=this.tab;
	
        //u[this.ind].getEtatDe().clignoter();
		u[this.ind].getEtatDe().getCercle().setAttribute("fill","yellow");
        var u1=this;
        u[this.ind].setColor("yellow");

        var path=u[u1.getIndex()].getPath();

        var taille=path.getTotalLength();
        var pi=path.getPointAtLength(0);
        var pf=path.getPointAtLength(taille);
        
       
       
    	this.test(0,taille,path,u1);


        
        //this.animer();

    };



    this.incrementIndex=function(){

    	this.ind=this.ind+1;

    };

    this.getIndex=function(){

    	return this.ind;
    };

     this.getAnimateMotion=function(){

    	return this.animateMotion;
    };
      this.getAnimateMotion1=function(){

    	return this.animateMotion1;
    };

    this.creerAnimation=function(){

    
    	if(this.animateMotion!=null) 
{
//$(this.animateMotion).remove();

}
    		
    	
    	var i;
    	var deb;
    	for(i=0;i<this.tab.length;i++){
    		
    		if(i==0) deb="0s";
    		else deb=this.tab[i-1].getId()+".end"; 
    		this.tab[i].createAnimation((i*3)+"s");

    	}
    	

    };

	


	this.getAnime=function(){

		return this.anime;
	};

	this.pause=function(){

		this.anime=false;
	};

	this.play=function(){

		this.anime=true;
	};
}

