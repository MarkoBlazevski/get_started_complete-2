// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Update the relevant fields with the new data
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

function calculate(){
		
		 sum =parseInt(fdvotes)+parseInt(MCvotes)+parseInt(imdbvotes)+parseInt(Tomvotes)+parseInt(Audvotes);
		 averageRate = ((fdRate*fdvotes)+(MCrate*MCvotes)+(imdbRate*imdbvotes)+(TomAvrRat*Tomvotes)+(AudAvrRat*Audvotes))/sum
		 averageRate=averageRate.toFixed(2);
		$( ".average-rate" ).text(averageRate);
		console.log("calculing");
		console.log(nbreOfsource);
		console.log(sum);
		console.log(averageRate);
				console.log(Audvotes);
	
}  
		
function setDOMInfo(info) {
	
   titlePur = info.title;
  var title = info.title.replace(/\s/g, "+");
   year = info.year;
  console.log(title);
  console.log(year);
  fdRate = 0;
  var exist = 0;
  $("#movieTitle").prepend(titlePur);
  document.getElementById('year').textContent = year;
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
	document.getElementById('mt').textContent = MCrate;
	 MCvotes = $.trim($(".based_on",html).first().text())
	MCvotes = MCvotes.substring(MCvotes.length-8,MCvotes.length-10)
	document.getElementById('mtvotes').textContent = MCvotes;
	nbreOfsource++;
	if(nbreOfsource==4)
		$(document).trigger('data_from_sources_complete');

	  });
	  
	  }
});
	console.log(exist);
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
	document.getElementById('mt').textContent = MCrate;
	 MCvotes = $.trim($(".based_on",html).first().text())
	MCvotes = MCvotes.substring(MCvotes.length-8,MCvotes.length-10)
	document.getElementById('mtvotes').textContent = MCvotes;
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
	document.getElementById('fdvotes').textContent  = fdvotes;
			fdvotes=fdvotes.replace(/,/g, '');

	});
	
	if(fdRate != 0){
		document.getElementById('fd').textContent = fdRate+"/5";
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
			 document.getElementById('imdb').textContent  = imdbRate;
			 imdbRate = parseInt(imdbRate*10);
			 imdbvotes= $(".imdbRating > a > span" , html2).text();
			 document.getElementById('imdbvotes').textContent  = imdbvotes;
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
					document.getElementById('rttom').textContent = TomAvrRat;
					Tomvotes = $.trim($(".tomato-left > #scoreStats:nth-child(2) > .superPageFontColor:nth-child(2) > span:nth-child(2)" , RThtml).first().text());
					document.getElementById('rttomvotes').textContent = Tomvotes;
					Tomvotes=Tomvotes.replace(/,/g, '');
					Tomvotes=parseInt(Tomvotes);


					AudAvrRat = $.trim($(".audience-panel .audience-info > div:nth-child(1)" , RThtml).first().text());
					AudAvrRat = AudAvrRat.substring(AudAvrRat.length-6,AudAvrRat.length)
					document.getElementById('rtaud').textContent = AudAvrRat;
					Audvotes = $.trim($(".audience-panel .audience-info > div:nth-child(2)" , RThtml).first().contents().filter(function() {
                     return this.nodeType == 3;
                 }).text());
					document.getElementById('rtaudvotes').textContent = Audvotes;
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




$(document).bind('data_from_sources_complete', calculate);
console.log("after bind trigger");

// Once the DOM is ready...
window.addEventListener('DOMContentLoaded', function () {
  // ...query for the active tab...
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    // ...and send a request for the DOM info...
    chrome.tabs.sendMessage(
        tabs[0].id,
        {from: 'popup', subject: 'DOMInfo'},
        // ...also specifying a callback to be called 
        //    from the receiving end (content script)
        setDOMInfo);
  });
});





chrome.tabs.getSelected(null, function(tab) {
        var tabId = tab.id;
        var tabUrl = tab.url;
		if (tab.url.indexOf('https://www.imdb.com') == 0) {
   
		}
   
if (tab.url.indexOf('https://www.rottentomatoes.com') == 0) {
	
}

       
    });



