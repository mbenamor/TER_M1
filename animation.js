
function Animation(t,m,aut){

    this.automate=aut;
	this.tab=t;
	this.mot=m;
    this.anime=true;
    this.ind=parseInt(0);
	this.animateMotion=null;
    this.animateMotion1=null;
    this.cercle=creerCercle();
    this.vit=0;
    this.elem=t[0].getEl();
    t[0].getEl().appendChild(this.cercle);
    this.getAutomate=function(){
        return this.automate;
    };
    this.mettreAJour=function(){


    this.tab=t;
    this.mot=m;
    this.anime=true;
    this.ind=parseInt(0);
    this.animateMotion=null;
    this.animateMotion1=null;
    this.cercle=creerCercle();
    this.vit=0;
    
    this.elem.appendChild(this.cercle);
    $("#stop").hide();
    $("#play").show();
    
    };

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
	cercle.setAttribute("cx","-1500");
	cercle.setAttribute("cx","-1500");
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
            else u.getTab()[u.getIndex()].getEtatDe().getCercle().setAttribute("fill",u.getAutomate().getColorState());
            u.getTab()[u.getIndex()].getEtatA().getCercle().setAttribute("fill",u.getAutomate().getColorAnimation());

            if (u.getTab()[u.getIndex()].getEtatA().estFinal())
                u.getTab()[u.getIndex()].getEtatA().getCercle2().setAttribute("fill",u.getAutomate().getColorAnimation());
          


    		u.incrementIndex();
    		if(u.getIndex()==u.getTab().length){
                 $("#c"+(this.getIndex()-1)).html("<font  size='10px' color='green'>"+this.mot.charAt(this.getIndex()-1)+"</font>");
                $(u.getCercle()).remove();
                setTimeout(function(){

                     
                     u.getTab()[u.getIndex()-1].getEtatA().getCercle().setAttribute("fill",u.getAutomate().getColorState());
                     u.getTab()[u.getIndex()-1].getEtatA().getCercle2().setAttribute("fill",u.getAutomate().getColorState());

                     u.mettreAJour();
                },1000);
                

    			for(i=0;i<u.getTab().length;i++)
    				u.getTab()[i].setColor(u.getAutomate().getColorTransition());
    		}else u.animer();

    	}else{

            if(u.getAnime()){
    	    point=path.getPointAtLength(x);
        	u.getCercle().setAttribute("cx",point.x);
        	u.getCercle().setAttribute("cy",point.y);
        	
        	 setTimeout(function(){ 

        	 	u.test(x+(path.getTotalLength()/100),taille,path,u);

        	 },u.getVitesse());


            }
    	}


    };

    this.animer=function(){


    	
    	var u=this.tab;

		u[this.ind].getEtatDe().getCercle().setAttribute("fill",this.getAutomate().getColorAnimation());

        $("#c"+this.getIndex()).html("<font  size='30px' color='"+this.getAutomate().getColorAnimation()+"'>"+this.mot.charAt(this.getIndex())+"</font>");
        if(this.getIndex()>0)
            $("#c"+(this.getIndex()-1)).html("<font  size='100px' color='green'>"+this.mot.charAt(this.getIndex()-1)+"</font>");
        var u1=this;
        u[this.ind].setColor(this.getAutomate().getColorAnimation());

        var path=u[u1.getIndex()].getPath();

        var taille=path.getTotalLength();
        var pi=path.getPointAtLength(0);
        var pf=path.getPointAtLength(taille);
        
       
       
    	this.test(0,taille,path,u1);



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

