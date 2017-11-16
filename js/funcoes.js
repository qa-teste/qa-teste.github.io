$(document).ready(function(){
	var parametros = location.search.split('?')[1];
	if(parametros!="" && typeof parametros != "undefined"){
		ocorrencia=parametros.split('&')[0];
		severidade=parametros.split('&')[1];
		deteccao=parametros.split('&')[2];
		grupo=parametros.split('&')[3];
		criticidade=parametros.split('&')[4];
		
		valor_ocorrencia=ocorrencia.split('=')[1];
		valor_severidade=severidade.split('=')[1];
		valor_deteccao=deteccao.split('=')[1];
		valor_grupo=grupo.split('=')[1];
		valor_criticidade=criticidade.split('=')[1];

		$('#ocorrencia').val(valor_ocorrencia);
		$('#severidade').val(valor_severidade);
		$('#deteccao').val(valor_deteccao);
		$('#grupo').val(valor_grupo);
		
		criticidade=valor_criticidade.split('%')[0];
		var cor="#545454";
		var cor_fonte="#000";
		var nivel="";
		if(criticidade>0 && criticidade <=20){
			cor="#94ff7a";
			nivel="Trivial";
		}
		else if(criticidade>20 && criticidade<=40){
			cor="#fffa00";
			nivel="Minor";
		}
		else if(criticidade>40 && criticidade<=60){
			cor="#ff9900";
			nivel="Major";
		}
		else if(criticidade>60 && criticidade<=80){
			cor="#ff0000";
			cor_fonte="#FFF";
			nivel="Critical";
		}
		else if(criticidade>80){
			cor="#000";
			cor_fonte="#FFF";
			nivel="Blocked";
		}
		criticidade=Math.round(criticidade);
		$('#criticidade').css('background', cor);
		$('#criticidade').css('color', cor_fonte);
		$('#criticidade').val(criticidade+"% - "+nivel);
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
	
	var grupo = $('#grupo').val();
	
	
	if(ocorrencia!="" && severidade!="" && deteccao!="" && grupo!="" && grupo!=null){
		var criticidade = ((ocorrencia*severidade*deteccao)/125)*grupo*100;
		var nivel="";
		var cor="#545454";
		var cor_fonte="#000";
		if(criticidade>0 && criticidade <=20){
			cor="#94ff7a";
			nivel="Trivial";
		}
		else if(criticidade>20 && criticidade<=40){
			cor="#fffa00";
			nivel="Minor";
		}
		else if(criticidade>40 && criticidade<=60){
			cor="#ff9900";
			nivel="Major";
		}
		else if(criticidade>60 && criticidade<=80){
			cor="#ff0000";
			cor_fonte="#FFF";
			nivel="Critical";
		}
		else if(criticidade>80){
			cor="#000";
			cor_fonte="#FFF";
			nivel="Blocked";
		}
		criticidade=Math.round(criticidade);
		$('#criticidade').css('background', cor);
		$('#criticidade').css('color', cor_fonte);
		$('#criticidade').val(criticidade+"%");
		
		gerarUrl();
	}
}

function gerarUrl(){
	var url="index.html";
	var ocorrencia= $('#ocorrencia').val();
	var severidade= $('#severidade').val();
	var deteccao= $('#deteccao').val();
	var grupo = $('#grupo').val();
	var criticidade = $('#criticidade').val();
	url = url+"?ocorrencia="+ocorrencia+"&severidade="+severidade+"&deteccao="+deteccao+"&grupo="+grupo+"&criticidade="+criticidade;
	
	window.location.href = url;
}

function validadeDado(obj, valor){
	$(".numero").bind("keyup blur focus", function(e) {
            e.preventDefault();
            var expre = /[^\d]/g;
            $(this).val($(this).val().replace(expre,''));
       });
	if(valor >=5){
		$('#'+obj.id).val(5);
	} else if(valor < 0){
		$('#'+obj.id).val(1);
	}
}
