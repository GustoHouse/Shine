// braintree stuff
$.getScript('https://js.braintreegateway.com/v2/braintree.js', function(){
	$('html').addClass("shine-bt-loaded");
});











if( window.location.hash == "#shinebright" ){

	$('html').addClass("show-shine-bright");
	window.location.hash = "";

}















// FUNCTIONS SECTION

// this function returns our query string variable
function getQueryString(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function IsJsonString(str) {
    
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;

}



















// INITIAL VARIABLE CREATION SECTION

// creating the settings variable to use when we update and save settings
var currentSettings = {};

// creating the default settings variable if they havn't saved any settings yet
var defaultSettings = {"global" : {"layout" : "list", "shortcuts" : "show", "night" : "off", "analytics" : "shine-analytics-optin", "sidebar" : "", "multis" : ""},

    "list" :  {"split" : "7030", "columns" : "one"},

    "grid" :  {"columns" : "5", "nsfw" : "no", "split" : "7030"},

    "subreddits" : [
    	{"url" : "www.reddit.com/r/shine/", "layout" : "list"},
    	{"url" : "www.reddit.com/r/aww/", "layout" : "grid"},
    	{"url" : "www.reddit.com/r/earthporn/", "layout" : "list"}
    ],

    "multireddits" : [
    	{"url" : "www.reddit.com/user/evilnight/m/redditunes", "layout" : "grid"},
    	{"url" : "www.reddit.com/user/Abbigale221/m/moviesandtv", "layout" : "list"}
    ],

    "account" : {"email" : "default@default.com", "password" : "default", "status" : "shinelight", "lastchecked" : ""},

    "message" : ""

};



// this creates our variable that stories what today's date is
var d = new Date();
var curr_date = d.getDate();
var curr_month = d.getMonth() + 1;
todayIs = curr_month.toString() + curr_date.toString();

















// this is the main SHINE base function that runs after we've retrieved or created thier settings
// this sets up the basic global interface
function SHINE(){






	console.log(currentSettings);








	// adding our menu interface

	htmlToAdd = ""+

		'<div class="dark-background"></div>'+

		'<div class="shine-nav">'+

			'<div class="shine-menu-button shine-bright-nav">'+
				'<label>shine bright</label>'+
			'</div>'+
			
			'<div class="shine-menu-button shine-search">'+
				'<label>search reddit</label>'+
			'</div>'+

			'<div class="shine-menu-button shine-settings">'+
				'<label>shine settings</label>'+
			'</div>';

		if( $('body').hasClass("with-listing-chooser") ){

			htmlToAdd = htmlToAdd +

			'<div class="shine-menu-button shine-multi">'+
				'<label>toggle multireddits</label>'+
			'</div>';

		}

		htmlToAdd = htmlToAdd +

			'<div class="shine-menu-button shine-sidebar">'+
				'<label>toggle sidebar</label>'+
			'</div>'+

			'<a href="" class="shine-menu-button shine-submit">'+
				'<label>post to reddit</label>'+
			'</a>'+

			'<div class="shine-menu-button shine-navicon">'+
				'<span class="lines"></span>'+
			'</div>'+

		'</div>'+

		'<form action="https://www.reddit.com/search" id="shine-search" name="search">'+
        	'<input name="q" placeholder="type here and hit enter" tabindex="20" type="text" id="shine-search-box">'+
        	'<input tabindex="22" type="submit" value="">'+
        	'<a href="https://www.reddit.com/wiki/search">advanced search: by author, subreddit...</a>'+
    	'</form>';

	$('body').append(htmlToAdd);

	$('#header').append(''+

		'<div class="layout-switch">'+
			'<svg class="grid-switch" fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M4 11h5V5H4v6zm0 7h5v-6H4v6zm6 0h5v-6h-5v6zm6 0h5v-6h-5v6zm-6-7h5V5h-5v6zm6-6v6h5V5h-5z"/></svg>'+
			'<svg class="list-switch" fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M4 14h4v-4H4v4zm0 5h4v-4H4v4zM4 9h4V5H4v4zm5 5h12v-4H9v4zm0 5h12v-4H9v4zM9 5v4h12V5H9z"/></svg>'+
		'</div>'

	);

	if( $('.pagename a').attr("href") != undefined ){
		$('.shine-submit').attr("href", $('.pagename a').attr("href") + "submit/" );
	}else{
		$('.shine-submit').attr("href", "/submit/");
	}





	// moving subscribe button into nav
	$('.side .subscribe-button').clone().prependTo(".shine-nav");
	$('.shine-nav .subscribe-button .option').addClass("shine-menu-button shine-subscribe");













	// HERE WE ADD THE SETTINGS DIV
	$('body').append(''+

		'<div class="settings-panel">'+
			'<div class="settings-tabs">'+
				'<div data-settings-panel=".panel-default" class="tab tab-default tab-active">Default Settings</div>'+
				'<div data-settings-panel=".panel-grid" class="tab tab-grid">Grid Settings</div>'+
				'<div data-settings-panel=".panel-list" class="tab tab-list">List Settings</div>'+
			'</div>'+
			'<div class="panel panel-default panel-active">'+
				'<div class="shine-settings-prompt shine-prompt">Get a Shine Bright account to unlock the settings below.</div>'+
				'<div class="settings-halves">'+
					'<div class="settings-column-half">'+
						'<label for="settings-default-view">Default View</label>'+
						'<select name="settings-default-view" id="settings-default-view">'+
							'<option value="list">List View</option>'+
							'<option value="grid">Grid View</option>'+
						'</select>'+
					'</div>'+
					'<div class="settings-column-half">'+
						'<label for="settings-night-mode">Night Mode</label>'+
						'<select name="settings-night-mode" id="settings-night-mode">'+
							'<option value="off">Off</option>'+
							'<option value="on">On</option>'+
						'</select>'+
					'</div>'+
				'</div>'+
				'<div class="settings-halves">'+
					'<div class="settings-column-half">'+					
						'<label for="settings-shortcuts-bar">Shortcuts Bar</label>'+
						'<select name="settings-shortcuts-bar" id="settings-shortcuts-bar">'+
							'<option value="show">Show</option>'+
							'<option value="hide">Hide</option>'+
						'</select>'+
					'</div>'+
					'<div class="settings-column-half">'+					
						'<label for="settings-analytics">Google Analytics Tracking</label>'+
						'<select name="settings-analytics" id="settings-analytics">'+
							'<option value="shine-analytics-optin">Opt In</option>'+
							'<option value="shine-analytics-optout">Opt Out</option>'+
						'</select>'+
					'</div>'+
				'</div>'+
				'<p>To add or edit subreddit or multireddit defaults, please go to that subreddit or multireddit and click the grid view or list view icon in the top bar. To remove a default from the lists below, click the delete icon.</p>'+
				'<div class="settings-halves">'+
					'<div class="settings-column-half">'+
						'<label>Subreddit Defaults</label>'+
						'<div class="settings-subreddit-defaults"></div>'+
					'</div>'+
					'<div class="settings-column-half">'+
						'<label>Multireddit Defaults</label>'+
						'<div class="settings-multireddit-defaults"></div>'+
					'</div>'+
				'</div>'+
			'</div>'+
			'<div class="panel panel-grid">'+
				'<div class="shine-settings-prompt shine-prompt">Get a Shine Bright account to unlock the settings below.</div>'+
				'<p>The settings below are applied to all Grid View pages.</p>'+
				'<div class="settings-halves">'+
					'<div class="settings-column-half">'+
						'<label for="settings-number-columns">Number of Columns</label>'+
						'<select name="settings-number-columns" id="settings-number-columns">'+
							'<option value="1">One</option>'+
							'<option value="2">Two</option>'+
							'<option value="3">Three</option>'+
							'<option value="4">Four</option>'+
							'<option value="5">Five</option>'+
						'</select>'+
					'</div>'+
					'<div class="settings-column-half">'+
						'<label for="settings-grid-split">Image & Comments Split Percentage</label>'+
						'<select name="settings-grid-split" id="settings-grid-split">'+
							'<option value="7030">70 / 30</option>'+
							'<option value="6040">60 / 40</option>'+
							'<option value="5050">50 / 50</option>'+
							'<option value="4060">40 / 60</option>'+
							'<option value="3070">30 / 70</option>'+
						'</select>'+
					'</div>'+
				'</div>'+
				'<div class="settings-halves">'+
					'<div class="settings-column-half">'+
						'<label for="settings-show-nsfw">Show NSFW Automatically</label>'+
						'<select name="settings-show-nsfw" id="settings-show-nsfw">'+
							'<option value="no">No</option>'+
							'<option value="yes">Yes</option>'+
						'</select>'+
					'</div>'+
				'</div>'+
			'</div>'+
			'<div class="panel panel-list">'+
				'<div class="shine-settings-prompt shine-prompt">Get a Shine Bright account to unlock the settings below.</div>'+
				'<p>The settings below are applied to all List View pages.</p>'+
				'<div class="settings-halves">'+
					'<div class="settings-column-half">'+
						'<label for="settings-list-layout">List View Layout</label>'+
						'<select name="settings-list-layout" id="settings-list-layout">'+
							'<option value="one">Display content underneath list item.</option>'+
							'<option value="two">Display content to the right of list items.</option>'+
						'</select>'+
					'</div>'+
					'<div class="settings-column-half">'+
						'<label for="settings-list-split">Image & Comments Split Percentage</label>'+
						'<select name="settings-list-split" id="settings-list-split">'+
							'<option value="7030">70 / 30</option>'+
							'<option value="6040">60 / 40</option>'+
							'<option value="5050">50 / 50</option>'+
							'<option value="4060">40 / 60</option>'+
							'<option value="3070">30 / 70</option>'+
						'</select>'+
					'</div>'+
				'</div>'+
			'</div>'+
			'<div class="settings-saved">Your settings have been saved.</div>'+
		'</div>'

	);




	/* SETTINGS BAR */

	if( currentSettings.global.shortcuts == "hide" ){

		$('#settings-shortcuts-bar').val("hide");

	}else{

		$('html').addClass("show-shortcuts");

	}

	/* DEFAULT VIEW */

	if( currentSettings.global.layout == "list" ){

		$('#settings-default-view').val("list");

	}else{

		$('#settings-default-view').val("grid");

	}

	/* GRID COLUMNS */

	$('#settings-number-columns').val( currentSettings.grid.columns );

	/* NIGHT MODE */

	$('#settings-night-mode').val( currentSettings.global.night );

	/* NSFW */

	$('#settings-show-nsfw').val( currentSettings.grid.nsfw );

	/* LIST VIEW */

	$('#settings-list-layout').val( currentSettings.list.columns );

	/* ANALYTICS */

	$('#settings-analytics').val( currentSettings.global.analytics );
	
	/* GRID SPLIT */
	
	if( currentSettings.grid.split == "7030" || currentSettings.grid.split == "6040" || currentSettings.grid.split == "5050" || currentSettings.grid.split == "4060" || currentSettings.grid.split == "3070"){
		$('#settings-grid-split').val( currentSettings.grid.split );
	}
	
	/* LIST SPLIT */
	
	if( currentSettings.list.split == "7030" || currentSettings.list.split == "6040" || currentSettings.list.split == "5050" || currentSettings.list.split == "4060" || currentSettings.list.split == "3070"){
		$('#settings-list-split').val( currentSettings.list.split );
	}

	/* DISABLE STUFF IF SHINE LIGHT */

	if( currentSettings.account.status == "shinelight" ){

		$('#settings-default-view').attr("disabled","disabled");
		$('#settings-night-mode').attr("disabled","disabled");
		$('#settings-shortcuts-bar').attr("disabled","disabled");
		$('#settings-number-columns').attr("disabled","disabled");
		$('#settings-show-nsfw').attr("disabled","disabled");
		$('#settings-list-layout').attr("disabled","disabled");
		$('#settings-grid-split').attr("disabled","disabled");
		$('#settings-list-split').attr("disabled","disabled");

	}








	// analytics class
	$('html').addClass( currentSettings.global.analytics );







	// this adds the nightmode class
	if( currentSettings.global.night == "on" ){
		$('html').addClass("res-nightmode");
		$('body').addClass("res-nightmode");
	}





	// this adds hide nsfw class

	if( currentSettings.grid.nsfw == "no" ){
		$('html').addClass("shine-hide-nsfw");
	}



	// this adds a class to the html that says if we've paid or not
	$('html').addClass( currentSettings.account.status );

	if( currentSettings.account.status == "shinelight" ){

		$('#header-bottom-left').prepend('<div class="header-shine-bright shine-prompt">Get Shine Bright Now</div>');

	}




	// this adds the sidebar class and multireddit class
	$('html').addClass( currentSettings.global.sidebar );

	if( $('body').hasClass("with-listing-chooser") ){
		$('html').addClass( currentSettings.global.multis );
	}






	// this cleans up the top right section
	if( !$('body').hasClass("loggedin") ){
		$('#header-bottom-right .user').contents().first().remove();
		$('#header-bottom-right .user').contents().last().remove();
	}












	// this makes sure we're on the home page, a subreddit, or a multireddit
	if( $('body').hasClass("listing-page") && !$('body').hasClass("profile-page") && $('#header-bottom-left .pagename').html() != "preferences" && !$('body').hasClass("subreddits-page") ){










		//time to decide if we're going to load the list view or the grid view
		var whichView = "";

		//time to check the subreddits
		if( currentSettings.subreddits.length > 0){

			for(i = 0; i < currentSettings.subreddits.length; i++){

				windowLocation = $('.pagename a').attr("href");
				subredditURL = currentSettings.subreddits[i].url;

				if( windowLocation != undefined ){
					if( windowLocation.indexOf( subredditURL ) != -1 ){
						whichView = currentSettings.subreddits[i].layout;
					}
				}

				displayURL = currentSettings.subreddits[i].url;
				displayURL = displayURL.replace("www.reddit.com","");

				$('.settings-subreddit-defaults').append('<li data-url="' + currentSettings.subreddits[i].url + '"><a href="http://' + currentSettings.subreddits[i].url + '">' + displayURL + '</a><span data-url="' + currentSettings.subreddits[i].url + '" class="remove-default remove-subreddit-default"></span><span class="default-view">' + currentSettings.subreddits[i].layout + ' view</span></li>');

			}

		}

		// now it's time to check the multireddits
		if( currentSettings.multireddits.length > 0){

			for(i = 0; i < currentSettings.multireddits.length; i++){

				windowLocation = $('.pagename a').attr("href");
				multiredditURL = currentSettings.multireddits[i].url;

				if( windowLocation != undefined ){
					if( windowLocation.indexOf( multiredditURL ) != -1 ){
						whichView = currentSettings.multireddits[i].layout;
					}
				}

				displayURL = currentSettings.multireddits[i].url;
				displayURL = displayURL.replace("www.reddit.com/user","").replace("www.reddit.com/me","");

				$('.settings-multireddit-defaults').append('<li data-url="' + currentSettings.multireddits[i].url + '"><a href="http://' + currentSettings.multireddits[i].url + '">' + displayURL + '</a><span data-url="' + currentSettings.multireddits[i].url + '" class="remove-default remove-multireddit-default"></span><span class="default-view">' + currentSettings.multireddits[i].layout + ' view</span></li>');

			}

		}


		// if whichView is still blank, use the default layout
		if( whichView == "" ){

			whichView = currentSettings.global.layout;

		}


		// time to load our other javascript files

		if( whichView == "grid" ){

			$.getScript( chrome.extension.getURL("jquery.zoom.min.js") );
			$.getScript( chrome.extension.getURL("shine-grid.js") );

			thingWidth = screen.width / ( parseInt(currentSettings.grid.columns) + 1);

			$('html').attr("data-columns", currentSettings.grid.columns);

			$('head').append(''+

				'<style id="shine-card-width" type="text/css">'+
					'html.SHINE.shine-grid body > .content #siteTable .thing{'+
						'width:' + thingWidth + 'px;'+
					'}'+
					'html.SHINE.shine-grid body > .content #siteTable .thing .preview{'+
						'width:' + thingWidth + 'px;'+
						'flex-basis:' + thingWidth + 'px;'+
					'}'+
					'html.SHINE.shine-grid body > .content #siteTable .thing .preview.preview-text{'+
						'flex-basis: auto;'+
						'max-height:' + thingWidth + 'px;'+
					'}'+
				'</style>'

			);
			
			if( currentSettings.grid.split == "7030" || currentSettings.grid.split == "6040" || currentSettings.grid.split == "5050" || currentSettings.grid.split == "4060" || currentSettings.grid.split == "3070"){
				
				$('html').addClass("shine-split-" + currentSettings.grid.split);
				
			}
			
			

		}else if( whichView == "list" ){

			if(currentSettings.list.columns == "two"){
				$('html').addClass("shine-list-classic");
			}			

			$.getScript( chrome.extension.getURL("jquery.zoom.min.js") );
			$.getScript( chrome.extension.getURL("shine-list.js") );
			
			if(currentSettings.list.split == "7030" || currentSettings.list.split == "6040" || currentSettings.list.split == "5050" || currentSettings.list.split == "4060" || currentSettings.list.split == "3070"){
				
				if( !$('html').hasClass("shine-list-classic") ){
					$('html').addClass("shine-split-" + currentSettings.list.split);
				}	
				
			}
			

		}


		// add our view class to the html
		$('html').addClass("shine-" + whichView);



		// time to go get a message
		$.ajax({
			url: "https://www.madewithgusto.com/SHINE-message.php",
			type: 'POST',
			success: function(message) {

				message = JSON.parse(message);

				if(currentSettings.message != message.title){

					if ( message.ctalink != "" ){

						$('body').prepend(''+
							'<div class="shine-message">'+
									'<h1>' + message.title + '</h1>'+
									'<div class="shine-message-body">' +  message.message + '</div>'+
									'<a target="_blank" class="message-button" href="' + message.ctalink + '">' + message.cta + '</a>'+
									'<span class="message-close">x</span>'+
							'</div>'
						);

					}else{

						$('body').prepend(''+
							'<div class="shine-message">'+
									'<h1>' + message.title + '</h1>'+
									'<div class="shine-message-body">' +  message.message + '</div>'+
									'<span class="message-close">x</span>'+
							'</div>'
						);

					}

					currentSettings.message = message.title;

					chrome.storage.sync.set({"shine": currentSettings});

				}

			},
			error: function(request, status, message) {
				console.log(request);
				console.log(status);
				console.log(message);
			}
		});


		$('body').on('click','.message-close', function(){

				$('.shine-message').remove();

		});


	}else{

		// if we're not on a content page, then load SHINE's default interface

		$('html').addClass("shine-default shine-ready");

		$.getScript( chrome.extension.getURL("shine-default.js") );


	}












	// remove subreddit styling

	headLinks = $('head link');

	for(i = 0;i<headLinks.length;i++){
		
		if( $(headLinks[i]).attr("title") == "applied_subreddit_stylesheet" ){
			
			subredditCss = $(headLinks[i]).attr("href");

			$(headLinks[i]).remove();

		}

	}

	/*

	function endsWith(str, suffix) {
    	return str.indexOf(suffix, str.length - suffix.length) !== -1;
	}

	subredditCss = "";
	headLinks = $('head link');

	headerStyling = "";
	headerBottomLeftStyling = "";

	flairCSS = "";

	for(i = 0;i<headLinks.length;i++){
		
		if( $(headLinks[i]).attr("title") == "applied_subreddit_stylesheet" ){
			
			subredditCss = $(headLinks[i]).attr("href");

			$(headLinks[i]).remove();

		}

	}


	if( subredditCss != "" ){

		$.ajax({
	        type: "GET",
	        dataType: 'html',
	        data: 'url=' + subredditCss,
	        url: 'https://www.madewithgusto.com/SHINE-subreddit.php',
	        success: function(data){            

	            var parser = new cssjs();
				var sheet = parser.parseCSS(data);

				for( i = 0; i < sheet.length; i++ ){

					if( sheet[i].selector != undefined && sheet[i].selector != "" ){

						if( endsWith(sheet[i].selector, "#header") ){

							for( j = 0; j < sheet[i].rules.length; j++ ){

								headerStyling = headerStyling + sheet[i].rules[j].directive + ":" + sheet[i].rules[j].value + ";";

							}

						}

						if( endsWith(sheet[i].selector, "#header-bottom-left") ){

							for( j = 0; j < sheet[i].rules.length; j++ ){

								headerBottomLeftStyling = headerBottomLeftStyling + sheet[i].rules[j].directive + ":" + sheet[i].rules[j].value + ";";

							}

						}

						if( sheet[i].selector.indexOf("flair") != -1 ){

							theRules = "";

							for( r = 0; r < sheet[i].rules.length; r ++ ){

								theRules = theRules + sheet[i].rules[r].directive + ":" + sheet[i].rules[r].value + ";";

							}

							flairCSS = flairCSS + sheet[i].selector + "{" + theRules + "} ";

						}

					}

				}

				$('#header').after("<div id='shine-subreddit-header' style='" + headerStyling + "'></div>");
				$('#shine-subreddit-header').append("<div id='shine-subreddit-header-bottom-left' style='" + headerBottomLeftStyling + "'></div>");

				$('head').append('<style type="text/css">' + flairCSS + '</style>');

	        },
	        error: function(){
	            // Boo! Handle the error.
	        }
	    }); 

	}

	*/
	

	

	















	//braintree form
	$('body').append(''+
		'<div class="shine-bright-panel">'+
			'<div class="shine-bright-details">'+
				'<div class="shine-bright-login">'+
					'<h2>Shine Bright Login</h2>'+
					'<label><span>Email</span><input id="shine-login-e" type="text" /></label>'+
					'<label><span>Password</span><input id="shine-login-p" type="text" /></label>'+
					'<span id="shine-forgot">Forgot Password?</span>'+
					'<input value="Make It So" type="submit" id="shine-bright-login" />'+
					'<div id="login-message">&nbsp;</div>'+
				'</div>'+
				'<div class="shine-forgot-password" style="display:none;">'+
					'<h2>Forgot Password</h2>'+
					'<label><span>Email</span><input id="shine-forgot-e" type="text" /></label>'+
					'<span id="shine-go-back-to-login">Actually, I remember now.</span>'+
					'<input value="Remind Me" type="submit" id="shine-remind-me" />'+
					'<div id="forgot-message">&nbsp;</div>'+
				'</div>'+
				'<div class="shine-why-bright">'+
					'<h2>What Shine Bright Includes<span><a target="_blank" href="https://www.reddit.com/r/shine/comments/3m4lv5/whats_the_deal_with_shine_bright/">Full Details</a> | <a class="bright-login-switch">Login</a></span></h2>'+
					'<div class="bright-cycle">'+
						'<div class="bright-info">'+
							'<img src="' + chrome.extension.getURL("shine01.jpg") + '" />'+
							'<p><strong>Night Mode</strong>You can activate a beautiful dark night mode in the Shine settings panel.</p>'+
						'</div>'+
						'<div class="bright-info">'+
							'<img src="' + chrome.extension.getURL("shine02.jpg") + '" />'+
							'<p><strong>Inline Media Viewing</strong>When you click the buttons associated with images and video, the content displays on the side, not in a new tab :)</p>'+
						'</div>'+
						'<div class="bright-info">'+
							'<img src="' + chrome.extension.getURL("shine03.jpg") + '" />'+
							'<p><strong>Alternate List View</strong>This is what the interface looks like if you choose to have the content display on the right.</p>'+
						'</div>'+
						'<div class="bright-info">'+
							'<img src="' + chrome.extension.getURL("shine04.jpg") + '" />'+
							'<p><strong>Default Settings</strong>Here you can change what your default view is, toggle Night Mode, Show or Hide the subreddits bar at the top, and you can also manage which subreddits and multireddits use which view.</p>'+
						'</div>'+
						'<div class="bright-info">'+
							'<img src="' + chrome.extension.getURL("shine05.jpg") + '" />'+
							'<p><strong>Grid Settings</strong>Here you can manage how many columns the grid view has, and wether or not to show NSFW content automatically or not.</p>'+
						'</div>'+
						'<div class="bright-info">'+
							'<img src="' + chrome.extension.getURL("shine06.jpg") + '" />'+
							'<p><strong>List Settings</strong>You can choose where you want the content to display in the List View, below each post, or to the right of the list.</p>'+
						'</div>'+
					'</div>'+
					'<div class="bright-footer">'+
						'<div class="bright-contact">Email: <a href="mailto:shine@madewithgusto.com">shine@madewithgusto.com</a><br />Phone: (234) 564-8786</div>'+
						'<div class="bright-policies"><a target="_blank" href="https://www.madewithgusto.com/SHINE-returns.php">Return Policy</a> | <a target="_blank" href="https://www.madewithgusto.com/SHINE-privacy.php">Privacy Policy</a></div>'+
					'</div>'+
				'</div>'+
			'</div>'+
			'<form id="checkout" method="post" action="/checkout" autocomplete="off">'+
				'<h2>Get Shine Bright</h2>'+
				'<p>We are continuing to work hard on new features and improvements, and when you purchase a Shine Bright account, it absolutely helps motivate us to continue. Please fill out the form below, and choose how much you want to spend on a Shine Bright account. We appreciate anything and everything from the bottom of our hearts!</p>'+
				'<div id="payment-form"></div>'+
				'<label>'+
					'<span>Email Address</span>'+
					'<input type="text" id="shine_e" autocomplete="off" />'+
				'</label>'+
				'<label>'+
					'<span>Password</span>'+
					'<input type="text" id="shine_p" autocomplete="off" />'+
					'<em>Your password must be at least 4 characters long.</em>'+
				'</label>'+
                '<select id="shine-bright-price-picker">'+
                     '<option value="1.99">$1.99</option>'+
                     '<option value="2.99">$2.99</option>'+
                     '<option value="4.99">$4.99</option>'+
                     '<option value="9.99">$9.99</option>'+
                     '<option value="15">$15</option>'+
                     '<option value="50">$50</option>'+
                     '<option value="100">$100</option>'+
                '</select>'+
				'<input id="braintree-submit" type="submit" value="Get Shine Bright for $1.99">'+
			'</form>'+
			'<div class="shining-bright">'+
				'<div id="sunburst"><img src="' + chrome.extension.getURL("sunburst.png") + '" /></div>'+
				'<h1>You did it!</h1>'+
				"<p>You've just unlocked the best way to experience all the delicious content reddit has to offer. You'll also have first access to all the sweet new features we'll be adding over the months and years to come. We are now massively in your debt and appreciate you supporting the hard work we've put into building SHINE. If you have any feedback or questions for us, please feel free to post in <a target='_blank' href='/r/shine'>/r/shine</a> or email us at <a target='_blank' href='mailto:shine@madewithgusto.com'>shine@madewithgusto.com</a></p><p><i>May the force be with you.</i></p><p>-The SHINE team at Gusto Creative House</p>"+
				'<div id="shine-bright-logout">Logout of Shine Bright <img src="' + chrome.extension.getURL("logout.svg") + '" /></div>'+
			'</div>'+
		'</div>'
	);




	$('.bright-cycle').cycle({
		'slides':'> div.bright-info',
		'pager':'.cycle-pager',
		'auto-height': true,
		'timeout': 6000
	});
	
	$('.bright-login-switch').click(function(){

		$('.shine-why-bright').remove();

	});
    
    $('#shine-bright-price-picker').change(function(){
       
        $('#braintree-submit').val("Get Shine Bright for $" + $(this).val() );
        
    });



	function validateEmail(email) {
	    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
	    return re.test(email);
	}	

	$('body').on('click','#braintree-submit',function(e){

		if( validateEmail( $('#shine_e').val() ) && $('#shine_p').val().length >= 4 ){

			// JUST DO IT

		}else{

			if( validateEmail( $('#shine_e').val() ) == false ){

				$('#shine_e').parents('label').addClass("notvalid");

			}else{

				$('#shine_e').parents('label').removeClass("notvalid");				

			}

			if( $('#shine_p').val().length < 4 ){

				$('#shine_p').parents('label').addClass("notvalid");

			}else{

				$('#shine_p').parents('label').removeClass("notvalid");				

			}

			e.preventDefault();
			e.stopPropagation();
			return false;

		}		

	});

	$('body').on('focus blur keydown keyup','#shine_e, #shine_p',function(){

		if( $(this).val() != "" ){
			$(this).parents('label').addClass("hastext");
		}else{
			$(this).parents('label').removeClass("hastext");
		}

		if( validateEmail( $('#shine_e').val() ) ){

			$('#shine_e').parents('label').removeClass("notvalid");

		}

		if( $('#shine_p').val().length >= 4 ){

			$('#shine_p').parents('label').removeClass("notvalid");

		}

	});

	$('body').on('click','#shine-bright-login',function(){

		if( validateEmail( $('#shine-login-e').val() ) && $('#shine-login-p').val().length >= 4 ){

			$.ajax({
				url: "https://www.madewithgusto.com/SHINE-customer.php",
				data: {
					customerEmail:$('#shine-login-e').val(),
					customerPassword:$('#shine-login-p').val()
				},
				type: 'POST',
				success: function(customerdata) {

					if(IsJsonString(customerdata)){

						customerdata = JSON.parse(customerdata);

						if( customerdata.status == "shinebright" ){

							currentSettings.account.email = $('#shine-login-e').val();
							currentSettings.account.password = $('#shine-login-p').val();

							currentSettings.account.status = customerdata.status;
							currentSettings.account.lastchecked = todayIs;

							chrome.storage.sync.set({"shine": currentSettings}, function(){

								window.location.hash = "shinebright";
								location.reload();

							});

						}else{

							$('#login-message').html("Sorry there's no account with that email and password.");

						}

					}else{

						$('#login-message').html("Sorry there was a problem connecting to our server.");

					}

				},
				error: function(request, status, message) {
					console.log(request);
					console.log(status);
					console.log(message);

					$('#login-message').html("Sorry there was a problem connecting to our server.");
				}
			});

		}else{

			$('#login-message').html("Please fill out both fields correctly.");

		}

	});

	$('#shine-bright-logout').click(function(){

		currentSettings.account.email = "default@default.com";
		currentSettings.account.password = "default";

		currentSettings.account.status = "shinelight";
		currentSettings.account.lastchecked = "";

		chrome.storage.sync.set({"shine": currentSettings}, function(){

			window.location.hash = "shinebright";
			location.reload();

		});

	});

	$('body').on('click','#shine-forgot', function(){

		$('.shine-bright-login').css("display","none");
		$('.shine-forgot-password').css("display","block");

	});

	$('#shine-go-back-to-login').click(function(){

		$('.shine-bright-login').css("display","block");
		$('.shine-forgot-password').css("display","none");

	});

	$('#shine-remind-me').click(function(){

		if( validateEmail( $('#shine-forgot-e').val() ) ){

			$.ajax({
				url: "https://www.madewithgusto.com/SHINE-forgot.php",
				data: {
					customerEmail:$('#shine-forgot-e').val()
				},
				type: 'POST',
				success: function(data) {

					$('#forgot-message').html(data);

				},
				error: function(request, status, message) {
					console.log(request);
					console.log(status);
					console.log(message);

					$('#forgot-message').html("Sorry there was a problem connecting to our server.");
				}
			});

		}else{

			$('#forgot-message').html("Please enter a valid email address");

		}

	});

	$('body').on('click','.shine-prompt', function(e){

		$('html').addClass("show-shine-bright");

		e.preventDefault();
		e.stopPropagation();
		return false;

	});

	$('#shine-login-e, #shine-login-p').keyup(function(e){

		if( e.which == 13 ){

			$('#shine-bright-login').click();

		}

	});

	$('#shine-forgot-e').keyup(function(e){

		if( e.which == 13 ){

			$('#shine-remind-me').click();

		}

	});
















	$('html').addClass("SHINE");


} // end SHINE function

















// this is the function that gets our settings
// this will go get our settings, and then once we've returned everything
// call our SHINE() function to kick off the sexy interface

function getSettings(){

	chrome.storage.sync.get("shine", function (data) {

		// if we don't have stored settings, store default then call this function again
		if( data.shine == undefined || data.shine == "" ){

			chrome.storage.sync.set({"shine": defaultSettings});

	   		getSettings();

		}else{

			// set our currentSettings variable to whatever was stored
			currentSettings = data.shine;

			// have we checked if we're a paying customer today?
			if( todayIs != currentSettings.account.lastchecked ){

				// no? okay lets go check
				$.ajax({
					url: "https://www.madewithgusto.com/SHINE-customer.php",
					data: {
						customerEmail:currentSettings.account.email,
						customerPassword:currentSettings.account.password
					},
					type: 'POST',
					success: function(customerdata) {

						if(IsJsonString(customerdata)){

							customerdata = JSON.parse(customerdata);

							currentSettings.account.status = customerdata.status;
							currentSettings.account.lastchecked = todayIs;
							chrome.storage.sync.set({"shine": currentSettings});

							SHINE();

						}else{

							$('html').addClass("shine-connection-problem");

							SHINE();

						}

					},
					error: function(request, status, message) {
						console.log(request);
						console.log(status);
						console.log(message);

						SHINE();
					}
				});

			}else{

				//we have check today, please continue
				SHINE();

			}

		}

	});

}

getSettings();
























/* INTERFACE ACTIONS */

function resetInterfaces(){

	$('html').removeClass("expanding");
	$('html').removeClass("expand-images");
	$('html').removeClass("expand-youtubes");
	$('html').removeClass("expand-html5s");
	$('html').removeClass("expand-albums");
	$('html').removeClass("show-search");
	$('html').removeClass("show-submit");
	$('html').removeClass("expand-comments");
	$('html').removeClass("show-shine-bright");
	$('.shine-grid .shine-expand .large-image').html("");
	$('.shine-grid .shine-expand .large-image').css("background-image","");
	$('.shine-grid .shine-expand .large-youtube').html("");
	$('.shine-grid .shine-expand .large-html5').html("");
	$('.shine-grid .shine-expand .large-album').html("");
	$('.shine-grid .shine-expand .album-thumbnails').html("");
	$('.shine-grid .shine-expand .side-comments').html("");
	$('html').removeClass("show-settings");
	$('html').removeClass("shine-hide-children");

}

$('body').on('click','.dark-background', function(){

	resetInterfaces();

});

$('body').on('click','.shine-navicon',function(){

	resetInterfaces();

});

$('body').on('click','.shine-sidebar', function(){

	if( $('html').hasClass("show-sidebar") ){

		currentSettings.global.sidebar = "";

		chrome.storage.sync.set({"shine": currentSettings});

		resetInterfaces();

		$('html').removeClass("show-sidebar");

	}else{

		currentSettings.global.sidebar = "show-sidebar";

		chrome.storage.sync.set({"shine": currentSettings});

		resetInterfaces();

		$('html').addClass("show-sidebar");

	}

});

$('body').on('click','.shine-search', function(){

	resetInterfaces();

	$('html').addClass("show-search");

	$('#shine-search-box').focus();

});

$('body').on('click','.shine-multi', function(){

	if( $('html').hasClass("show-multireddits") ){

		currentSettings.global.multis = "";

		chrome.storage.sync.set({"shine": currentSettings});

		resetInterfaces();

		$('html').removeClass("show-multireddits");

	}else{

		currentSettings.global.multis = "show-multireddits";

		chrome.storage.sync.set({"shine": currentSettings});

		resetInterfaces();

		$('html').addClass("show-multireddits");

	}

});

$('body').on('click','.shine-bright-nav', function(){

	resetInterfaces();
	$('html').toggleClass("show-shine-bright");

});
















// ALL THE SETTINGS STUFF

function saveSettingsMessage(){

	$('html').addClass("settings-are-saved");
	setTimeout("jQuery('html').removeClass('settings-are-saved')", 2000);		

}

$('body').on('click','.shine-settings', function(){

	resetInterfaces();
	$('html').toggleClass("show-settings");

});


$('body').on('click','.settings-panel .tab',function(){

	$('.settings-panel .panel').removeClass("panel-active");
	$( $(this).data("settings-panel") ).addClass("panel-active");

	$('.tab').removeClass("tab-active");
	$(this).addClass("tab-active");

});

$('body').on('change','#settings-analytics', function(){

	currentSettings.global.analytics = $(this).val();

	chrome.storage.sync.set({"shine": currentSettings}, function(){

		saveSettingsMessage();

	});

});

$('body').on('change','#settings-default-view', function(){

	currentSettings.global.layout = $(this).val();

	chrome.storage.sync.set({"shine": currentSettings}, function(){

		saveSettingsMessage();

	});

});


$('body').on('change','#settings-shortcuts-bar', function(){

	currentSettings.global.shortcuts = $(this).val();

	chrome.storage.sync.set({"shine": currentSettings}, function(){

		if( currentSettings.global.shortcuts == "show" ){

			$('html').addClass("show-shortcuts");

		}else{

			$('html').removeClass("show-shortcuts");

		}

		saveSettingsMessage();

	});

});


$('body').on('change','#settings-list-layout', function(){

	currentSettings.list.columns = $(this).val();

	chrome.storage.sync.set({"shine": currentSettings}, function(){

		if( currentSettings.list.columns == "two" && $('html').hasClass("shine-list") ){

			$('html').addClass("shine-list-classic");
			$('html').removeClass("shine-split-7030 shine-split-6040 shine-split-5050 shine-split-4060 shine-split-3070");

		}

		if( currentSettings.list.columns == "one" ){

			$('html').removeClass("shine-list-classic");
			$('html').addClass("shine-split-" + currentSettings.list.split);

		}

		saveSettingsMessage();

	});

});


$('body').on('change','#settings-grid-split', function(){

	currentSettings.grid.split = $(this).val();

	chrome.storage.sync.set({"shine": currentSettings}, function(){
		
		if( $('html').hasClass("shine-grid") ){

			$('html').removeClass("shine-split-7030 shine-split-6040 shine-split-5050 shine-split-4060 shine-split-3070");
			
			$('html').addClass("shine-split-" + currentSettings.grid.split);
		
		}

		saveSettingsMessage();

	});

});

$('body').on('change','#settings-list-split', function(){

	currentSettings.list.split = $(this).val();

	chrome.storage.sync.set({"shine": currentSettings}, function(){
		
		if( $('html').hasClass("shine-list") && !$('html').hasClass("shine-list-classic") ){

			$('html').removeClass("shine-split-7030 shine-split-6040 shine-split-5050 shine-split-4060 shine-split-3070");
			
			$('html').addClass("shine-split-" + currentSettings.list.split);
			
		}

		saveSettingsMessage();

	});

});


// CLICKING THE GRID VIEW SWITCHER

$('body').on('click','.grid-switch', function(){

	if( $('body').hasClass("front-page") ){

		currentSettings.global.layout = "grid";

	}else if( $('.pagename a').attr("href").indexOf("/r/") != -1 ) {

		// we're in a subreddit
		if( currentSettings.subreddits.length > 0 ){

			foundIt = false;

			for(i = 0; i < currentSettings.subreddits.length; i++){

				urlToCheck = currentSettings.subreddits[i].url;

				if( $('.pagename a').attr("href").indexOf( urlToCheck ) != -1 ){

					currentSettings.subreddits[i].layout = "grid";
					foundIt = true;
					break;

				}

			}

			if( foundIt == false ){

				defaultToAdd = {"url" : $('.pagename a').attr("href").replace("https://","").replace("http://","") , "layout" : "grid"};

				currentSettings.subreddits.push( defaultToAdd );

			}

		}else{

			defaultToAdd = {"url" : $('.pagename a').attr("href").replace("https://","").replace("http://","") , "layout" : "grid"};

			currentSettings.subreddits.push( defaultToAdd );

		}

	}else if( $('.pagename a').attr("href").indexOf("/m/") != -1 ){

		// we're in a multireddit
		if( currentSettings.multireddits.length > 0 ){

			foundIt = false;

			for(i = 0; i < currentSettings.multireddits.length; i++){

				urlToCheck = currentSettings.multireddits[i].url;

				if( $('.pagename a').attr("href").indexOf( urlToCheck ) != -1 ){

					currentSettings.multireddits[i].layout = "grid";
					foundIt = true;
					break;

				}

			}

			if( foundIt == false ){

				defaultToAdd = {"url" : $('.pagename a').attr("href").replace("https://","").replace("http://","") , "layout" : "grid"};

				currentSettings.multireddits.push( defaultToAdd );

			}

		}else{

			defaultToAdd = {"url" : $('.pagename a').attr("href").replace("https://","").replace("http://","") , "layout" : "grid"};

			currentSettings.multireddits.push( defaultToAdd );

		}

	}

	chrome.storage.sync.set({"shine": currentSettings}, function(){

		location.reload();

	});

});

// CLICKING THE LIST VIEW SWITCHER

$('body').on('click','.list-switch', function(){

	if( $('body').hasClass("front-page") ){

		currentSettings.global.layout = "list";

	}else if( $('.pagename a').attr("href").indexOf("/r/") != -1 ) {

		// we're in a subreddit
		if( currentSettings.subreddits.length > 0 ){

			foundIt = false;

			for(i = 0; i < currentSettings.subreddits.length; i++){

				urlToCheck = currentSettings.subreddits[i].url;

				if( $('.pagename a').attr("href").indexOf( urlToCheck ) != -1 ){

					currentSettings.subreddits[i].layout = "list";
					foundIt = true;
					break;

				}

			}

			if( foundIt == false ){

				defaultToAdd = {"url" : $('.pagename a').attr("href").replace("https://","").replace("http://","") , "layout" : "list"};

				currentSettings.subreddits.push( defaultToAdd );

			}

		}else{

			defaultToAdd = {"url" : $('.pagename a').attr("href").replace("https://","").replace("http://","") , "layout" : "list"};

			currentSettings.subreddits.push( defaultToAdd );

		}

	}else if( $('.pagename a').attr("href").indexOf("/m/") != -1 ){

		// we're in a multireddit
		if( currentSettings.multireddits.length > 0 ){

			foundIt = false;

			for(i = 0; i < currentSettings.multireddits.length; i++){

				urlToCheck = currentSettings.multireddits[i].url;

				if( $('.pagename a').attr("href").indexOf( urlToCheck ) != -1 ){

					currentSettings.multireddits[i].layout = "list";
					foundIt = true;
					break;

				}

			}

			if( foundIt == false ){

				defaultToAdd = {"url" : $('.pagename a').attr("href").replace("https://","").replace("http://","") , "layout" : "list"};

				currentSettings.multireddits.push( defaultToAdd );

			}

		}else{

			defaultToAdd = {"url" : $('.pagename a').attr("href").replace("https://","").replace("http://","") , "layout" : "list"};

			currentSettings.multireddits.push( defaultToAdd );

		}

	}

	chrome.storage.sync.set({"shine": currentSettings}, function(){

		location.reload();

	});

});

// DELETE DEFAULT VIEW BUTTON
$('body').on('click','.remove-subreddit-default',function(){

	for( i = 0; i < currentSettings.subreddits.length; i++ ){

		if( currentSettings.subreddits[i].url == $(this).data("url") ){

			currentSettings.subreddits.splice(i, 1);

			chrome.storage.sync.set({"shine": currentSettings}, function(){

				saveSettingsMessage();

			});

			$(this).parents("li").remove();
		}

	}

});

$('body').on('click','.remove-multireddit-default',function(){

	for( i = 0; i < currentSettings.multireddits.length; i++ ){

		if( currentSettings.multireddits[i].url == $(this).data("url") ){

			currentSettings.multireddits.splice(i, 1);

			chrome.storage.sync.set({"shine": currentSettings}, function(){

				saveSettingsMessage();

			});

			$(this).parents("li").remove();
		}

	}

});


$('body').on('change','#settings-number-columns',function(){

	currentSettings.grid.columns = $(this).val();

	chrome.storage.sync.set({"shine": currentSettings}, function(){

		if( $('html').hasClass("shine-grid") ){

			$('head').find('#shine-card-width').remove();

			thingWidth = screen.width / ( parseInt(currentSettings.grid.columns) + 1);

			$('head').append(''+

				'<style id="shine-card-width" type="text/css">'+
					'html.SHINE.shine-grid body > .content #siteTable .thing{'+
						'width:' + thingWidth + 'px;'+
					'}'+
					'html.SHINE.shine-grid body > .content #siteTable .thing .preview{'+
						'width:' + thingWidth + 'px;'+
						'flex-basis:' + thingWidth + 'px;'+
					'}'+
				'</style>'

			);

		}

		saveSettingsMessage();

	});

});

$('body').on('change','#settings-night-mode',function(){

	if( $(this).val() == "on" ){

		currentSettings.global.night = "on";

		chrome.storage.sync.set({"shine": currentSettings}, function(){

			$('html').addClass("res-nightmode");
			$('body').addClass("res-nightmode");

			saveSettingsMessage();

		});

	}else{

		currentSettings.global.night = "off";

		chrome.storage.sync.set({"shine": currentSettings}, function(){

			$('html').removeClass("res-nightmode");
			$('body').removeClass("res-nightmode");

			saveSettingsMessage();

		});

	}

});

$('body').on('change','#settings-show-nsfw', function(){

	if( $(this).val() == "no" ){

		currentSettings.grid.nsfw = "no";

		chrome.storage.sync.set({"shine": currentSettings}, function(){

			$('html').addClass("shine-hide-nsfw");

			saveSettingsMessage();

		});

	}else{

		currentSettings.grid.nsfw = "yes";

		chrome.storage.sync.set({"shine": currentSettings}, function(){

			$('html').removeClass("shine-hide-nsfw");

			saveSettingsMessage();

		});

	}

});













$('*[data-res-css]').attr("style","");

















/* SHINE LIGHT STUFF */

$(window).scroll(function() {
    if ($(document).scrollTop() > 100) {
        $('html').addClass("shine-scrolling");
    }
    else {
        $('html').removeClass("shine-scrolling");
    }
});