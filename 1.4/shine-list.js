if( !$('html').hasClass("shine-analytics-optout") ){

	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

	ga('create', 'UA-54728545-4', 'auto');
	ga('send', 'pageview', { 'page': window.location.href.replace("https://","") , 'title': document.title });

	// Analytics What's Been Loaded
	ga('send', 'event', 'LOAD' , 'LIST VIEW' , window.location.href.replace("https://","") );

	if( $('html').hasClass("shinebright") ){
		ga('send', 'event', 'LOAD' , 'SHINE BRIGHT' , window.location.href.replace("https://","") );
	}else{
		ga('send', 'event', 'LOAD' , 'SHINE LIGHT' , window.location.href.replace("https://","") );
	}

	if( $('html').hasClass("show-shortcuts") ){
		ga('send', 'event', 'LOAD' , 'SHOW SHORTCUTS' , window.location.href.replace("https://","") );
	}else{
		ga('send', 'event', 'LOAD' , 'HIDE SHORTCUTS' , window.location.href.replace("https://","") );
	}

	if( $('html').hasClass("show-sidebar") ){
		ga('send', 'event', 'LOAD' , 'SHOW SIDEBAR' , window.location.href.replace("https://","") );
	}else{
		ga('send', 'event', 'LOAD' , 'HIDE SIDEBAR' , window.location.href.replace("https://","") );
	}

	if( $('html').hasClass("show-multireddits") ){
		ga('send', 'event', 'LOAD' , 'SHOW MULTIREDDITS' , window.location.href.replace("https://","") );
	}else{
		ga('send', 'event', 'LOAD' , 'HIDE MULTIREDDITS' , window.location.href.replace("https://","") );
	}

	if( $('html').hasClass("res-nightmode") ){
		ga('send', 'event', 'LOAD' , 'NIGHTMODE' , window.location.href.replace("https://","") );
	}else{
		ga('send', 'event', 'LOAD' , 'DAYMODE' , window.location.href.replace("https://","") );
	}

}










$('html').addClass("shine-ready");












// imgur authorization
function setHeader(xhr) {
    xhr.setRequestHeader('Authorization', 'Client-ID 4120f4b7ddae1ea');
}

// this gets URL variables
function getUrlVars(url) {
    var vars = [], hash;
    var hashes = url.slice(url.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

// this converts a regular old gif into a gfycat image
function convertGiftoGfy(target, url){
	
	$.ajax({
      url: '//upload.gfycat.com/transcode?fetchUrl=' + url,
      type: 'GET',
      dataType: 'json',
      success: function(data) { 
	     
	     if( data.gfyname != undefined ){

	     	$(target).find('.large-area').html("<div class='large-html5'><video controls preload='auto' autoplay='autoplay' muted='muted' loop='loop' webkit-playsinline ><source src='//fat.gfycat.com/" + data.gfyname + ".mp4' type='video/mp4' /><source src='//giant.gfycat.com/" + data.gfyname + ".mp4' type='video/mp4' /><source src='//zippy.gfycat.com/" + data.gfyname + ".mp4' type='video/mp4' /></video></div>");

	     	$(target).attr("data-original-type", "gfycat");
			$(target).attr("data-original-data", data.gfyname);
	     
	     }
	      
	  },
      error: function(request, status, message) { 
      	console.log(message); 
      }
    });		
	
}

// this gets the GfyCatURL for our comment
function getCommentGfyCatURL(url, target){

	$.ajax({
      url: '//upload.gfycat.com/transcode?fetchUrl=' + url,
      type: 'GET',
      dataType: 'json',
      success: function(data) { 
	     
	     gfyID = data.gfyname;
	     
	     if( data.gfyname != undefined ){

	     	$(target).attr("data-video", gfyID );

	     	$(target).addClass("shine-comment comment-gfycat");
	     
	     }
	      
	  },
      error: function(request, status, message) { 
      	console.log(message); 
      }
    });	

}

// this gets the image type
function getImageFromServer(path, id, target){
    var xhr = new XMLHttpRequest();
    xhr.path = path;
    xhr.open("GET",path,true);
    xhr.responseType = "arraybuffer";
    xhr.onload = function(e){
        
        if(this.status == 200){
            
            var imageType = getImageType(this.response);
			
			if( imageType == "image/gif" ){

				$(target).find('.large-area').html('<div class="large-html5"><video controls preload="auto" autoplay="autoplay" muted="muted" loop="loop" webkit-playsinline ><source src="//i.imgur.com/' + id + '.mp4" /></video></div>');

				$(target).attr("data-original-type", "html5");
				$(target).attr("data-original-data", '//i.imgur.com/' + id + '.mp4');
				
			}else{

				$(target).find('.large-area').html('<div class="large-image" style="background-image:url(//i.imgur.com/' + id + '.png);"></div>');

				$(target).find('.large-image').zoom({url: '//i.imgur.com/' + id + '.png' , on: 'click'});

				$(target).attr("data-original-type", "image");
				$(target).attr("data-original-data", '//i.imgur.com/' + id + '.png');
				
			}  
		      			
		}
        else{
            console.log("Problem retrieving image " + JSON.stringify(e))
        }
    }
    xhr.send();
}

function getCommentImageFromServer(path, id, target){
    var xhr = new XMLHttpRequest();
    xhr.path = path;
    xhr.open("GET",path,true);
    xhr.responseType = "arraybuffer";
    xhr.onload = function(e){
        
        if(this.status == 200){
            
            var imageType = getImageType(this.response);
			
			if( imageType == "image/gif" ){

				$(target).addClass("shine-comment comment-html5");

				$(target).attr("data-video", "//i.imgur.com/" + id + ".mp4");
				
			}else{

				$(target).addClass("shine-comment comment-image");

				$(target).attr("data-image", "//i.imgur.com/" + id + ".png");
				
			}  
		      			
		}
        else{
            console.log("Problem retrieving image " + JSON.stringify(e))
        }
    }
    xhr.send();
}

function getImageType(arrayBuffer){
    var type = "";
    var dv = new DataView(arrayBuffer,0,5);
    var nume1 = dv.getUint8(0,true);
    var nume2 = dv.getUint8(1,true);
    var hex = nume1.toString(16) + nume2.toString(16) ;
    switch(hex){
        case "8950":
            type = "image/png";
            break;
        case "4749":
            type = "image/gif";
            break;
        case "424d":
            type = "image/bmp";
            break;
        case "ffd8":
            type = "image/jpeg";
            break;
        default:
            type = null;
            break;
    }
    return type;
}















// gets YOUTUBE TIME STAMP
function getYouTubeTimeStamp(timeStamp){
    
    if(timeStamp != undefined){
                
        timeStamp = timeStamp.replace("s", "");
        timeStamp = timeStamp.replace("S", "");

        // if there are minutes
        if ( timeStamp.toLowerCase().indexOf("m") != -1 ){

            timeStamp = timeStamp.split("m");

            if(timeStamp[1]){
                timeStamp = parseInt((timeStamp[0] * 60)) + parseInt(timeStamp[1]); 
            }else{
                timeStamp = parseInt((timeStamp[0] * 60)); 
            }

        }

    }else{
        timeStamp = "0";
    }
    
    return timeStamp;
    
}




















// these are all our actions / click events
function resetInterfaces(){

	$('html').removeClass("shine-menu");
	$('html').removeClass("expanding");
	$('html').removeClass("expand-images");
	$('html').removeClass("expand-youtubes");
	$('html').removeClass("expand-html5s");
	$('html').removeClass("expand-albums");
	$('html').removeClass("show-search");
	$('html').removeClass("show-submit");
	$('html').removeClass("expand-comments");
	$('html').removeClass("show-settings");
	$('html').removeClass("shine-hide-children");
	$('html').removeClass("show-shine-bright");

}














// VAriABLE DELCARATION
var startCheckingComments;









function checkSideComments(){

	theSideCommentLinks = $('.side-comments .thing .usertext-body a').not('.shine-comment');

	for( i = 0; i < theSideCommentLinks.length; i++ ){

		$(theSideCommentLinks[i]).attr("target","_blank");

		url = $(theSideCommentLinks[i]).attr("href");

		// it's an imgur link
		if( url.toLowerCase().indexOf("imgur.com") != -1 && url.toLowerCase().indexOf("gifsound.com") == -1 && url.toLowerCase().indexOf("google.com") == -1 ){

			// we have an album
			if( url.toLowerCase().indexOf("/a/") != -1){

				// we got an album
				albumID = url.substr(url.toLowerCase().indexOf("/a/") + 3);	
				albumID = albumID.split(/[?#]/)[0];

				$(theSideCommentLinks[i]).attr("data-album", "https://api.imgur.com/3/album/" + albumID + "/images");

				$(theSideCommentLinks[i]).addClass("shine-comment comment-album");

			// we have a gifv
			}else if( url.toLowerCase().indexOf(".gifv") != -1 ){ 	

				// we have a gifv
				html5 = url.substr(url.toLowerCase().indexOf("imgur.com/") + 10);
				html5 = html5.substring(0, html5.length - 5);

				$(theSideCommentLinks[i]).attr("data-video", "//i.imgur.com/" + html5  + ".mp4");				

				$(theSideCommentLinks[i]).addClass("shine-comment comment-html5");

			// we have a gif make a gifv
			}else if( url.toLowerCase().indexOf(".gif") != -1 ){

				html5 = url.substr(url.toLowerCase().indexOf("imgur.com/") + 10);
				html5 = html5.substring(0, html5.length - 4);

				$(theSideCommentLinks[i]).attr("data-video", "//i.imgur.com/" + html5  + ".mp4");

				$(theSideCommentLinks[i]).addClass("shine-comment comment-html5");

			// time to find out what kind of image we have
			}else{

				url = url.split(/[?#]/)[0];

				url = decodeURIComponent(url);

				IMGURID = url.substr(url.toLowerCase().indexOf("imgur.com/") + 10);

				if( IMGURID.indexOf(".tiff") != -1 || IMGURID.indexOf(".jpeg") != -1 ){
					
					IMGURID = IMGURID.substring(0, IMGURID.length - 5);
					
				}
				else if( IMGURID.indexOf(".png") != -1 || IMGURID.indexOf(".jpg") != -1 || IMGURID.indexOf(".tif") != -1){
				
					IMGURID = IMGURID.substring(0, IMGURID.length - 4);
				
				}

				$(theSideCommentLinks[i]).addClass("comment-" + i + "-" + IMGURID);

				getCommentImageFromServer("https://i.imgur.com/" + IMGURID + ".png", IMGURID, ".comment-" + i + "-" + IMGURID );

			}

		}

		// this is a gif we should convert to gifycat
		else if( url.toLowerCase().indexOf(".gif") != -1 && url.toLowerCase().indexOf(".gifv") == -1 && url.toLowerCase().indexOf("/r/") == -1 ){

			$(theSideCommentLinks[i]).addClass(".gfy-comment-" + i);

			getCommentGfyCatURL(url, ".gfy-comment-" + i);

		}
        
        
        // this is for reddituploads.com
        else if( url.toLowerCase().indexOf("reddituploads.com") != -1 ){

			$(theSideCommentLinks[i]).attr("data-image", url);

			$(theSideCommentLinks[i]).addClass("shine-comment comment-image");

		}
        
        

		// this is any other photo
		else if( url.toLowerCase().indexOf(".png") != -1 || url.toLowerCase().indexOf(".jpg") != -1 || url.toLowerCase().indexOf(".jpeg") != -1 || url.toLowerCase().indexOf(".tif") != -1 || url.toLowerCase().indexOf(".tiff") != -1){

			$(theSideCommentLinks[i]).attr("data-image", url);

			$(theSideCommentLinks[i]).addClass("shine-comment comment-image");

		}

		// this is youtube
		else if( url.toLowerCase().indexOf("youtube.com") != -1 && url.toLowerCase().indexOf("/r/youtube") == -1 ){

			vidID = "";

			if( url.toLowerCase().indexOf("attribution") != -1){
                
                vidID = getUrlVars(url)["u"];
                vidID = decodeURIComponent(vidID);
                vidID = getUrlVars(vidID)["v"];
                                
            }
            else{
            
                vidID = getUrlVars(url)["v"];
                                
            }
            
            timeStamp = getUrlVars(url)["t"];
            timeStamp = getYouTubeTimeStamp(timeStamp);

			$(theSideCommentLinks[i]).attr("data-video", "//www.youtube.com/embed/" + vidID + "?rel=0&autoplay=1&vq=hd1080&wmode=transparent&start=" + timeStamp);

			$(theSideCommentLinks[i]).addClass("shine-comment comment-youtube");

		}


		// this is youtube share
		else if( url.toLowerCase().indexOf("youtu.be") != -1 ){

			vidID = url.substr(url.toLowerCase().indexOf("youtu.be/") + 9);
            
            timeStamp = getUrlVars(url)["t"];
            timeStamp = getYouTubeTimeStamp(timeStamp);

            $(theSideCommentLinks[i]).attr("data-video", "//www.youtube.com/embed/" + vidID + "?rel=0&autoplay=1&vq=hd1080&wmode=transparent&start=" + timeStamp);

			$(theSideCommentLinks[i]).addClass("shine-comment comment-youtube");

		}

		// this is a gfycat link
		else if( url.toLowerCase().indexOf("gfycat.com") != -1 ){

			url = url.split(/[?#]/)[0]; // REMOVES QUERY STRING AND HASH
	        
	        gfyID = url.substr(url.toLowerCase().indexOf("gfycat.com/") + 11);
	        
	        if( gfyID.indexOf(".webm") != -1 || gfyID.indexOf(".gifv") != -1 ){
		        gfyID = gfyID.substring(0, gfyID.length - 5);
	        }else if ( gfyID.indexOf(".ogg") != -1 || gfyID.indexOf(".ogv") != -1 || gfyID.indexOf(".mp4") != -1){
	        	gfyID = gfyID.substring(0, gfyID.length - 4);
	        }

	        $(theSideCommentLinks[i]).attr("data-video", gfyID );

			$(theSideCommentLinks[i]).addClass("shine-comment comment-gfycat");

		}

		else{

			$(theSideCommentLinks[i]).addClass("shine-comment");

		}

	}

	topLevelComments = $('.side-comments .commentarea > .sitetable > .thing').not(".been-shined");

	for( i = 0; i < topLevelComments.length; i++ ){

		$(topLevelComments[i]).addClass("been-shined");

		theChildren = $(topLevelComments[i]).find('.child .sitetable');

		if( theChildren.length > 0 ){

			$(topLevelComments[i]).find("ul.flat-list").first().append("<li class='inline-child-toggle'><a>hide / show child comments</a></li>");

		}
		
	}


	// stuff to do to all anchor tags
	$('.side-comments a').each(function(){

		$(this).attr("target","_blank");

	});

}













// OVERRIDES

$('body').on('click','div.content div#siteTable.linklisting > .thing .arrow', function(e){

	e.stopPropagation();
	e.preventDefault();
	return false;

});

$('body').on('click','div.content div#siteTable.linklisting > .thing a.title', function(e){

	e.preventDefault(); 

});

$('body').on('click','div.content div#siteTable.linklisting > .thing a.thumbnail', function(e){

	window.open( $(this).attr("href") );
	e.stopPropagation();
	return false;

});

$('body').on('click','div.content div#siteTable.linklisting > .thing a.subreddit', function(e){

	e.stopPropagation();

});
 

$('body').on('click','div.content div#siteTable.linklisting > .thing a.comments', function(e){

	e.stopPropagation();
	e.preventDefault();

	checkExists = $("#expand-" + $(this).parents('.thing').data("fullname"));

	if( checkExists.length > 0 ){

		$(checkExists).remove();

		$(this).parents('.thing').removeClass('active-thing');

	}else{

		$('.shine-expand').remove();

		// add expand div
		$(this).parents('.thing').after(''+

			'<div class="shine-expand" id="expand-' + $(this).parents('.thing').data("fullname") + '">'+
				'<div class="large-area"></div>'+
				'<div class="toggle-child-comments">Child Comments</div>'+
				'<div class="side-comments"></div>'+
			'</div>'

		);

		theExpand = $("#expand-" + $(this).parents('.thing').data("fullname"));

		$(theExpand).addClass("just-comments");

		// NOW GRAB COMMENTS
		$(theExpand).find('.side-comments').load( $(this).attr("href") + " div.content", function(){
            
            $(this).find('.expando').children('*').not('.usertext').remove();
            $(this).find('.expando-button').remove();

			startCheckingComments = setInterval(checkSideComments, 1000);

		});

		$('html,body').animate({ scrollTop: $(this).parents('.thing').offset().top - 120 }, 'fast');

		$(theExpand).attr("data-original-type", "comments");
		$(theExpand).attr("data-original-data", "comments");

	}

	return false;

});

// MAIN CLICK FUNCTION

$('body').on('click','div.content div#siteTable.linklisting > .thing:not(.shine-prompt, .side-comments .thing)', function(e){

	checkExists = $("#expand-" + $(this).data("fullname"));


	if( checkExists.length > 0 ){

		$(checkExists).remove();

		$(this).removeClass('active-thing');

	}else{

		$('.shine-expand').remove();
		$('.active-thing').removeClass("active-thing");

		$(this).addClass('active-thing');

		dontloadComments = false;

		// add expand div
		$(this).after(''+

			'<div class="shine-expand" id="expand-' + $(this).data("fullname") + '">'+
				'<div class="large-area"></div>'+
				'<div class="toggle-child-comments">Child Comments</div>'+
				'<div class="side-comments"></div>'+
			'</div>'

		);

		theLink = $(this);
		theExpand = $("#expand-" + $(this).data("fullname"));

		// time to decide what kind of link this is
		url = $(this).find('a.title').attr("href");

		// IMGUR
		if( url.toLowerCase().indexOf("imgur.com") != -1 && url.toLowerCase().indexOf("gifsound.com") == -1){

			url = url.split(/[?#]/)[0]; // REMOVES QUERY STRING AND HASH

			if( url.toLowerCase().indexOf("/a/") != -1){

				if( !$('html').hasClass("shine-analytics-optout") ){
                    
                    ga('send', 'event', 'ALBUM' , url , window.location.href.replace("https://","") );
                    
                }

				// we got an album
				albumID = url.substr(url.toLowerCase().indexOf("/a/") + 3);	
				albumID = albumID.split(/[?#]/)[0];

				$.ajax({
			      url: "https://api.imgur.com/3/album/" + albumID + "/images",
			      type: 'GET',
			      dataType: 'json',
			      success: function(data) { 


				      	$(theExpand).find('.large-area').html('<div class="large-album"></div><div class="album-thumbnails"></div><div class="album-captions"></div>');

				      	$('.active-album').removeClass("active-album");
						$(theExpand).find(".large-album").addClass("active-album");

				      	for( i = 0; i < data.data.length; i++ ){

				      		captionTitle = data.data[i].title;
				      		captionDescription = data.data[i].description;

				      		if( captionTitle != null){
				      			captionTitle = captionTitle.replace('"',"'");
				      		}

				      		if( captionDescription != null){
				      			captionDescription = captionDescription.replace('"',"'");
      						}

      						$(theExpand).find('.album-thumbnails').append('<img data-title="' + captionTitle + '" data-description="' + captionDescription + '" data-image="' + data.data[i].link + '" src="//i.imgur.com/' + data.data[i].id + 't.jpg" />');

				      	}

				      	$(theExpand).find('.album-thumbnails').find("img").first().addClass("active-thumb");

				      	$(theExpand).find('.large-album').css("background-image", "url(" + data.data[0].link + ")" );

				      	$(theExpand).find('.large-album').zoom({url: data.data[0].link, on: 'click'});

				      	if( data.data[0].title != null || data.data[0].description != null ){

				      		$(theExpand).find('.album-captions').html('<div class="show-captions"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="-291 389 20 16" style="enable-background:new -291 389 20 16;" xml:space="preserve"><path d="M-273,389h-16c-1.1,0-2,0.9-2,2v12c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2v-12C-271,389.9-271.9,389-273,389z M-289,397h4v2h-4V397z M-279,403h-10v-2h10V403z M-273,403h-4v-2h4V403z M-273,399h-10v-2h10V399z"/></svg></div><div class="caption-text"><strong></strong><p></p></div>');

				      		if( data.data[0].title != null ){
				      			$(theExpand).find('.caption-text strong').html(data.data[0].title);
				      		}

				      		if( data.data[0].description != null ){
				      			$(theExpand).find('.caption-text p').html(data.data[0].description);	
				      		}

				      	}

				      	$(theExpand).attr("data-original-type", "album");
				      	$(theExpand).attr("data-original-data", "https://api.imgur.com/3/album/" + albumID + "/images");

			      },
			      error: function(request, status, message) { 
			      	console.log(message); 
			      },
			      beforeSend: setHeader
			    });


			}else if( url.toLowerCase().indexOf("/r/") != -1 ){
			
				$(theExpand).addClass("just-comments");

				$(theExpand).attr("data-original-type", "comments");
				$(theExpand).attr("data-original-data", "comments");

			}else if( url.toLowerCase().indexOf("/gallery/") != -1 ){

				$(theExpand).addClass("just-comments");

				$(theExpand).attr("data-original-type", "comments");
				$(theExpand).attr("data-original-data", "comments");
				
			}else if( url.toLowerCase().indexOf(".gifv") != -1 ){

				if( !$('html').hasClass("shine-analytics-optout") ){

					ga('send', 'event', 'GIF' , url , window.location.href.replace("https://","") );

				}

				html5 = url.substr(url.toLowerCase().indexOf("imgur.com/") + 10);
				html5 = html5.substring(0, html5.length - 5);

				$(theExpand).find('.large-area').html('<div class="large-html5"><video  controls preload="auto" autoplay="autoplay" muted="muted" loop="loop" webkit-playsinline ><source src="//i.imgur.com/' + html5  + '.mp4" /></video></div>');

				$(theExpand).attr("data-original-type", "html5");
				$(theExpand).attr("data-original-data", '//i.imgur.com/' + html5  + '.mp4');

			}else if( url.toLowerCase().indexOf(".gif") != -1 ){	

				if( !$('html').hasClass("shine-analytics-optout") ){

					ga('send', 'event', 'GIF' , url , window.location.href.replace("https://","") );

				}

				html5 = url.substr(url.toLowerCase().indexOf("imgur.com/") + 10);
				html5 = html5.substring(0, html5.length - 4);

				$(theExpand).find('.large-area').html('<div class="large-html5"><video controls preload="auto" autoplay="autoplay" muted="muted" loop="loop" webkit-playsinline ><source src="//i.imgur.com/' + html5  + '.mp4" /></video></div>');

				$(theExpand).attr("data-original-type", "html5");
				$(theExpand).attr("data-original-data", '//i.imgur.com/' + html5  + '.mp4');

			}else{

				if( !$('html').hasClass("shine-analytics-optout") ){

					ga('send', 'event', 'IMAGE' , url , window.location.href.replace("https://","") );

				}

				url = url.split(/[?#]/)[0];
				url = decodeURIComponent(url);
				IMGURID = url.substr(url.toLowerCase().indexOf("imgur.com/") + 10);

				if( IMGURID.toLowerCase().indexOf(".tiff") != -1 || IMGURID.toLowerCase().indexOf(".jpeg") != -1 ){
					
					IMGURID = IMGURID.substring(0, IMGURID.length - 5);
					
				}
				else if( IMGURID.toLowerCase().indexOf(".png") != -1 || IMGURID.toLowerCase().indexOf(".jpg") != -1 || IMGURID.toLowerCase().indexOf(".tif") != -1){
				
					IMGURID = IMGURID.substring(0, IMGURID.length - 4);
				
				}

				getImageFromServer("https://i.imgur.com/" + IMGURID + ".png", IMGURID, theExpand );


			}

		}

		

		// REGULAR OLD GIFS CONVERTED TO GFYCAT
		else if( url.toLowerCase().indexOf(".gif") != -1 && url.toLowerCase().indexOf(".gifv") == -1 && url.toLowerCase().indexOf("/r/") == -1 ){

			if( !$('html').hasClass("shine-analytics-optout") ){

				ga('send', 'event', 'GIF' , url , window.location.href.replace("https://","") );
			
			}

			url = url.split(/[?#]/)[0]; // REMOVES QUERY STRING AND HASH

			convertGiftoGfy( theExpand, url );
			
		}



        
        // REDDIT UPLOADS
		else if( url.toLowerCase().indexOf("reddituploads.com") != -1){

			if( !$('html').hasClass("shine-analytics-optout") ){

				ga('send', 'event', 'IMAGE' , url , window.location.href.replace("https://","") );
			
			}
			
			$(theExpand).find('.large-area').html('<div class="large-image" style="background-image:url(' + url + ');"></div>');

			$(theExpand).find('.large-image').zoom({url: url, on: 'click'});

			$(theExpand).attr("data-original-type", "image");
			$(theExpand).attr("data-original-data", url);

		}
        
        
        
        

		// ANY OTHER PICTURE
		else if( url.toLowerCase().indexOf(".png") != -1 || url.toLowerCase().indexOf(".jpg") != -1 || url.toLowerCase().indexOf(".jpeg") != -1 || url.toLowerCase().indexOf(".tif") != -1 || url.toLowerCase().indexOf(".tiff") != -1){

			// this is any other image

			if( !$('html').hasClass("shine-analytics-optout") ){

				ga('send', 'event', 'IMAGE' , url , window.location.href.replace("https://","") );
			
			}

			url = url.split(/[?#]/)[0]; // REMOVES QUERY STRING AND HASH
			
			$(theExpand).find('.large-area').html('<div class="large-image" style="background-image:url(' + url + ');"></div>');

			$(theExpand).find('.large-image').zoom({url: url, on: 'click'});

			$(theExpand).attr("data-original-type", "image");
			$(theExpand).attr("data-original-data", url);

		}




		// LIVEMEME
		else if( url.toLowerCase().indexOf("livememe.com") != -1){

			if( !$('html').hasClass("shine-analytics-optout") ){
			
				ga('send', 'event', 'LIVEMEME' , url , window.location.href.replace("https://","") );
			
			}

			url = url.split(/[?#]/)[0]; // REMOVES QUERY STRING AND HASH

			liveMemeURL = url;
			if( liveMemeURL.slice(-1) == "/" ){
				liveMemeURL = liveMemeURL.substring(0, liveMemeURL.length - 1);
			}

			$(theExpand).html('<div class="large-image" style="background-image:url(' + liveMemeURL + ');"></div>');

			$(theExpand).find('.large-album').zoom({url: liveMemeURL, on: 'click'});

			$(theExpand).attr("data-original-type", "image");
			$(theExpand).attr("data-original-data", liveMemeURL);

		}




		//YOUTUBE
		else if( url.toLowerCase().indexOf("youtube.com") != -1 && url.toLowerCase().indexOf("/r/youtube") == -1 ){

			if( !$('html').hasClass("shine-analytics-optout") ){

				ga('send', 'event', 'YOUTUBE' , url , window.location.href.replace("https://","") );

			}

			vidID = "";

            if( url.toLowerCase().indexOf("attribution") != -1){
                
                vidID = getUrlVars(url)["u"];
                vidID = decodeURIComponent(vidID);
                vidID = getUrlVars(vidID)["v"];
                                
            }
            else{
            
                vidID = getUrlVars(url)["v"];
                                
            }
            
            timeStamp = getUrlVars(url)["t"];
            timeStamp = getYouTubeTimeStamp(timeStamp);

            $(theExpand).find(".large-area").html('<div class="large-youtube"><iframe frameborder="0" allowfullscreen src="//www.youtube.com/embed/' + vidID + '?rel=0&autoplay=1&vq=hd1080&wmode=transparent&start=' + timeStamp + '" /></div>');

            $(theExpand).attr("data-original-type", "youtube");
			$(theExpand).attr("data-original-data", '//www.youtube.com/embed/' + vidID + '?rel=0&autoplay=1&vq=hd1080&wmode=transparent&start=' + timeStamp);

		}






		//YOUTUBE SHARE
		else if( url.toLowerCase().indexOf("youtu.be") != -1 ){

			if( !$('html').hasClass("shine-analytics-optout") ){

				ga('send', 'event', 'YOUTUBE' , url , window.location.href.replace("https://","") );

			}

			vidID = url.substr(url.toLowerCase().indexOf("youtu.be/") + 9);
            
            timeStamp = getUrlVars(url)["t"];
            timeStamp = getYouTubeTimeStamp(timeStamp);

			$(theExpand).find(".large-area").html('<div class="large-youtube"><iframe frameborder="0" allowfullscreen src="//www.youtube.com/embed/' + vidID + '?rel=0&autoplay=1&vq=hd1080&wmode=transparent&start=' + timeStamp + '" /></div>');

			$(theExpand).attr("data-original-type", "youtube");
			$(theExpand).attr("data-original-data", '//www.youtube.com/embed/' + vidID + '?rel=0&autoplay=1&vq=hd1080&wmode=transparent&start=' + timeStamp);
			

		}






		// VIMEO
		else if( url.toLowerCase().indexOf("vimeo.com") != -1 && url.toLowerCase().indexOf("/r/vimeo") == -1 ){

			if( !$('html').hasClass("shine-analytics-optout") ){

				ga('send', 'event', 'VIMEO' , url , window.location.href.replace("https://","") );
			
			}

			url = url.split(/[?#]/)[0]; // REMOVES QUERY STRING AND HASH

			vidID = url.substr(url.toLowerCase().indexOf("vimeo.com/") + 10);

			$(theExpand).find(".large-area").html('<div class="large-youtube"><iframe frameborder="0" allowfullscreen src="//player.vimeo.com/video/' + vidID + '?autoplay=1" /></div>');

			$(theExpand).attr("data-original-type", "youtube");
			$(theExpand).attr("data-original-data", '//player.vimeo.com/video/' + vidID + '?autoplay=1');

		}





		//SOUNDCLOUD
        else if( url.toLowerCase().indexOf("soundcloud.com") != -1 ){

        	if( !$('html').hasClass("shine-analytics-optout") ){

        		ga('send', 'event', 'SOUNDCLOUD' , url , window.location.href.replace("https://","") );
	        
        	}

	        url = url.split(/[?#]/)[0]; // REMOVES QUERY STRING AND HASH

        	$.ajax({
		      url: '//api.soundcloud.com/resolve.json?url=' + url + '&client_id=343c40e7fa565f9d2b89820a05bb3a8f',
		      type: 'GET',
		      dataType: 'jsonp',
		      success: function(data) { 
		        
		          embedID = "";  
		        
		          $.each(data, function(index, element) {
		                
		            if(index == "id"){
		                    
		                    embedID = element;
		            
		                }
		                
		            });          
		          
		            if(url.toLowerCase().indexOf("in=") != -1){
		                      
		            	$(theExpand).find('.large-area').html("<div class='large-soundcloud'><iframe scrolling='no' frameborder='no' src='https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/" + embedID + "&amp;auto_play=false&amp;hide_related=false&amp;visual=true'></iframe></div>");

		            	$(theExpand).attr("data-original-type", "soundcloud");
						$(theExpand).attr("data-original-data", 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/' + embedID + '&amp;auto_play=false&amp;hide_related=false&amp;visual=true');
		                                
		            }
		            else if(url.toLowerCase().indexOf("sets") != -1){

		            	$(theExpand).find('.large-area').html("<div class='large-soundcloud'><iframe scrolling='no' frameborder='no' src='https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/" + embedID +  "&amp;auto_play=false&amp;hide_related=false&amp;visual=true'></iframe></div>");

		            	$(theExpand).attr("data-original-type", "soundcloud");
						$(theExpand).attr("data-original-data", 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/' + embedID +  '&amp;auto_play=false&amp;hide_related=false&amp;visual=true');
		                                
		            }
		            else{  

		            	$(theExpand).find('.large-area').html("<div class='large-soundcloud'><iframe scrolling='no' frameborder='no' src='https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/" + embedID + "&amp;auto_play=false&amp;hide_related=false&amp;visual=true'></iframe></div>");

		            	$(theExpand).attr("data-original-type", "soundcloud");
						$(theExpand).attr("data-original-data", 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/' + embedID + '&amp;auto_play=false&amp;hide_related=false&amp;visual=true');
		                
		            }                                                                                                       

		     },
		     error: function(request, status, message) { 
		      	console.log(message); 
		      },
		      beforeSend: setHeader
		    });

            
        }







        //GFYCAT
        else if( url.toLowerCase().indexOf("gfycat.com") != -1 ){

        	if( !$('html').hasClass("shine-analytics-optout") ){

        		ga('send', 'event', 'GFYCAT' , url , window.location.href.replace("https://","") );
	        
        	}

	        url = url.split(/[?#]/)[0]; // REMOVES QUERY STRING AND HASH
	        
	        gfyID = url.substr(url.toLowerCase().indexOf("gfycat.com/") + 11);
	        
	        if( gfyID.indexOf(".webm") != -1 || gfyID.indexOf(".gifv") != -1 ){
		        gfyID = gfyID.substring(0, gfyID.length - 5);
	        }else if ( gfyID.indexOf(".ogg") != -1 || gfyID.indexOf(".ogv") != -1 || gfyID.indexOf(".mp4") != -1){
	        	gfyID = gfyID.substring(0, gfyID.length - 4);
	        }
            
			$(theExpand).find('.large-area').html("<div class='large-html5'><video controls preload='auto' autoplay='autoplay' muted='muted' loop='loop' webkit-playsinline ><source src='//fat.gfycat.com/" + gfyID + ".mp4' type='video/mp4' /><source src='//giant.gfycat.com/" + gfyID + ".mp4' type='video/mp4' /><source src='//zippy.gfycat.com/" + gfyID + ".mp4' type='video/mp4' /></video></div>");

			$(theExpand).attr("data-original-type", "gfycat");
			$(theExpand).attr("data-original-data", gfyID);
	        
        }





		//REDDIT COMMENT
        else if( url.toLowerCase().indexOf("reddit.com/r/") != -1 && url.toLowerCase().indexOf("comments") != -1 && url.toLowerCase().indexOf("np.reddit") == -1){

        	if( !$('html').hasClass("shine-analytics-optout") ){

        		ga('send', 'event', 'TEXT' , url , window.location.href.replace("https://","") );

        	}

	        url = url.split(/[?#]/)[0]; // REMOVES QUERY STRING AND HASH

	        $(theExpand).addClass("just-comments");

	        $.ajax({
				url:url,
				type:'GET',
				success: function(data){

					theContent = $(data).find(".commentarea");

					$(theExpand).find('.side-comments').html( theContent );
				
				}
			});

	        dontloadComments = true;

	        $(theExpand).attr("data-original-type", "comments");
			$(theExpand).attr("data-original-data", "comments");
            
		}



		//SELF POST POST
		else if( url.toLowerCase().indexOf("/r/") != -1 && url.toLowerCase().indexOf("comments") != -1 && url.toLowerCase().indexOf("reddit.com") == -1 && url.toLowerCase().indexOf("np.reddit") == -1){

			if( !$('html').hasClass("shine-analytics-optout") ){

				ga('send', 'event', 'TEXT' , url , window.location.href.replace("https://","") );

			}

			$(theExpand).addClass("just-comments");

			$(theExpand).attr("data-original-type", "comments");
			$(theExpand).attr("data-original-data", "comments");
            
		}

		else{

			if( !$('html').hasClass("shine-analytics-optout") ){

				ga('send', 'event', 'TEXT' , url , window.location.href.replace("https://","") );

			}

			$(theExpand).addClass("just-comments");

			$(theExpand).attr("data-original-type", "comments");
			$(theExpand).attr("data-original-data", "comments");

		}


		if( dontloadComments == false ){

			// NOW GRAB COMMENTS
			$(theExpand).find('.side-comments').load( $(theLink).find("a.comments").attr("href") + " div.content", function(){
                
                $(this).find('.expando').children('*').not('.usertext').remove();
                $(this).find('.expando-button').remove();

				startCheckingComments = setInterval(checkSideComments, 1000);

			});

		}




		$('html,body').animate({ scrollTop: $(this).offset().top - 120 }, 'fast');

		

	}

});

$('body').on('click','.thing.link > .child', function(e){

	if( !$('html').hasClass("shine-analytics-optout") ){

		ga('send', 'event', 'LINK' , $(this).parents('.thing').find('a.title').attr("href") , window.location.href.replace("https://","") );

	}

	window.open( $(this).parents('.thing').find('a.title').attr("href") );

	e.stopPropagation();
	e.preventDefault();
	return false;

});












$('body').on('click','div.content div#siteTable .thing ul.flat-list', function(e){

	e.stopPropagation();

});

$('body').on('click','div#siteTable .thing form.hide-button a', function(e){
    
    $('#expand-' + $(this).parents('.thing').data("fullname") ).remove();

});

$('body').on('click','.album-thumbnails img', function(){

	if( !$('html').hasClass("shine-analytics-optout") ){

		ga('send', 'event', 'THUMBNAIL' , $(this).data("image") , window.location.href.replace("https://","") );

	}

	$(this).parents('.shine-expand').find('.large-album').css("background-image", "url(" + $(this).data("image") + ")" );

	$(this).parents('.shine-expand').find('.large-album').trigger('zoom.destroy');

    $(this).parents('.shine-expand').find('.large-album').zoom({url: $(this).data("image"), on: 'click'});

    $(this).parents('.album-thumbnails').find('img').removeClass("active-thumb");

    $(this).addClass("active-thumb");

    $(this).parents('.shine-expand').find('.album-captions').html("");

    if( $(this).data("title") != null || $(this).data("description") != null ){

  		$(this).parents('.shine-expand').find('.album-captions').html('<div class="show-captions"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="-291 389 20 16" style="enable-background:new -291 389 20 16;" xml:space="preserve"><path d="M-273,389h-16c-1.1,0-2,0.9-2,2v12c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2v-12C-271,389.9-271.9,389-273,389z M-289,397h4v2h-4V397z M-279,403h-10v-2h10V403z M-273,403h-4v-2h4V403z M-273,399h-10v-2h10V399z"/></svg></div><div class="caption-text"><strong></strong><p></p></div>');

  		if( $(this).data("title") != "null" ){
  			$(this).parents('.shine-expand').find('.caption-text strong').html($(this).data("title"));
  		}

  		if( $(this).data("description") != "null" ){
  			$(this).parents('.shine-expand').find('.caption-text p').html($(this).data("description"));	
  		}

  	}

});

$('body').on('click','.show-captions',function(e){

	if( !$('html').hasClass("shine-analytics-optout") ){

		ga('send', 'event', 'CAPTIONS' , '' , window.location.href.replace("https://","") );

	}

	$(this).parents(".shine-expand").toggleClass("activate-captions");

	e.stopPropagation();

	e.preventDefault();

	return false;

});

$('body').on('click','.large-area', function(){

	$('.active-album').removeClass("active-album");
	$(this).find('.large-album').addClass("active-album");

});

$(document).keydown(function(e) {

    if( $('.active-album').length != -1 ){

    	theThumbs = $('.active-album').parents('.large-area').find('.album-thumbnails img');

	    var code = (e.keyCode ? e.keyCode : e.which);
	    if (code == 40) {
	        //down pressed

	        for(i = 0; i < theThumbs.length; i++){

	        	if( $(theThumbs[i]).hasClass("active-thumb") ){

	        		if( i == theThumbs.length - 1 ){

	        			// do nothing 

	        			$('.active-album').removeClass("active-album");

	        		}else{

						$(theThumbs[i+1]).click();

						$('.active-album').parents('.large-area').find('.album-thumbnails').scrollTop($('.active-album').parents('.large-area').find('.album-thumbnails').scrollTop() + $('.active-album').parents('.large-area').find('.active-thumb').position().top);

						e.preventDefault();
					    e.stopPropagation();
					    return false;

	        		}

	        		break;

	        	}

	        }

	        

	    } else if (code == 38) {
	        //up pressed
	        
	        for(i = 0; i < theThumbs.length; i++){

	        	if( $(theThumbs[i]).hasClass("active-thumb") ){

	        		if( i == 0 ){

	        			// do nothing

	        			$('.active-album').removeClass("active-album");

	        		}else{

						$(theThumbs[i-1]).click();

						$('.active-album').parents('.large-area').find('.album-thumbnails').scrollTop($('.active-album').parents('.large-area').find('.album-thumbnails').scrollTop() + $('.active-album').parents('.large-area').find('.active-thumb').position().top);

						e.preventDefault();
					    e.stopPropagation();
					    return false;

	        		}

	        		break;

	        	}

	        }

	    }

	    

	}

});

$('body').on('click','.toggle-child-comments', function(){

	$(this).parents(".shine-expand").toggleClass("shine-hide-children");

});










function getCommentAlbumImages( api, target ){

	$.ajax({
      url: api,
      type: 'GET',
      dataType: 'json',
      success: function(data) { 

		$(target).find(".large-area").html('<div class="large-album"></div><div class="album-thumbnails"></div><div class="album-captions"></div>');

		$('.active-album').removeClass("active-album");
		$(target).find(".large-album").addClass("active-album");

      	for( i = 0; i < data.data.length; i++ ){

      		captionTitle = data.data[i].title;
      		captionDescription = data.data[i].description;

      		if( captionTitle != null){
      			captionTitle = captionTitle.replace('"',"'");
      		}

      		if( captionDescription != null){
      			captionDescription = captionDescription.replace('"',"'");
			}

			$(target).find('.album-thumbnails').append('<img data-title="' + captionTitle + '" data-description="' + captionDescription + '" data-image="' + data.data[i].link + '" src="//i.imgur.com/' + data.data[i].id + 't.jpg" />');

      	}

      	$(target).find('.album-thumbnails img').first().addClass("active-thumb");

      	$(target).find('.large-album').css("background-image", "url(" + data.data[0].link + ")" );

      	$(target).find('.large-album').zoom({url: data.data[0].link, on: 'click'});

      	if( data.data[0].title != null || data.data[0].description != null ){

      		$(target).find('.album-captions').html('<div class="show-captions"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="-291 389 20 16" style="enable-background:new -291 389 20 16;" xml:space="preserve"><path d="M-273,389h-16c-1.1,0-2,0.9-2,2v12c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2v-12C-271,389.9-271.9,389-273,389z M-289,397h4v2h-4V397z M-279,403h-10v-2h10V403z M-273,403h-4v-2h4V403z M-273,399h-10v-2h10V399z"/></svg></div><div class="caption-text"><strong></strong><p></p></div>');

      		if( data.data[0].title != null ){
      			$(target).find('.caption-text strong').html(data.data[0].title);
      		}

      		if( data.data[0].description != null ){
      			$(target).find('.caption-text p').html(data.data[0].description);	
      		}

      	}

      },
      error: function(request, status, message) { 
      	console.log(message); 
      },
      beforeSend: setHeader
    });

}









function replaceExpand(type,data,button){



  if( type === "comments" ){


  	$(button).parents(".shine-expand").find(".large-area").html("");
  	$(button).parents(".shine-expand").addClass("just-comments");

  	container = $(button).parents(".shine-expand").find('.side-comments');
	scrollTo = $(button);

	container.scrollTop(
	    scrollTo.offset().top - container.offset().top + container.scrollTop() - 100
	);


  }else if( type === "image" ){



    $(button).parents(".shine-expand").find(".large-area").html('<div class="large-image" style="background-image:url(' + data + ');"></div>');

	$(button).parents(".shine-expand").find(".large-image").zoom({url: data, on: 'click'});




  }else if( type === "youtube"){




    $(button).parents(".shine-expand").find(".large-area").html('<div class="large-youtube"><iframe frameborder="0" allowfullscreen src="' + data + '" /></div>');




  }else if( type === "html5"){




    $(button).parents(".shine-expand").find(".large-area").html('<div class="large-html5"><video controls preload="auto" autoplay="autoplay" muted="muted" loop="loop" webkit-playsinline ><source src="' + data + '" type="video/mp4" /></video></div>');




  }else if( type === "gfycat"){




    $(button).parents(".shine-expand").find(".large-area").html("<div class='large-html5'><video controls preload='auto' autoplay='autoplay' muted='muted' loop='loop' webkit-playsinline ><source src='//fat.gfycat.com/" + data + ".mp4' type='video/mp4' /><source src='//giant.gfycat.com/" + data + ".mp4' type='video/mp4' /><source src='//zippy.gfycat.com/" + data + ".mp4' type='video/mp4' /></video></div>");




  }else if( type === "album"){




    getCommentAlbumImages( data, $(button).parents(".shine-expand") );




  }




  if( !$(button).hasClass("closecommentmedia") ){
    $('.shine-comment').removeClass("closecommentmedia");
    $(button).addClass("closecommentmedia");
  }else{
    $('.shine-comment').removeClass("closecommentmedia");
  }




}








$('html').not('.shinelight, .shine-list-classic').on('click','.comment-image:not(.closecommentmedia)',function(e){

	if( !$('html').hasClass("shine-analytics-optout") ){

		ga('send', 'event', 'COMMENT IMAGE' , $(this).data("image") , window.location.href.replace("https://","") );

	}

	replaceExpand("image", $(this).data("image"), $(this));


});

$('html').not('.shinelight, .shine-list-classic').on('click','.comment-youtube:not(.closecommentmedia)',function(e){

	if( !$('html').hasClass("shine-analytics-optout") ){

		ga('send', 'event', 'COMMENT YOUTUBE' , $(this).data("video") , window.location.href.replace("https://","") );

	}

	replaceExpand("youtube", $(this).data("video"), $(this) );

});

$('html').not('.shinelight, .shine-list-classic').on('click','.comment-html5:not(.closecommentmedia)', function(e){

	if( !$('html').hasClass("shine-analytics-optout") ){

		ga('send', 'event', 'COMMENT VIDEO' , $(this).data("video") , window.location.href.replace("https://","") );

	}

	replaceExpand("html5", $(this).data("video"), $(this) );

});

$('html').not('.shinelight, .shine-list-classic').on('click','.comment-gfycat:not(.closecommentmedia)', function(e){

	if( !$('html').hasClass("shine-analytics-optout") ){

		ga('send', 'event', 'COMMENT GFYCAT' , $(this).data("video") , window.location.href.replace("https://","") );

	}

	replaceExpand("gfycat", $(this).data("video"), $(this) );

});



$('html').not('.shinelight, .shine-list-classic').on('click','.comment-album:not(.closecommentmedia)', function(e){

	if( !$('html').hasClass("shine-analytics-optout") ){

		ga('send', 'event', 'COMMENT ALBUM' , $(this).data("album") , window.location.href.replace("https://","") );

	}

	replaceExpand("album", $(this).data("album"), $(this) );

});



$('html').not('.shinelight').on('click','.closecommentmedia', function(e){

  replaceExpand( $(this).parents('.shine-expand').attr("data-original-type"), $(this).parents('.shine-expand').attr("data-original-data"), $(this) );

  e.preventDefault();

});



$('body').on('click','.toggle-child-comments', function(){

	if( !$('html').hasClass("shine-analytics-optout") ){

		ga('send', 'event', 'CHILD COMMENTS' , 'TOGGLE' , window.location.href.replace("https://","") );

	}

	$('html').toggleClass("shine-hide-children");

});

$('body').on('click','.inline-child-toggle', function(){

	if( !$(this).parents('.been-shined').hasClass("show-child-comments") ){

		if( !$('html').hasClass("shine-analytics-optout") ){

			ga('send', 'event', 'CHILD COMMENTS' , 'SHOW' , window.location.href.replace("https://","") );

		}

		$(this).parents('.been-shined').addClass("show-child-comments");
		$(this).parents('.been-shined').removeClass("hide-child-comments");

	}else{

		if( !$('html').hasClass("shine-analytics-optout") ){

			ga('send', 'event', 'CHILD COMMENTS' , 'HIDE' , window.location.href.replace("https://","") );

		}

		$(this).parents('.been-shined').removeClass("show-child-comments");
		$(this).parents('.been-shined').addClass("hide-child-comments");

	}

});



$('html').not('.shinelight, .shine-list-classic').on('click','.comment-image:not(.closecommentmedia), .comment-youtube:not(.closecommentmedia), .comment-html5:not(.closecommentmedia), .comment-gfycat:not(.closecommentmedia), .comment-album:not(.closecommentmedia)', function(e){

	if( $(this).parents(".shine-expand").hasClass("just-comments") ){

		$(this).parents(".shine-expand").removeClass("just-comments");

		container = $(this).parents(".shine-expand").find('.side-comments');
	    scrollTo = $(this);

		container.scrollTop(
		    scrollTo.offset().top - container.offset().top + container.scrollTop() - 100
		);

	}

	e.preventDefault();

});
















$('body').on('focus','input, textarea', function(){
	$('html').addClass("disable-shift");
});

$('body').on('blur','input, textarea', function(){
	$('html').removeClass("disable-shift");
});

// RES Keyboard Navigation and closing posts
$(document).on('keyup keydown', function(e){
	
	if(e.shiftKey && !$('html').hasClass("disable-shift")){
		$('.RES-keyNav-activeElement').parents('.thing').click();
	}

	if(e.keyCode == "27"){
		$('.shine-expand').remove();
		$('.thing.active-thing').removeClass("active-thing");
	}

});
























// when RES loads new things, run our JS on them

if( $('body').hasClass('res') ){

	window.addEventListener("neverEndingLoaded", function() {

		if( !$('html').hasClass("shine-analytics-optout") ){

			ga('send', 'pageview', { 'page': window.location.href.replace("https://","") , 'title': document.title });

		}

		setTimeout("jQuery('#siteTable > .sitetable.linklisting .thing').first().unwrap()", 1);

	}, false);
 
}else{


	loading = false;

	//SCROLLING FUNCTIONS
    $(window).scroll(function(){

        if( $(window).scrollTop() + $(window).height() >= $('body').height() - 1000 && loading == false ){

            loading = true;

            lastThing = $('body > .content #siteTable > .thing').last().attr('data-fullname');

            subReddit = window.location.href.split(/[?#]/)[0];

        	$.ajax({
		      url: subReddit + "?count=25&after=" + lastThing,
		      cache: false,
		      success: function(data) { 

		      	if( !$('html').hasClass("shine-analytics-optout") ){
			     
		      		ga('send', 'pageview', { 'page': window.location.href.replace("https://","") , 'title': document.title });

		      	}

			     window.location.hash = "shiny=" + lastThing;

			     $('body > .content #siteTable').append( $(data).find('#siteTable .thing') );

			     loading = false;
			      
			  },
		      error: function(request, status, message) { 
		      	console.log(message); 
		      }
		    });	

        }
        
    });


}









/* EXTRA ANALYTICS */

if( !$('html').hasClass("shine-analytics-optout") ){

	$('body').on('click','.arrow.upmod', function(){

		ga('send', 'event', 'UPVOTE' , $(this).parents('.thing').find('a.title').attr("href") , window.location.href.replace("https://","") );

	});

	$('body').on('click','.arrow.downmod', function(){

		ga('send', 'event', 'DOWNVOTE' , $(this).parents('.thing').find('a.title').attr("href") , window.location.href.replace("https://","") );	

	});

	$('body').on('click','.list-switch', function(){

		ga('send', 'event', 'SWITCH' , "LIST VIEW" , window.location.href.replace("https://","") );	

	});

	$('body').on('click','.grid-switch', function(){

		ga('send', 'event', 'SWITCH' , "GRID VIEW" , window.location.href.replace("https://","") );	

	});

	$('body').on('click','.shine-navicon', function(){

		if( $('html').hasClass("shine-menu") ){
			ga('send', 'event', 'NAV' , "CLOSE NAV" , window.location.href.replace("https://","") );
		}else{
			ga('send', 'event', 'NAV' , "OPEN NAV" , window.location.href.replace("https://","") );
		}

	});

	$('body').on('click','.shine-submit', function(){

		ga('send', 'event', 'NAV' , "SUBMIT" , window.location.href.replace("https://","") );	

	});

	$('body').on('click','.shine-sidebar', function(){

		if( $('html').hasClass("show-sidebar") ){
			ga('send', 'event', 'NAV' , "HIDE SIDEBAR" , window.location.href.replace("https://","") );
		}else{
			ga('send', 'event', 'NAV' , "SHOW SIDEBAR" , window.location.href.replace("https://","") );
		}

	});

	$('body').on('click','.shine-multi', function(){

		if( $('html').hasClass("show-multireddits") ){
			ga('send', 'event', 'NAV' , "HIDE MULTIREDDITS" , window.location.href.replace("https://","") );
		}else{
			ga('send', 'event', 'NAV' , "SHOW MULTIREDDITS" , window.location.href.replace("https://","") );
		}

	});

	$('body').on('click','.shine-settings', function(){

		ga('send', 'event', 'NAV' , "SETTINGS" , window.location.href.replace("https://","") );	

	});

	$('body').on('click','.shine-search', function(){

		ga('send', 'event', 'NAV' , "SEARCH" , window.location.href.replace("https://","") );	

	});

	$('body').on('click','.shine-bright-nav', function(){

		ga('send', 'event', 'NAV' , "SHINE BRIGHT" , window.location.href.replace("https://","") );	

	});

	$('body').on('click','#shine-bright-logout', function(){

		ga('send', 'event', 'SHINE BRIGHT' , "LOGOUT" , window.location.href.replace("https://","") );	

	});

	$('body').on('click','#shine-bright-login', function(){

		ga('send', 'event', 'SHINE BRIGHT' , "LOGIN" , window.location.href.replace("https://","") );	

	});

	$('body').on('click','#shine-remind-me', function(){

		ga('send', 'event', 'SHINE BRIGHT' , "FORGOT" , window.location.href.replace("https://","") );	

	});

	$('body').on('click','.shine-prompt', function(){

		ga('send', 'event', 'SHINE BRIGHT' , "PROMPT" , window.location.href.replace("https://","") );	
	});

}