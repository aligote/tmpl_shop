(function() {
	
	'use strict';
	
	function httpGet(url) {
		return new Promise(function(resolve, reject) {
			
			var xhr = new XMLHttpRequest();
			xhr.open('GET', url, true);
			
			xhr.onload = function() {
				if(this.status >= 200 && this.status < 400) {
					console.log('xhr status: ' + this.status);
					resolve(this.response);
				} else {
					var error = new Error(this.statusText);
        			error.code = this.status;
        			reject(error);
				}
			}
			
			xhr.onerror = function() {
				reject(new Error("Network Error"));
			};

			xhr.send();
			
		});
	}
	
	httpGet('../comm.json')
		.then(function(val) {
			let data = JSON.parse(val);
			return document.querySelector('.comm').innerHTML = hbsTemplates.comments(data);
		})
		.catch(function(error) {
			console.log('Rejected: ' + error)
		});
	
	
})(console.log('hhr loaded'));