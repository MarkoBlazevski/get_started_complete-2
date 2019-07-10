// Inform the background page that 
// this tab should have a page-action
var fdRate;
var fdvotes;
var MCrate;
var MCvotes;
var imdbRate;
var imdbvotes;
var TomAvrRat;
var Tomvotes;
var AudAvrRat;
var Audvotes;
var RTurl;
var FDurl;
var MCurl;
var IMDBurl;
var averageRate;
var sum;
var titlePur;
var year;
var nbreOfsource = 0;
var title;



chrome.runtime.sendMessage({
  from:    'content',
  subject: 'showPageAction'
});
/********************/
function calculate(){
		
		 sum =parseInt(fdvotes)+parseInt(MCvotes)+parseInt(imdbvotes)+parseInt(Tomvotes)+parseInt(Audvotes);
		 averageRate = ((fdRate*fdvotes)+(MCrate*MCvotes)+(imdbRate*imdbvotes)+(TomAvrRat*Tomvotes)+(AudAvrRat*Audvotes))/sum
		 averageRate=averageRate.toFixed(0);
		$( ".average-rate" ).text(averageRate+"/100");
		console.log("calculing");
		console.log(nbreOfsource);
		console.log(sum);
		console.log(averageRate);
				console.log(Audvotes);
	
} 
function getData(title,year) {
	
   titlePur = title;
   title = title.replace(/\s/g, "+");
   year = year;
  console.log(title);
  console.log(year);
  fdRate = 0;
  var exist = 0;
  $("#movieTitle").prepend(titlePur);
 // document.getElementById('year').textContent = year;
  ///////////////////////////////////// Metacritic /////////////////////////////////////
  
  $.get("http://www.metacritic.com/search/movie/"+titlePur+"/results", function (Mtdata) {
    var html = $(Mtdata);
	 exist = 0;
	$('.result_wrap',html).each(function (index, value) { 
  var mtYear = $.trim($(this).find("p").first().text());
  mtYear = mtYear.substring(mtYear.length-4,mtYear.length);
  if($.trim($(this).find("h3").text())== titlePur && mtYear == year){
	  exist = 1;
  console.log("MC:");
  console.log($.trim($(this).find("h3").text()));
  console.log(mtYear);
  //console.log($.trim($(this).find("h3 > a").attr("href")));
   MCurl = "http://www.metacritic.com"+$.trim($(this).find("h3 > a").attr("href"));
	  //console.log(url);
	  $.get(MCurl, function (Mtdata) {
    var html = $(Mtdata);
	 MCrate = $.trim($(".metascore_anchor span",html).first().text())
	document.getElementById('mt').textContent = MCrate+"/100 | ";
	 MCvotes = $.trim($(".based_on",html).first().text())
	MCvotes = MCvotes.substring(MCvotes.length-8,MCvotes.length-10)
	//document.getElementById('mtvotes').textContent = MCvotes;
	nbreOfsource++;
	if(nbreOfsource==4)
		$(document).trigger('data_from_sources_complete');

	  });
	  
	  }
});
	console.log(MCrate);
	var nbre_page = ($('.page_num',html).last().text());
	if(exist==0){
		for (i = 1; i < nbre_page; i++) {
			
			$.get("http://www.metacritic.com/search/movie/"+titlePur+"/results?page="+i, function (Mtdata) {
    var html = $(Mtdata);
	
	$('.result_wrap',html).each(function (index, value) { 
  var mtYear = $.trim($(this).find("p").first().text());
  mtYear = mtYear.substring(mtYear.length-4,mtYear.length);
  if($.trim($(this).find("h3").text())== titlePur && mtYear == year){
	  exit = 1;
	  console.log("MC:");
       console.log($.trim($(this).find("h3").text()));
      console.log(mtYear);
	  //console.log($.trim($(this).find("h3 > a").attr("href")));
	  MCurl = "http://www.metacritic.com"+$.trim($(this).find("h3 > a").attr("href"));
	  console.log(url);
	 // console.log($.trim($(this).find(".main_stats > span").text()));
	  $.get(MCurl).always( function (Mtdata) {
    var html = $(Mtdata);
	 MCrate = $.trim($(".metascore_anchor span",html).first().text())
	document.getElementById('mt').textContent = MCrate+"/100 | ";
	 MCvotes = $.trim($(".based_on",html).first().text())
	MCvotes = MCvotes.substring(MCvotes.length-8,MCvotes.length-10)
	//document.getElementById('mtvotes').textContent = MCvotes;
	nbreOfsource++;
	if(nbreOfsource==4)
		$(document).trigger('data_from_sources_complete');
	
	 /* $("#movieTitle").prepend(info.title);
		document.getElementById('year').textContent = year;
		Tomvotes=Tomvotes.replace(',', '');
		Audvotes=Audvotes.replace(',', '');
		fdvotes=fdvotes.replace(',', '');
		TomAvrRat=TomAvrRat.substring(TomAvrRat.length-6,TomAvrRat.length-3)*10;
		AudAvrRat=AudAvrRat.substring(AudAvrRat.length-5,AudAvrRat.length-2)*20;
		 sum =parseInt(fdvotes)+parseInt(MCvotes)+parseInt(imdbvotes)+parseInt(Tomvotes)+parseInt(Audvotes);
		 averageRate = ((fdRate*fdvotes)+(MCrate*MCvotes)+(imdbRate*imdbvotes)+(TomAvrRat*Tomvotes)+(AudAvrRat*Audvotes))/sum
		$( ".average-rate" ).text(averageRate);
		console.log("inside mc second loop");
		console.log(sum);
		console.log(averageRate);
				console.log(fdvotes);*/
	  });
  }
	  
	});
	});	
	console.log(i);
	//if(exit== 1)
	//break; 
		
	}
	
    }
		
	 $(".MCurl").attr("href",MCurl);
		
	
	
  });
  
  /////////////////////////////////FANDANGO/////////////////////////////////////////////////
  
	$.get("https://www.fandango.com/search?q="+title+"&mode=Movies").always( function (data) {
    var html = $(data);
    var start1 = $(".visual-item:first-child .star-rating-container > a:nth-child(1) .star-icon" , html);
	var start2 = $(".visual-item:first-child .star-rating-container > a:nth-child(2) .star-icon" , html);
	var start3 = $(".visual-item:first-child .star-rating-container > a:nth-child(3) .star-icon" , html);
	var start4 = $(".visual-item:first-child .star-rating-container > a:nth-child(4) .star-icon" , html);
	var start5 = $(".visual-item:first-child .star-rating-container > a:nth-child(5) .star-icon" , html);
	 FDurl = $(".visual-item:first-child > a" , html).attr("href");
	
	if(start5.hasClass( "full" ))
		fdRate=5;
	else if(start5.hasClass( "half" ))
		fdRate=4.5;
	else{
		if(start4.hasClass( "full" ))
			fdRate=4;
		else if(start4.hasClass( "half" ))
			fdRate=3.5;
		else{
			if(start3.hasClass( "full" ))
			fdRate=3;
		else if(start3.hasClass( "half" ))
			fdRate=2.5;
		else{
			if(start2.hasClass( "full" ))
			fdRate=2;
		else if(start2.hasClass( "half" ))
			fdRate=1.5;
		else {
			if(start1.hasClass( "full" ))
			fdRate=1;
		else if(start1.hasClass( "half" ))
			fdRate=0.5;
			
		}
			
		}
			
		}
	}
	$(".FDurl").attr("href",FDurl);
	$.get(FDurl).always( function (data) {
    var html1 = $(data);
	var fdvotes1 = $.trim($(".movie-details .movie-details__fan-ratings" , html1).text());
	 fdvotes = fdvotes1.substring(0,fdvotes1.length-12);
	//console.log(fdvotes);
	//document.getElementById('fdvotes').textContent  = fdvotes;
			fdvotes=fdvotes.replace(/,/g, '');

	});
	
	if(fdRate != 0){
		document.getElementById('fd').textContent = fdRate+"/5 | Average score: ";
		fdRate = parseFloat(fdRate)*2*10;
		console.log("inside FD");
		nbreOfsource++;
		if(nbreOfsource==4)
		$(document).trigger('data_from_sources_complete');
	    console.log(nbreOfsource);
		
		}
	
	  
	
});
//////////////IMDB/////////////////////////////////////////////

 
		var IMDBurlsearch="https://www.imdb.com/search/title?title="+title+"&title_type=feature,tv_movie,short&release_date="+year+"-01-01,"+year+"-12-31";
		//console.log(IMDBurlsearch);

		$.get(IMDBurlsearch).always( function (data) {
         var html = $(data);
		  IMDBurl = "https://www.imdb.com"+$(".lister-item-header > a" , html).first().attr("href");
		  $(".IMDBurl").attr("href",IMDBurl);
		  $.get(IMDBurl).always( function (data) {
			  var html2 = $(data);
			 imdbRate= $(".imdbRating>.ratingValue>strong>span" , html2).text();
		  document.getElementById('imdb').textContent  = imdbRate+"/10 | ";
			 imdbRate = parseInt(imdbRate*10);
			 imdbvotes= $(".imdbRating > a > span" , html2).text();
			// document.getElementById('imdbvotes').textContent  = imdbvotes;
			 imdbvotes=imdbvotes.replace(/,/g, '');
			 nbreOfsource++;
							
					 /*console.log("inside imdb");
					 console.log(nbreOfsource);*/
					 if (nbreOfsource==4)
						 $(document).trigger('data_from_sources_complete');
			 
			 
		  });
		 
	
			
		});
		
		
		
////////////////ROTTENTOMATOES///////////////////////////////////////////
		
		 $.getJSON("https://www.rottentomatoes.com/api/private/v2.0/search?q="+title+"&t=movie&offset=0&limit=100").always( function(RTresult){
			 console.log("RT:");
			 console.log(RTresult);
			 jQuery.each( RTresult["movies"], function( i, val ) {
               
                   if(val["name"]==titlePur && val["year"]==year){
					   //console.log(i);
				       //console.log(val["name"]);
					   //console.log(val["year"]);
					   RTurl= "https://www.rottentomatoes.com"+val['url'];
					   $(".RTurl").attr("href",RTurl);
				   $.get("https://www.rottentomatoes.com"+val['url']).always( function (RTdata) {
                    var RThtml = $(RTdata);
					TomAvrRat = $.trim($(".tomato-left > #scoreStats:nth-child(2) > .superPageFontColor:first-child" , RThtml).first().text());
					TomAvrRat = TomAvrRat.substring(TomAvrRat.length-6,TomAvrRat.length)
					document.getElementById('rttom').textContent = "TOMATOMETER score: "+TomAvrRat+" | ";
					Tomvotes = $.trim($(".tomato-left > #scoreStats:nth-child(2) > .superPageFontColor:nth-child(2) > span:nth-child(2)" , RThtml).first().text());
					//document.getElementById('rttomvotes').textContent = Tomvotes;
					Tomvotes=Tomvotes.replace(/,/g, '');
					Tomvotes=parseInt(Tomvotes);


					AudAvrRat = $.trim($(".audience-panel .audience-info > div:nth-child(1)" , RThtml).first().text());
					AudAvrRat = AudAvrRat.substring(AudAvrRat.length-6,AudAvrRat.length)
					document.getElementById('rtaud').textContent = "Audience score: "+AudAvrRat+" | ";
					Audvotes = $.trim($(".audience-panel .audience-info > div:nth-child(2)" , RThtml).first().contents().filter(function() {
                     return this.nodeType == 3;
                 }).text());
					//document.getElementById('rtaudvotes').textContent = Audvotes;
							Audvotes=Audvotes.replace(/,/g, '');
							//console.log(Audvotes);
							TomAvrRat=TomAvrRat.substring(TomAvrRat.length-6,TomAvrRat.length-3)*10;
		                    AudAvrRat=AudAvrRat.substring(AudAvrRat.length-5,AudAvrRat.length-2)*20;
							nbreOfsource++;
							if (nbreOfsource==4)
						 $(document).trigger('data_from_sources_complete');
					 console.log("inside rt");
	                  console.log(nbreOfsource);

				   });
					   
				   }
                    
                });
	
			 
		 });
		
}
/************************************************************************/

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function (msg, sender, response) {
  // First, validate the message's structure
  if ((msg.from === 'popup') && (msg.subject === 'DOMInfo')) {
    // Collect the necessary data 
    // (For your specific requirements `document.querySelectorAll(...)`
    //  should be equivalent to jquery's `$(...)`)
	

	
    var domInfo = {
      title:  title,
	  year: year
    };

    // Directly respond to the sender (popup), 
    // through the specified callback */
    response(domInfo);
  }
});




if(window.location.href.indexOf("imdb.com") != -1){
    console.log(" found");
	var title1 = $.trim($("title").text());
    title = title1.substring(0,title1.length-14);
	
	year = title1.substring(title1.length-12,title1.length-8);
	// $(document).trigger('data_gotten');
	 $( "head" ).prepend("<meta http-equiv='Content-Security-Policy' content='upgrade-insecure-requests'> ")
	 $( "body" ).prepend( "<div class='average-rate-of-four-sites'><img src='"+chrome.extension.getURL('images/imdb.png')+"' height='30'> <span id='imdb'></span><img src='"+chrome.extension.getURL('images/rt.png')+"' height='30'><span id='rttom'></span><img src='"+chrome.extension.getURL('images/rt.png')+"' height='30'><span id='rtaud'></span><img src='"+chrome.extension.getURL('images/mc.png')+"' height='30'> <span id='mt'></span><img src='"+chrome.extension.getURL('images/fd.png')+"' height='30'> <span id='fd'></span> <span class='average-rate'></span></div>" );
     $(".average-rate-of-four-sites").css({"background-color": "#fe7900", "font-size": "120%","position":"fixed","width":"100%","zIndex":"1000","color":"white","padding":"5px","textAlign":"center","fontWeight":"600","display":"inline"});
	$(".average-rate-of-four-sites img").css({"top": "6px","position":"relative"});
	$(".average-rate").css({"background-color": "#75B936","padding":"5px","borderRadius":"20px"});
	getData(title,year);
	$(document).bind('data_from_sources_complete', calculate);
	
}

if(window.location.href.indexOf("fandango.com") != -1){
    console.log(" fandango found ");
	//var title1 = $.trim($("title").text());
	//var title = title1.substring(0,title1.length-11);
	 title = $.trim($(".video-playlist-thumb__image").attr("aria-label"));
	var year1 = $.trim($(".movie-details__release-date").text());
	 year = year1.substring(year1.length-4,year1.length);
	 //$(document).trigger('data_gotten');
	 $( "body" ).prepend( "<div class='average-rate-of-four-sites'><img src='"+chrome.extension.getURL('images/imdb.png')+"' height='30'> <span id='imdb'></span><img src='"+chrome.extension.getURL('images/rt.png')+"' height='30'><span id='rttom'></span><img src='"+chrome.extension.getURL('images/rt.png')+"' height='30'><span id='rtaud'></span><img src='"+chrome.extension.getURL('images/mc.png')+"' height='30'> <span id='mt'></span><img src='"+chrome.extension.getURL('images/fd.png')+"' height='30'> <span id='fd'></span> <span class='average-rate'></span></div>" );
     $(".average-rate-of-four-sites").css({"background-color": "#fe7900", "font-size": "120%","position":"fixed","width":"100%","zIndex":"1000","color":"white","padding":"5px","textAlign":"center","fontWeight":"600","display":"inline"});
	$(".average-rate-of-four-sites span").css({"top": "4px","position":"relative"});
	$(".average-rate").css({"background-color": "#75B936","padding":"5px","borderRadius":"20px"});
	getData(title,year);
	$(document).bind('data_from_sources_complete', calculate);
}

if(window.location.href.indexOf("metacritic.com") != -1){
    console.log(" fandango found ");
	var title1 = $.trim($(".product_page_title > h1").text());
	 title = title1;
	var year1 = $.trim($(".product_page_title > span").text());
	 year = year1;
	  //$(document).trigger('data_gotten');
	  $( "head" ).prepend("<meta http-equiv='Content-Security-Policy' content='upgrade-insecure-requests'> ")
	   $( "body" ).prepend( "<div class='average-rate-of-four-sites'><img src='"+chrome.extension.getURL('images/imdb.png')+"' height='30'> <span id='imdb'></span><img src='"+chrome.extension.getURL('images/rt.png')+"' height='30'><span id='rttom'></span><img src='"+chrome.extension.getURL('images/rt.png')+"' height='30'><span id='rtaud'></span><img src='"+chrome.extension.getURL('images/mc.png')+"' height='30'> <span id='mt'></span><img src='"+chrome.extension.getURL('images/fd.png')+"' height='30'> <span id='fd'></span> <span class='average-rate'></span></div>" );
     $(".average-rate-of-four-sites").css({"background-color": "#fe7900", "font-size": "120%","position":"fixed","bottom":"0","width":"100%","zIndex":"10000000","color":"white","padding":"5px","textAlign":"center","fontWeight":"600","display":"inline"});
	$(".average-rate-of-four-sites img").css({"top": "6px","position":"relative"});
	$(".average-rate").css({"background-color": "#75B936","padding":"5px","borderRadius":"20px"});
	getData(title,year);
	$(document).bind('data_from_sources_complete', calculate);
}

if(window.location.href.indexOf("rottentomatoes.com") != -1){
    console.log(" fandango found ");
	var title1 = $.trim($("#movie-title").text());
	 title = title1.substring(0,title1.length-7);
	var year1 = $.trim($("#movie-title > span").text());
	 year = year1.substring(1,year1.length-1);
	 // $(document).trigger('data_gotten');
	 $( "head" ).prepend("<meta http-equiv='Content-Security-Policy' content='upgrade-insecure-requests'> ")
	  $( "body" ).prepend( "<div class='average-rate-of-four-sites'><img src='"+chrome.extension.getURL('images/imdb.png')+"' height='30'> <span id='imdb'></span><img src='"+chrome.extension.getURL('images/rt.png')+"' height='30'><span id='rttom'></span><img src='"+chrome.extension.getURL('images/rt.png')+"' height='30'><span id='rtaud'></span><img src='"+chrome.extension.getURL('images/mc.png')+"' height='30'> <span id='mt'></span><img src='"+chrome.extension.getURL('images/fd.png')+"' height='30'> <span id='fd'></span> <span class='average-rate'></span></div>" );
     $(".average-rate-of-four-sites").css({"background-color": "#767676", "font-size": "120%","position":"fixed","width":"100%","zIndex":"100000","color":"white","padding":"5px","textAlign":"center","fontWeight":"600","display":"inline"});
	$(".average-rate-of-four-sites span").css({"top": "4px","position":"relative"});
	$(".average-rate").css({"background-color": "#75B936","padding":"5px","borderRadius":"20px"});
	getData(title,year);
	$(document).bind('data_from_sources_complete', calculate);
}