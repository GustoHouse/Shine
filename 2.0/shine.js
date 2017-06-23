// remove subreddit styling

subredditCss = "";
headLinks = $('head link');

for(i = 0;i<headLinks.length;i++){
    
    if( $(headLinks[i]).attr("title") == "applied_subreddit_stylesheet" ){
        
        subredditCss = $(headLinks[i]).attr("href");

        $(headLinks[i]).remove();

    }

}