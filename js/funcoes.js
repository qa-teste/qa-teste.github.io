$(document).ready(function(){
	var parametros = location.search.split('?')[1];
	if(parametros!="" && typeof parametros != "undefined"){
		ocorrencia=parametros.split('&')[0];
		severidade=parametros.split('&')[1];
		deteccao=parametros.split('&')[2];
		//grupo=parametros.split('&')[3];
		criticidade=parametros.split('&')[3];
		
		valor_ocorrencia=ocorrencia.split('=')[1];
		valor_severidade=severidade.split('=')[1];
		valor_deteccao=deteccao.split('=')[1];
		//valor_grupo=grupo.split('=')[1];
		valor_criticidade=criticidade.split('=')[1];

		$('#ocorrencia').val(valor_ocorrencia);
		$('#severidade').val(valor_severidade);
		$('#deteccao').val(valor_deteccao);
		//$('#grupo').val(valor_grupo);
		
		//criticidade=valor_criticidade.split('%')[0];
		var cor="#545454";
		var cor_fonte="#000";
		var nivel=valor_criticidade;
		if(nivel=="Trivial"){
			cor="#94ff7a";
		}
		else if(nivel=="Minor"){
			cor="#fffa00";
		}
		else if(nivel=="Major"){
			cor="#ff9900";
		}
		else if(nivel=="Critical"){
			cor="#ff0000";
			cor_fonte="#FFF";
		}
		else if(nivel=="Blocked"){
			cor="#000";
			cor_fonte="#FFF";
		}
		//criticidade=Math.round(criticidade);
		$('#criticidade').css('background', cor);
		$('#criticidade').css('color', cor_fonte);
		$('#criticidade').val(nivel);
	}
});

function calcularFmea(){	
	if($('#ocorrencia').val()==0 && $('#ocorrencia').val()!=""){
		var ocorrencia=1;
		$('#ocorrencia').val(1);
	} else{
		var ocorrencia= $('#ocorrencia').val();
	}
	
	if($('#severidade').val()==0 && $('#severidade').val()!=""){
		var severidade=1;
		$('#severidade').val(1);
	} else{
		var severidade= $('#severidade').val();
	}
	
	if($('#deteccao').val()==0 && $('#deteccao').val()!=""){
		var deteccao=1;
		$('#deteccao').val(1);
	} else{
		var deteccao= $('#deteccao').val();
	}
	
	//var grupo = $('#grupo').val();
	
	
	if(ocorrencia!="" && severidade!="" && deteccao!=""/* && grupo!="" && grupo!=null*/){
		//var criticidade = ((ocorrencia*severidade*deteccao)/125)*grupo*100;
		var criticidade = ((99/44)*((ocorrencia*severidade*deteccao)-1))+1
		
		if(severidade == 4){
			if(ocorrencia==1 && deteccao==1) criticidade = criticidade*3;
			else if((ocorrencia==2 && deteccao==1 ) || (ocorrencia==1 && deteccao==2)) criticidade = criticidade*2;
			else if(ocorrencia==2 && deteccao==2) criticidade = criticidade*1.5;
			else if((ocorrencia==3 && deteccao==1 ) || (ocorrencia==1 && deteccao==3)) criticidade = criticidade*1.7;
			else if((ocorrencia==3 && deteccao==2 ) || (ocorrencia==2 && deteccao==3)) criticidade = criticidade*1.5;
			else if(ocorrencia==3 && deteccao==3) criticidade = criticidade*1.1;
		} else	if(severidade == 5){
			if(ocorrencia==1 && deteccao==1) criticidade = criticidade*5;
			else if ((ocorrencia>=2 && deteccao==1) || (ocorrencia==1 && deteccao>=2)) criticidade = criticidade*3;
			else criticidade = criticidade*2;
		} else if((severidade==2 || severidade==3) && criticidade<=10){
			criticidade = 11;
		} 
		
		if(criticidade>100) criticidade =100;
		
		var nivel="";
		var cor="#545454";
		var cor_fonte="#000";
		if(criticidade>0 && criticidade <=10){
			cor="#94ff7a";
			nivel="Trivial";
		}
		else if(criticidade>10 && criticidade<=40){
			cor="#fffa00";
			nivel="Minor";
		}
		else if(criticidade>40 && criticidade<=70){
			cor="#ff9900";
			nivel="Major";
		}
		else if(criticidade>70 && criticidade<=90){
			cor="#ff0000";
			cor_fonte="#FFF";
			nivel="Critical";
		}
		else if(criticidade>90){
			cor="#000";
			cor_fonte="#FFF";
			nivel="Blocked";
		}
		criticidade=Math.round(criticidade);
		$('#criticidade').css('background', cor);
		$('#criticidade').css('color', cor_fonte);
		$('#criticidade').val(nivel);
		
		gerarUrl();
	}
}

function gerarUrl(){
	var url="file:///C:/Users/a0071351/Desktop/fmea/index.html";
	//var url="index.html";
	var ocorrencia= $('#ocorrencia').val();
	var severidade= $('#severidade').val();
	var deteccao= $('#deteccao').val();
	//var grupo = $('#grupo').val();
	var criticidade = $('#criticidade').val();
	url = url+"?ocorrencia="+ocorrencia+"&severidade="+severidade+"&deteccao="+deteccao/*+"&grupo="+grupo*/+"&criticidade="+criticidade;
	
	window.location.href = url;
}

function validadeDado(obj, valor){
	//aceita apenas números
	$("#"+obj.id).val(valor.replace(/\D/g, ''));
   
	if(obj.id == "severidade"){
		if(valor >=5){
			$('#'+obj.id).val(5);
		} else if(valor < 0){
			$('#'+obj.id).val(1);
		}
	} else{
		if(valor >=3){
			$('#'+obj.id).val(3);
		} else if(valor < 0){
			$('#'+obj.id).val(1);
		}
	}
}