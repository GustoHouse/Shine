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


/* SHINE BRIGHT STUFF */

function checkBT(){

	if( $('html').hasClass("shine-bt-loaded") ){

		$.ajax({
			url: 'https://www.madewithgusto.com/SHINE-braintree2.php',
			success: function(data){

				braintree.setup(data, "dropin", {
					container: "payment-form",
					paypal: {
						singleUse: true,
						amount: $('#shine-bright-price-picker option:selected').val(),
						currency: 'USD'
					}, 
					onPaymentMethodReceived: function (obj) {
					    
						$.ajax({
							url: "https://www.madewithgusto.com/SHINE-braintree2.php",
							data: {
								nonce:obj.nonce,
                                shine_amount: $('#shine-bright-price-picker option:selected').val(),
								shine_email: $('#shine_e').val(),
								shine_password: $('#shine_p').val()
							},
							type: 'POST',
							success: function(accountdata) {

								accountdata = JSON.parse(accountdata);

								if( accountdata.result != "braintreeerror" && accountdata.result != "mysqlerror" ){

									ga('send', 'event', 'PURCHASED' , 'Shine Bright' , window.location.href.replace("https://","") );
								
									$('#shine-login-e').val( $('#shine_e').val() );
									$('#shine-login-p').val( $('#shine_p').val() );

									$('#shine-bright-login').click();

								}else if( accountdata.result == "braintreeerror" ){

									alert('Sorry about this, but there was a problem processing your payment information. Please try a different payment method. If this continues happening please contact us at shine@madewithgusto.com');

								}else if( accountdata.result == "mysqlerror" ){

									alert('Well we were able to process your payment just fine, but it looks like there was a problem conntecting to our databse. Please contact us at shine@madewithgusto.com and we can get your Shine Bright account set up.');

								}else{
                                    
                                    alert('Looks like something went wrong when trying to set up your account, please contact us at shine@madewithgusto.com if this continues to happen.')
                                    
                                }

							},
							error: function(request, status, message) {
								console.log(request);
								console.log(status);
								console.log(message);
							}
						});

					}
				});

			}
		});

	}else{

		setTimeout(checkBT, 1000);
	}

}

checkBT();