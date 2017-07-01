// creating the settings variable to use when we update and save settings
var currentSettings = {};

// creating the default settings variable if they havn't saved any settings yet
var defaultSettings = {"global" : {"layout" : "list", "shortcuts" : "show", "night" : "off", "analytics" : "shine-analytics-optin", "sidebar" : "", "ratio" : "60/40"},

    "list" :  {},

    "split" : {},

    "grid" :  {"width" : "20%", "nsfw" : "no"},

    "account" : {"status" : "shinelight"},

    "message" : "Welcome to Shine 2.0!"

};














// MISC GLOBAL THINGS

$('html').addClass("shine");

// remove subreddit styling

subredditCss = "";
headLinks = $('head link');

for(i = 0;i<headLinks.length;i++){
    
    if( $(headLinks[i]).attr("title") == "applied_subreddit_stylesheet" ){
        
        subredditCss = $(headLinks[i]).attr("href");

        $(headLinks[i]).remove();

    }

}

// header hiding and showing on scroll

var lastScrollTop = 0;
$(window).scroll(function(event){
   var st = $(this).scrollTop();
   if (st > lastScrollTop){
        $('body').addClass("hide-header");
   } else {
        $('body').removeClass("hide-header");
   }
   lastScrollTop = st;
});



















// MAIN SHINE FUNCTION

function SHINE(){

    // this makes sure we're on the home page, a subreddit, or a multireddit
	if( $('body').hasClass("listing-page") && !$('body').hasClass("profile-page") && $('#header-bottom-left .pagename').html() != "preferences" && !$('body').hasClass("subreddits-page") ){

        // time to load JS
        $.getScript( chrome.extension.getURL("jquery.zoom.min.js") );
        $.getScript( chrome.extension.getURL("shine-content.js") );

        if( currentSettings.global.layout == "list" ){

            $('html').addClass("shine-list");
			$.getScript( chrome.extension.getURL("shine-list.js") );

        }else if( currentSettings.global.layout == "split"){

            $('html').addClass("shine-list shine-split");
            $.getScript( chrome.extension.getURL("shine-list.js") );

        }else if( currentSettings.global.layout == "grid"){

            $('html').addClass("shine-grid");
			$.getScript( chrome.extension.getURL("shine-grid.js") );

        }
    
    // else if we're not on home, subreddit, or multireddit
    }else{

		// if we're not on a content page, then load SHINE's default interface

		$('html').addClass("shine-default shine-ready");

        $.getScript( chrome.extension.getURL("jquery.zoom.min.js") );
		$.getScript( chrome.extension.getURL("shine-default.js") );

	}

}



















// GET SETTINGS AND SHINE IT UP

function getSettings(){

	chrome.storage.sync.get("shine", function (data) {

		// if we don't have stored settings, store default then call this function again
		if( data.shine == undefined || data.shine == "" ){

			chrome.storage.sync.set({"shine": defaultSettings});

	   		getSettings();

		}else{

			// set our currentSettings variable to whatever was stored
			currentSettings = data.shine;

			SHINE();

		}

	});

}

getSettings();