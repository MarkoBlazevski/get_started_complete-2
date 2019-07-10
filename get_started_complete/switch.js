$(document).ready(function(e) {
	$('input').lc_switch();

	// triggered each time a field changes status
	    var k=0;
	    var oldTomAvrRat=TomAvrRat;
		var oldTomAvrvotes;
		var oldAudAvrRat;
		var oldAudAvrvotes;
		var oldimdbRate;
		var oldimdbvotes;
		var oldMCrate;
		var oldMCvotes;
		var oldfdvotes;
		var oldfdRate;
	$('body').delegate('.lcs_check', 'lcs-statuschange', function() {
		var status = ($(this).is(':checked')) ? 'checked' : 'unchecked';
		console.log('any button changed status: '+ status );
		k++;
		if(k==1){
		 oldTomAvrRat=TomAvrRat;
		 oldTomAvrvotes=Tomvotes;
		 oldAudAvrRat=AudAvrRat;
		 oldAudAvrvotes=Audvotes;
		 oldimdbRate=imdbRate
		 oldimdbvotes=imdbvotes;
		 oldMCrate=MCrate;
		 oldMCvotes=MCvotes;
		 oldfdvotes=fdvotes;
		 oldfdRate=fdRate;
		}
		
	});
	
	$('body').delegate('#rtstate .lcs_check', 'lcs-statuschange', function() {
		var status = ($(this).is(':checked')) ? 'checked' : 'unchecked';
		console.log('tomater changed status: '+ status );
		if(status=="unchecked"){
		TomAvrRat=0;
		Tomvotes=0;
		calculate();
		}
		if(status=="checked"){
		TomAvrRat=oldTomAvrRat;
		Tomvotes=oldTomAvrvotes;
		calculate();
		}
		
	});
	
	$('body').delegate('#rtaudstate .lcs_check', 'lcs-statuschange', function() {
		var status = ($(this).is(':checked')) ? 'checked' : 'unchecked';
		console.log('aud changed status: '+ status );
		
		if(status=="unchecked"){
		AudAvrRat=0;
		Audvotes=0;
		calculate();
		}
		if(status=="checked"){
		AudAvrRat=oldAudAvrRat;
		Audvotes=oldAudAvrvotes;
		calculate();
		}
	});
	
	$('body').delegate('#imdbstate .lcs_check', 'lcs-statuschange', function() {
		var status = ($(this).is(':checked')) ? 'checked' : 'unchecked';
		console.log('imbd changed status: '+ status );
		
		if(status=="unchecked"){
		imdbRate=0;
		imdbvotes=0;
		calculate();
		}
		if(status=="checked"){
		imdbRate=oldimdbRate;
		imdbvotes=oldimdbvotes;
		calculate();
		}
	});
	
	$('body').delegate('#mtstate .lcs_check', 'lcs-statuschange', function() {
		var status = ($(this).is(':checked')) ? 'checked' : 'unchecked';
		console.log('mt changed status: '+ status );
		
		if(status=="unchecked"){
		MCrate=0;
		MCvotes=0;
		calculate();
		}
		if(status=="checked"){
		MCrate=oldMCrate;
		MCvotes=oldMCvotes;
		calculate();
		}
	});
	
	$('body').delegate('#fdstate .lcs_check', 'lcs-statuschange', function() {
		var status = ($(this).is(':checked')) ? 'checked' : 'unchecked';
		console.log('fd changed status: '+ status );
		
		
		if(status=="unchecked"){
	    fdvotes=0;
		fdRate=0;
		calculate();
		}
		if(status=="checked"){
		fdvotes=oldfdvotes;
		fdRate=oldfdRate;
		calculate();
		}
	});
	

});
