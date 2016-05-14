if( !$('html').hasClass("shine-analytics-optout") ){

	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

	ga('create', 'UA-54728545-4', 'auto');
	ga('send', 'pageview', { 'page': window.location.href.replace("https://","") , 'title': document.title });

	// Analytics What's Been Loaded
	ga('send', 'event', 'LOAD' , 'DEFAULT VIEW' , window.location.href.replace("https://","") );

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