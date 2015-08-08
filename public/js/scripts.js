(function() {

	'use strict';

	/*  
	  Load JSON file
	*/

	var xobj = new XMLHttpRequest();

	xobj.overrideMimeType("application/json");
	xobj.open('GET', 'nav.json', true);
	xobj.send(null);

	xobj.onreadystatechange = function () {

		if (xobj.readyState == 4 && xobj.status == "200") {

			drowMenu(xobj.responseText);

		}
	};

	/*  
	  drow menu from JSON file
	*/

	function drowMenu(dataJson) {

		var dataJson = JSON.parse(dataJson);
		var nav = document.getElementsByClassName("nav");
		var a = 0;

		for (var i = 0; i < dataJson.items.length; i++) {
			nav[0].innerHTML += '<li><a></a></li>';
			var listMenu = nav[0].querySelectorAll(".nav>li");
			var link = nav[0].querySelectorAll(".nav>li>a");
			link[i].href = dataJson.items[i].url;
			link[i].innerHTML = dataJson.items[i].label;

			if(dataJson.items[i].items != 0){

				listMenu[i].className = 'subNav';
				listMenu[i].innerHTML += '<ul></ul>';
				var subNav = nav[0].querySelectorAll(".nav>li.subNav ul");

				for (var j =0; j < dataJson.items[i].items.length; j++) { 
					subNav[a].innerHTML  += '<li><a></a></li>';
					var sublink = subNav[a].querySelectorAll("a");
					sublink[j].href= dataJson.items[i].items[j].url;
					sublink[j].innerHTML = dataJson.items[i].items[j].label;
				};

				a++;
			}
		}



		var header = document.querySelectorAll("header");
		var main = document.querySelectorAll("#hero");
		var allList = document.querySelectorAll("nav ul li a");
		var overlay =document.getElementsByClassName("overlay");

		/*
			Hamburger button
		*/

		var mobileBtn = document.querySelectorAll(".mobileBtn");
		var isOpen = false;
		mobileBtn[0].onclick = function (event) {
			event.preventDefault();
			overlay[0].classList.remove("isOpen");
			if(isOpen){
				header[0].classList.remove("isOpen");
		    	main[0].classList.remove("isOpen");
		    	overlay[0].classList.remove("isOpen");
		    	isOpen = false;
		    } else {
				header[0].classList.add("isOpen");
				main[0].classList.add("isOpen");
				overlay[0].classList.add("isOpen");
		    	isOpen = true;
		    }      
		}


		for (var i = 0; i < allList.length; i++) { 			
			allList[i].onclick = function (event) {

				for (var j = 0; j < allList.length; j++) { 
					if(allList[j].nextElementSibling != null){
						allList[j].nextElementSibling.style.display = "none";
						allList[j].parentNode.classList.remove("menuOpen");
					}	
				}
				if(this.nextElementSibling != null){
					this.nextElementSibling.style.display = "block";
					overlay[0].classList.add("isOpen");
					this.parentNode.classList.add("menuOpen");
				} else {						
					overlay[0].classList.remove("isOpen");
				}
			};
		}

		/*
			overlay click
		*/

		overlay[0].onclick = function () { 
			header[0].classList.remove("isOpen");
			main[0].classList.remove("isOpen");
			overlay[0].classList.remove("isOpen");
			open = false;
			for (var i = 0; i < allList.length; i++) { 
				if(allList[i].nextElementSibling != null){
					allList[i].nextElementSibling.style.display = "none";
					allList[i].parentNode.classList.remove("menuOpen");
				}	
			}
		}
	}

})();



