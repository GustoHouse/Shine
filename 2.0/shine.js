// creating the settings variable to use when we update and save settings
var currentSettings = {};

// creating the default settings variable if they havn't saved any settings yet
var defaultSettings = {"global" : {"layout" : "list", "shortcuts" : "show", "night" : "off", "analytics" : "shine-analytics-optin", "sidebar" : ""},

    "list" :  {"split" : "6040"},

    "split" : {"split" : "5050"},

    "grid" :  {"width" : "20%", "nsfw" : "no", "split" : "6040"},

    "subreddits" : [
    	{"url" : "www.reddit.com/r/shine/", "layout" : "list"},
    	{"url" : "www.reddit.com/r/aww/", "layout" : "grid"},
    	{"url" : "www.reddit.com/r/earthporn/", "layout" : "list"}
    ],

    "multireddits" : [
    	{"url" : "www.reddit.com/user/evilnight/m/redditunes", "layout" : "grid"},
    	{"url" : "www.reddit.com/user/Abbigale221/m/moviesandtv", "layout" : "list"}
    ],

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

            }

        }

        // if whichView is still blank, use the default layout
        if( whichView == "" ){

            whichView = currentSettings.global.layout;

        }
        
        // time to load JS
        $.getScript( chrome.extension.getURL("jquery.zoom.min.js") );
        $.getScript( chrome.extension.getURL("shine-content.js") );

        if( whichView == "list" ){

            $('html').addClass("shine-list");
			$.getScript( chrome.extension.getURL("shine-list.js") );

        }else if( whichView == "split" ){

            $('html').addClass("shine-list shine-split");
            $.getScript( chrome.extension.getURL("shine-list.js") );

        }else if( whichView == "grid" ){

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