pageContent = {};

$(document).ready(function() {
	for(i=0 ; i<pages.length ; i++) {
		if(pages[i] == "/") pages[i] = "index.html";
		uri = urlPrefix + "/ajax/" + pages[i] + ".json";
		eval("jQuery.get(\""+uri+"\", function(data) { pageContent[\""+uri+"\"] = data;  }.bind(\""+uri+"\"));");
	}
	/*
	page("*", function(context, controller) {
		if(document.location.pathname != context.path  && context.path.substr(context.path.length - 4) != ".JPG" && context.path.substr(context.path.length - 4) != ".jpg") {
			//$(".big-container .container").hide();

			$(".navbar-nav li").removeClass("active");
			if(context.path == "/") context.path = "index.html";
			uri = "/ajax/" + context.path + ".json";
			if(typeof pageContent[uri] == "undefined") {
				jQuery.get(uri, function(data) {
					showContent(data, context);
					pageContent[uri] = data;
				});
			} else {
				showContent(pageContent[uri], context);
			}
		}
	});
	page();
*/
	if($(".navbar-toggle").is(":visible")) {
		$('.nav a').on('click', function(){
		    $(".btn-navbar").click(); //bootstrap 2.x
		    $(".navbar-toggle").click() //bootstrap 3.x by Richard
		});
	};
	pageChange();
	$(".gallery").justifiedGallery({ rowHeight : 180, margins: 3 }).on('jg.complete', function () {
	    $(this).find('a').colorbox({
	        maxWidth : '80%',
	        maxHeight : '80%',
	        opacity : 0.8,
	        transition : 'elastic',
	        current : ''
	    });
	});
});

function showContent(data, context) {
	content = data.content;
	var parent = $(".big-container").parent();
	$("title").html(data.title);
	
	$(".big-container .container").fadeOut(200, function() {
		$(".big-container").remove();
		parent.append(content);
		$(".big-container .container").hide();
		$(".gallery").hide();
		$(".big-container .container").fadeIn(500, function() {
			$(".gallery").justifiedGallery({ rowHeight : 180, margins: 3 });
			$(".gallery").show();
		});	
	});
	

	$(".navbar-nav li").each(function(e, i) {
		if($(i).find("a").attr("href") == context.path) {
			$(i).addClass("active", {duration: 100});
		}
	});
	pageChange();
}


function pageChange() {

	setTimeout(function() {
		$("span.link").each(function(i, e) {
			console.log(e);
			var link = $(e).html();
			$(e).html("<a href='http://"+link+"'>"+link+"</a>");
		});
	}, 400);
}