//=============== PLUGINS ================
/*

Title:		jShowOff: a jQuery Content Rotator Plugin
Author:		Erik Kallevig
Version:	0.1.2
Website:	http://ekallevig.com/jshowoff
License: 	Dual licensed under the MIT and GPL licenses.

*/

(function($){$.fn.jshowoff=function(settings){var config={animatePause:true,autoPlay:true,changeSpeed:600,controls:true,controlText:{play:'Play',pause:'Pause',next:'Next',previous:'Previous'},effect:'fade',hoverPause:true,links:true,speed:3000};if(settings)$.extend(true,config,settings);if(config.speed<(config.changeSpeed+20)){alert('jShowOff: Make speed at least 20ms longer than changeSpeed; the fades aren\'t always right on time.');return this;};this.each(function(i){var $cont=$(this);var gallery=$(this).children().remove();var timer='';var counter=0;var preloadedImg=[];var howManyInstances=$('.jshowoff').length+1;var uniqueClass='jshowoff-'+howManyInstances;var cssClass=config.cssClass!=undefined?config.cssClass:'';$cont.css('position','relative').wrap('<div class="jshowoff '+uniqueClass+'" />');var $wrap=$('.'+uniqueClass);$wrap.css('position','relative').addClass(cssClass);$(gallery[0]).clone().appendTo($cont);preloadImg();if(config.controls){addControls();if(config.autoPlay==false){$('.'+uniqueClass+'-play').addClass(uniqueClass+'-paused jshowoff-paused').text(config.controlText.play);};};if(config.links){addSlideLinks();$('.'+uniqueClass+'-slidelinks a').eq(0).addClass(uniqueClass+'-active jshowoff-active');};if(config.hoverPause){$cont.hover(function(){if(isPlaying())pause('hover');},function(){if(isPlaying())play('hover');});};if(config.autoPlay&&gallery.length>1){timer=setInterval(function(){play();},config.speed);};if(gallery.length<1){$('.'+uniqueClass).append('<p>For jShowOff to work, the container element must have child elements.</p>');};function transitionTo(gallery,index){var oldCounter=counter;if((counter>=gallery.length)||(index>=gallery.length)){counter=0;var e2b=true;}
else if((counter<0)||(index<0)){counter=gallery.length-1;var b2e=true;}
else{counter=index;}
if(config.effect=='slideLeft'){var newSlideDir,oldSlideDir;function slideDir(dir){newSlideDir=dir=='right'?'left':'right';oldSlideDir=dir=='left'?'left':'right';};counter>=oldCounter?slideDir('left'):slideDir('right');$(gallery[counter]).clone().appendTo($cont).slideIt({direction:newSlideDir,changeSpeed:config.changeSpeed});if($cont.children().length>1){$cont.children().eq(0).css('position','absolute').slideIt({direction:oldSlideDir,showHide:'hide',changeSpeed:config.changeSpeed},function(){$(this).remove();});};}else if(config.effect=='fade'){$(gallery[counter]).clone().appendTo($cont).hide().fadeIn(config.changeSpeed,function(){if($.browser.msie)this.style.removeAttribute('filter');});if($cont.children().length>1){$cont.children().eq(0).css('position','absolute').fadeOut(config.changeSpeed,function(){$(this).remove();});};}else if(config.effect=='none'){$(gallery[counter]).clone().appendTo($cont);if($cont.children().length>1){$cont.children().eq(0).css('position','absolute').remove();};};if(config.links){$('.'+uniqueClass+'-active').removeClass(uniqueClass+'-active jshowoff-active');$('.'+uniqueClass+'-slidelinks a').eq(counter).addClass(uniqueClass+'-active jshowoff-active');};};function isPlaying(){return $('.'+uniqueClass+'-play').hasClass('jshowoff-paused')?false:true;};function play(src){if(!isBusy()){counter++;transitionTo(gallery,counter);if(src=='hover'||!isPlaying()){timer=setInterval(function(){play();},config.speed);}
if(!isPlaying()){$('.'+uniqueClass+'-play').text(config.controlText.pause).removeClass('jshowoff-paused '+uniqueClass+'-paused');}};};function pause(src){clearInterval(timer);if(!src||src=='playBtn')$('.'+uniqueClass+'-play').text(config.controlText.play).addClass('jshowoff-paused '+uniqueClass+'-paused');if(config.animatePause&&src=='playBtn'){$('<p class="'+uniqueClass+'-pausetext jshowoff-pausetext">'+config.controlText.pause+'</p>').css({fontSize:'62%',textAlign:'center',position:'absolute',top:'40%',lineHeight:'100%',width:'100%'}).appendTo($wrap).addClass(uniqueClass+'pauseText').animate({fontSize:'600%',top:'30%',opacity:0},{duration:500,complete:function(){$(this).remove();}});}};function next(){goToAndPause(counter+1);};function previous(){goToAndPause(counter-1);};function isBusy(){return $cont.children().length>1?true:false;};function goToAndPause(index){$cont.children().stop(true,true);if((counter!=index)||((counter==index)&&isBusy())){if(isBusy())$cont.children().eq(0).remove();transitionTo(gallery,index);pause();};};function preloadImg(){$(gallery).each(function(i){$(this).find('img').each(function(i){preloadedImg[i]=$('<img>').attr('src',$(this).attr('src'));});});};function addControls(){$wrap.append('<p class="jshowoff-controls '+uniqueClass+'-controls"><a class="jshowoff-play '+uniqueClass+'-play" href="#null">'+config.controlText.pause+'</a> <a class="jshowoff-prev '+uniqueClass+'-prev" href="#null">'+config.controlText.previous+'</a> <a class="jshowoff-next '+uniqueClass+'-next" href="#null">'+config.controlText.next+'</a></p>');$('.'+uniqueClass+'-controls a').each(function(){if($(this).hasClass('jshowoff-play'))$(this).click(function(){isPlaying()?pause('playBtn'):play();return false;});if($(this).hasClass('jshowoff-prev'))$(this).click(function(){previous();return false;});if($(this).hasClass('jshowoff-next'))$(this).click(function(){next();return false;});});};function addSlideLinks(){$wrap.append('<p class="jshowoff-slidelinks '+uniqueClass+'-slidelinks"></p>');$.each(gallery,function(i,val){var linktext=$(this).attr('title')!=''?$(this).attr('title'):i+1;$('<a class="jshowoff-slidelink-'+i+' '+uniqueClass+'-slidelink-'+i+'" href="#null">'+linktext+'</a>').bind('click',{index:i},function(e){goToAndPause(e.data.index);return false;}).appendTo('.'+uniqueClass+'-slidelinks');});};});return this;};})(jQuery);(function($){$.fn.slideIt=function(settings,callback){var config={direction:'left',showHide:'show',changeSpeed:600};if(settings)$.extend(config,settings);this.each(function(i){$(this).css({left:'auto',right:'auto',top:'auto',bottom:'auto'});var measurement=(config.direction=='left')||(config.direction=='right')?$(this).outerWidth():$(this).outerHeight();var startStyle={};startStyle['position']=$(this).css('position')=='static'?'relative':$(this).css('position');startStyle[config.direction]=(config.showHide=='show')?'-'+measurement+'px':0;var endStyle={};endStyle[config.direction]=config.showHide=='show'?0:'-'+measurement+'px';$(this).css(startStyle).animate(endStyle,config.changeSpeed,callback);});return this;};})(jQuery);


// tabbed section (called on DOMReady)
tabbedSections =  {
	open : function ($el) {
		$el.addClass('active');
		this.$tabbedAreas.eq(this.$tabs.index($el)).show();
	},
	close : function ($el) {
		$el.removeClass('active');
		this.$tabbedAreas.eq(this.$tabs.index($el)).hide();
	},
	init : function ($section) {
		var that = this;
		
		this.$tabs = $section.find('ul.tabs li a');
		this.$tabbedAreas = $section.find('.sub-section');
		
		this.$tabbedAreas.hide();
		this.$tabbedAreas.eq(0).show();
		this.$tabs.eq(0).addClass('active');
		this.$activeTab = this.$tabs.eq(0);
		
		this.$tabs.click(function (e) {
			var $target = $(e.target);
			
			if ($target === that.$activeTab) {
				that.close($target);
				that.$activeTab = null;
			} else {
				if (that.$activeTab !== null) {
					that.close(that.$activeTab);
				}
				that.$activeTab = $target;
				that.open(that.$activeTab);
			}
			
			return false;
		});
	}
};

$(document).ready(function() {
	
	$('a[rel="external"]').click(function(){
		window.open(this.href);
		return false;
	});
	
	$('#js-news').jshowoff({ speed:3500, links: false, animatePause: false });
	
	$('#page-tools').append('<li class="print"><a href="#na">Print</a></li>');
	$('#page-tools .print a').click(function() {
		window.print();
		return false;
	});
	


	//tabs - can be used multiple times on a page
	$('.tab-2, .tab-3').hide();
	
	$('.tab-heading li:first-child a').click(function() {
		$(this).parent().parent().children().children().removeClass('on');
		$(this).addClass('on');
		$(this).parent().parent().parent().nextAll('.tab-2').hide();
		$(this).parent().parent().parent().nextAll('.tab-3').hide();
		$(this).parent().parent().parent().nextAll('.tab-1').show();
		return false;
	});
	$('.tab-heading li:last-child a').click(function() {
		$(this).parent().parent().children().children().removeClass('on');
		$(this).addClass('on');
		$(this).parent().parent().parent().nextAll('.tab-1').hide();
		$(this).parent().parent().parent().nextAll('.tab-3').hide();
		$(this).parent().parent().parent().nextAll('.tab-2').show();
		return false;
	});
	$('.tab-heading li:not(:last-child,:first-child) a').click(function() {
		$(this).parent().parent().children().children().removeClass('on');
		$(this).addClass('on');
		$(this).parent().parent().parent().nextAll('.tab-1').hide();
		$(this).parent().parent().parent().nextAll('.tab-2').hide();
		$(this).parent().parent().parent().nextAll('.tab-3').show();
		return false;
	});
	
	//tabs-big a one off tab
	$('.tab-big-1').hide();
	
	$('.tab-big-1-trigger').click(function() {
		$('.tab-big-2-trigger').removeClass('on');
		$('.tab-big-2').hide();
		$(this).addClass('on');
		$('.tab-big-1').show();
		return false;
	});
	$('.tab-big-2-trigger').click(function() {
		$('.tab-big-1-trigger').removeClass('on');
		$('.tab-big-1').hide();
		$(this).addClass('on');
		$('.tab-big-2').show();
		return false;
	});
	
	$('.tabbed-section').each(function () {
		tabbedSections.init($(this));
	});
	
	//all-prices
	$('.all-prices').hide();
	$('.all-prices').next('.col-a').css('clear','both');
	$('.all-prices').next('.col-a').append('<a class="expand" href="#na">Expand to see all</a>');
	
	$('.expand').click(function() {
		if ($(this).text() == 'Expand to see all'){
			$(this).text('Collapse');
			$(this).addClass('collapse');
		} else{
			$(this).text('Expand to see all');
			$(this).removeClass('collapse');
		}
		$('.all-prices').slideToggle();
		return false;
	});
	
	// help modal windows
	$('a.help, .stats').click(function(e) {
		//Cancel the link behavior
		e.preventDefault();
		//Get the A tag
		var id = $(this).attr('href');
	
		//Get the screen height and width
		var maskHeight = $(document).height();
		var maskWidth = $(window).width();
	
		//Set height and width to mask to fill up the whole screen
		$('#mask').css({'width':maskWidth,'height':maskHeight});
		
		//transition effect
		$('#mask').fadeIn(1000);	
		$('#mask').fadeTo("slow",0.6);	
	
		//Get the window width and offset position of link from window
		var winW = $(window).width();
		var pos = $(this).offset();
		
		      
		//Set the popup window to center
		$(id).css('top',  pos.top);
		$(id).css('left', winW/2-$(id).width()/2);
	
		//transition effect
		$(id).fadeIn(2000); 
	
	});
	
	//if close button is clicked
	$('.window .close').click(function (e) {
		//Cancel the link behavior
		e.preventDefault();
		$('#mask, .window').hide();
	});		
	
	//if mask is clicked
	$('#mask').click(function () {
		$(this).hide();
		$('.window').hide();
	});
	
	
	//interactive pricing tool
	//for prototype only - remove for build
	$('.nitrates-prices').hide();
	//$('.pricing-tool input:checkbox:not(:checked)').attr("disabled", "disabled");
	$('.pricing-tool input:checkbox').click(function() {
		var n = $(".pricing-tool input:checked").length;
  		if (n == 4){
			$('.pricing-tool input:checkbox:not(:checked)').attr("disabled", "disabled");
			$('.tab-1 img').attr("src","/_lib/images/content/line-4.gif");
			$('.tab-2 img').attr("src","/_lib/images/content/bar-4.gif");
		}
		if (n < 4){
			$('.pricing-tool input:checkbox:not(:checked)').removeAttr("disabled");
			$('.tab-1 img').attr("src","/_lib/images/content/line-3.gif");
			$('.tab-2 img').attr("src","/_lib/images/content/bar-3.gif"); 
		}
		if (n == 2){
			$('.tab-1 img').attr("src","/_lib/images/content/line-2.gif");
			$('.tab-2 img').attr("src","/_lib/images/content/bar-2.gif"); 
		}
		if (n == 1){
			$('.tab-1 img').attr("src","/_lib/images/content/line-1.gif");
			$('.tab-2 img').attr("src","/_lib/images/content/bar-1.gif"); 
		}
		if (n == 0){
			$('.tab-1 img').attr("src","/_lib/images/content/line-0.gif");
			$('.tab-2 img').attr("src","/_lib/images/content/line-0.gif"); 
		}
    });
	
	$('.pricing-tool button').click(function() {
		var newDate = $('#date-range option:selected').text();
		$('.tab-heading h3 span').text(newDate);
		if (newDate == "1 week"){
			$('#date-txt').text('7 Oct 2010');
			$('#date-txt-1').text('7 Oct 2010');
			//$('#date-txt-1').css('float','left');
		}if (newDate == "1 month"){
			$('#date-txt').text('14 Sep 2010');
			$('#date-txt-1').text('14 Sep 2010');
		}if (newDate == "3 months"){
			$('#date-txt').text('14 Jul 2010');
			$('#date-txt-1').text('14 Jul 2010');
		}if (newDate == "6 months"){
			$('#date-txt').text('14 Apr 2010');
			$('#date-txt-1').text('14 Apr 2010');
		}if (newDate == "12 months"){
			$('#date-txt').text('14 Oct 2009');
			$('#date-txt-1').text('14 Oct 2009');
		}if (newDate == "24 months"){
			$('#date-txt').text('14 Oct 2008');
			$('#date-txt-1').text('14 Oct 2008');
		}
		var newCurrency = $('#currency option:selected').text();
		if (newCurrency == "US Dollars ($)"){
			$('#currency-txt').text('$');
		}if (newCurrency == "Euro (&euro\;)"){
			$('#currency-txt').text('&euro\;');
		}if (newCurrency == "RNB"){
			$('#currency-txt').text('RNB');
		}if (newCurrency == "Brazilian Real (R$)"){
			$('#currency-txt').text('R$');
		}if (newCurrency == "Rupees"){
			$('#currency-txt').text('Rupees');
		}
		var newMeasure = $('#measure option:selected').text();
		if (newMeasure == "Metric Tonne (mt)"){
			$('#measure-txt').text('mt');
		}else{
			$('#measure-txt').text('st');
		}
		var newProduct = $('#product option:selected').text();
		if (newProduct == "Urea"){
			if ($('.urea-prices').is(":visible")) {
			}
			else {
				$('.urea-prices').show();
				$('.nitrates-prices').hide();
				$('input:checkbox').removeAttr('checked').removeAttr("disabled");
			}
		}else if(newProduct == "Nitrates"){
			if ($('.nitrates-prices').is(":visible")) {
			}
			else {
				$('.nitrates-prices').show();
				$('.urea-prices').hide();
				$('input:checkbox').removeAttr('checked').removeAttr("disabled");
			}
		}
    });
	
	$(function() {
            $( ".datepicker" ).datepicker({ dateFormat: 'dd M yy' });
    });

    
    $('.help-item-full').hide();

    $('a.showfull').click(function() {
		if ($(this).hasClass('hidefull')) {
			$(this).text("Expand");
			$(this).removeClass('hidefull');
		}
		else {
			$(this).text("Collapse");
			$(this).addClass('hidefull');
		}

                $(this).parent().next('.help-item-content').children('.help-item-full').slideToggle();
		return false;
    });

    $('a.headertoggle').click(function() {
		if ($(this).parent().siblings().hasClass('hidefull')) {
			$(this).parent().siblings().text("Expand");
			$(this).parent().siblings().removeClass('hidefull');
		}
		else {
			$(this).parent().siblings().text("Collapse");
			$(this).parent().siblings().addClass('hidefull');
		}

                $(this).parent().parent().next('.help-item-content').children('.help-item-full').slideToggle();
		return false;
    });


    $('.hiddenform').hide();

    $('a.showfield').click(function() {

                if ($(this).hasClass('arrow-down')) {
                        $(this).removeClass('arrow-down');
                        $(this).next('.hiddenform').slideToggle();
                }
                else {
                        $(this).addClass('arrow-down');
                        $(this).next('.hiddenform').slideToggle();
                }
		return false;
    });

    $('.date-info').hide();

    $('.date-info-btn').click(function() {
        $(this).next('.date-info').show();
        return false;
    });
    $('.closeinfo_btn').click(function() {
        $(this).parent('.date-info').hide();
        return false;
    });

    $( function() {
        $( '.checkAll' ).live( 'change', function() {
            $( '.cb-element' ).attr( 'checked', $( this ).is( ':checked' ) ? 'checked' : '' );
        });
        $( '.cb-element' ).live( 'change', function() {
            $( '.cb-element' ).length == $( '.cb-element:checked' ).length ? $( '.checkAll' ).attr( 'checked', 'checked' ) : $( '.checkAll' ).attr( 'checked', '' );
        });
    });
	
	//fake search filter
	/*$('.search-filter input:checkbox').click(function() {
        var filter = $(this).parent('li').children('label').text();
		var filterID = $(this).attr('id');
		if ($('.search-filter .filtered-by').length == 0){
			$('.search-filter .inner').prepend('<ul class="filtered-by"><li>'+filter+' <a href="#na" rel="'+filterID+'"><img src="/_lib/images/design/telerik/delete.gif" alt=""/></a></li></ul>')
		} else{
			$('.search-filter .filtered-by').append('<li>'+filter+' <a href="#na" rel="'+filterID+'"><img src="/_lib/images/design/telerik/delete.gif" alt=""/></a></li>')
		}
    });*/
	
	$("body").delegate(".filtered-by li a", "click", function(){
		var uncheck = $(this).attr('rel');
		$('#'+uncheck).attr('checked', false);
		$(this).parent('li').remove();
	});
	
	$('.form-toggle + div').hide();
	$('.form-toggle').wrapInner('<a href="#na"></a>');
	$('.form-toggle a').click(function() {
        $(this).parent().next('div').slideToggle();
		$(this).toggleClass('down');
        return false;
    });
	
	//highlight labels when selected to generate charts
	$('.checkboxes input').addClass('hidden');
	$('.checkboxes input:checked').next('label').toggleClass('selected');
	$('.checkboxes input').click(function() {
        $(this).next('label').toggleClass('selected');
    });
	
	//make labels the same height
	$('.checkboxes .clear').each(function(){
        var highest = $(this).height();
		var nextLabelHeight = $(this).nextAll('label').height();
		if (highest != nextLabelHeight){
			if (highest < nextLabelHeight){
				highest = nextLabelHeight;
			}
			$(this).css('height',''+highest+'px');
			$(this).nextAll('label:lt(1)').css('height',''+highest+'px');
		}
    });
	  
	//region & commodity dropdown
	$('.nav-region li ul').hide();
	$('.nav-region li a:not(li li a)').click(function() {
		$('.nav-region li ul').slideToggle();
		$('.nav-region li ul li a').click(function() {
			var $this = $(this),
				$baseLink = $('.nav-region div > ul > li > a');
				
			$baseLink.text($(this).text());
			if ($this.closest('ul').find('a').index($this) > 0) {
				$baseLink.addClass('active');
			} else {
				$baseLink.removeClass('active');
			}
			$('.nav-region li ul').slideUp();
			$this.unbind('click');
		});
	});
	$('.nav-commodity li ul').hide();
	$('.nav-commodity li a:not(li li a)').click(function() {
		$('.nav-commodity li ul').slideToggle();
		$('.nav-commodity li ul li a').click(function() {
			var $this = $(this),
				$baseLink = $('.nav-commodity div > ul > li > a');
				
			$baseLink.text($(this).text());
			if ($this.closest('ul').find('a').index($this) > 0) {
				$baseLink.addClass('active');
			} else {
				$baseLink.removeClass('active');
			}
			$('.nav-commodity li ul').slideUp();
			$(this).unbind('click');
		});
	});

	$('.region').selectbox();
	
	//full-view toggle
	$('.full-view').hide(); 
	$('.full-view-toggle').click(function() {
		$(this).toggleClass('open');
		var linkText = $(this).text();
		if (linkText == "Expand to show charts"){
			$(this).text("Hide charts");
		}else{
			$(this).text("Expand to show charts");
		}
		
		$(this).prevAll('.expandable').first().children('.table-inner').children('.full-view').slideToggle();
	});
	
	//tooltip for btn-bottom
	$('.btn-bottom').append($('<span class="tooltip">'+$('.btn-bottom').attr('title')+'<span></span></span>'));
	$('.btn-bottom').attr('title','');
	$('.tooltip').hide();
	$('.btn-bottom:not(".btn-bottom span")').hover(
	  function (event) {
	  	event.stopPropagation();
	  	$(this).children('.tooltip').fadeIn();
	  }, 
	  function () {
	  	$(this).children('.tooltip').hide();
	  }
	);
	
	//tooltip for graph images
	var mapTooltipToCursor = function ($tooltip, position, dimensions) {
		var offsets = {
			'left' : (dimensions.width * -1) + 16,
			'top' : (dimensions.height * -1) - 20
		};
		
		$tooltip.css({
			'left' : (position.left + offsets.left) + 'px',
			'top' : (position.top + offsets.top) + 'px'
		});
	};
	$('.chart span.tooltip').each(function () {
		var $this = $(this),
			$img = $this.siblings('img'),
			$thisCopy,
			ttDimensions = {
				'width' : $this.innerWidth(),
				'height' : $this.innerHeight()
			};
			
		$this.hide();
		$img.hover(function () {
			$thisCopy = $this.clone();
			$thisCopy.css('height', ttDimensions.height + 'px');
			$(document.body).append($thisCopy);
			$thisCopy.fadeIn();
			$img.bind('mousemove', function (e) {
				mapTooltipToCursor($thisCopy, {
					'left' : e.pageX,
					'top' : e.pageY
				}, ttDimensions);
			});
		}, function () {
			$img.unbind('mousemove');
			$thisCopy.fadeOut();
			$thisCopy.remove();
		});
	});
	
//////////////////////////////////////////////////////////
// REMOVE FROM BUILD
//////////////////////////////////////////////////////////
	//nav-table weekly
	$('.nav-table a:not(.monthly a)').click(function() {
		$(this).parent().parent().parent().find('tr td:nth-child(7),tr td:nth-child(8),tr td:nth-child(9),tr td:nth-child(10)').fadeTo(1000,0).fadeTo(1000,1);
		
		var wk1 = $(this).parent().parent().parent().find('tr th:nth-child(7)').first();
		var wk2 = $(this).parent().parent().parent().find('tr th:nth-child(8)');
		var wk3 = $(this).parent().parent().parent().find('tr th:nth-child(9)');
		var wk4 = $(this).parent().parent().parent().find('tr th:nth-child(10)');
		
		if ($(this).hasClass('nav-forward') == true){
			if (wk1.text() == '4 Nov'){
				wk1.animate({opacity: 0}, 1000 , function(){wk1.text('11 Nov')}).fadeTo(1000,1);
				wk2.animate({opacity: 0}, 1000 , function(){wk2.text('18 Nov')}).fadeTo(1000,1);
				wk3.animate({opacity: 0}, 1000 , function(){wk3.text('25 Nov')}).fadeTo(1000,1);
				wk4.animate({opacity: 0}, 1000 , function(){wk4.text('1 Dec')}).fadeTo(1000,1);
			} else if(wk1.text() == '11 Nov'){
				wk1.animate({opacity: 0}, 1000 , function(){wk1.text('18 Nov')}).fadeTo(1000,1);
				wk2.animate({opacity: 0}, 1000 , function(){wk2.text('25 Nov')}).fadeTo(1000,1);
				wk3.animate({opacity: 0}, 1000 , function(){wk3.text('1 Dec')}).fadeTo(1000,1);
				wk4.animate({opacity: 0}, 1000 , function(){wk4.text('8 Dec')}).fadeTo(1000,1);
			} else if (wk1.text() == '20 Oct'){
				wk1.animate({opacity: 0}, 1000 , function(){wk1.text('28 Oct')}).fadeTo(1000,1);
				wk2.animate({opacity: 0}, 1000 , function(){wk2.text('4 Nov')}).fadeTo(1000,1);
				wk3.animate({opacity: 0}, 1000 , function(){wk3.text('11 Nov')}).fadeTo(1000,1);
				wk4.animate({opacity: 0}, 1000 , function(){wk4.text('18 Nov')}).fadeTo(1000,1);
			} else if(wk1.text() == '28 Oct'){
				wk1.animate({opacity: 0}, 1000 , function(){wk1.text('4 Nov')}).fadeTo(1000,1);
				wk2.animate({opacity: 0}, 1000 , function(){wk2.text('11 Nov')}).fadeTo(1000,1);
				wk3.animate({opacity: 0}, 1000 , function(){wk3.text('18 Nov')}).fadeTo(1000,1);
				wk4.animate({opacity: 0}, 1000 , function(){wk4.text('25 Nov')}).fadeTo(1000,1);
			} 
		} else{
			if (wk1.text() == '4 Nov'){
				wk1.animate({opacity: 0}, 1000 , function(){wk1.text('28 Oct')}).fadeTo(1000,1);
				wk2.animate({opacity: 0}, 1000 , function(){wk2.text('4 Nov')}).fadeTo(1000,1);
				wk3.animate({opacity: 0}, 1000 , function(){wk3.text('11 Nov')}).fadeTo(1000,1);
				wk4.animate({opacity: 0}, 1000 , function(){wk4.text('18 Nov')}).fadeTo(1000,1);
			} else if(wk1.text() == '28 Oct'){
				wk1.animate({opacity: 0}, 1000 , function(){wk1.text('20 Oct')}).fadeTo(1000,1);
				wk2.animate({opacity: 0}, 1000 , function(){wk2.text('28 Oct')}).fadeTo(1000,1);
				wk3.animate({opacity: 0}, 1000 , function(){wk3.text('4 Nov')}).fadeTo(1000,1);
				wk4.animate({opacity: 0}, 1000 , function(){wk4.text('11 Nov')}).fadeTo(1000,1);
			} else if (wk1.text() == '11 Nov'){
				wk1.animate({opacity: 0}, 1000 , function(){wk1.text('4 Nov')}).fadeTo(1000,1);
				wk2.animate({opacity: 0}, 1000 , function(){wk2.text('11 Nov')}).fadeTo(1000,1);
				wk3.animate({opacity: 0}, 1000 , function(){wk3.text('18 Nov')}).fadeTo(1000,1);
				wk4.animate({opacity: 0}, 1000 , function(){wk4.text('25 Nov')}).fadeTo(1000,1);
			} else if(wk1.text() == '18 Nov'){
				wk1.animate({opacity: 0}, 1000 , function(){wk1.text('11 Nov')}).fadeTo(1000,1);
				wk2.animate({opacity: 0}, 1000 , function(){wk2.text('18 Nov')}).fadeTo(1000,1);
				wk3.animate({opacity: 0}, 1000 , function(){wk3.text('25 Nov')}).fadeTo(1000,1);
				wk4.animate({opacity: 0}, 1000 , function(){wk4.text('1 Dec')}).fadeTo(1000,1);
			}
		}
		
	});
	
	// nav-table monthly
	$('.monthly a').click(function() {
		$(this).parent().parent().parent().find('tr td:nth-child(5),tr td:nth-child(6),tr td:nth-child(7),tr td:nth-child(8),tr td:nth-child(9),tr td:nth-child(10)').fadeTo(1000,0).fadeTo(1000,1);
		
		var mth1 = $(this).parent().parent().parent().find('tr th:nth-child(5)').first();
		var mth2 = $(this).parent().parent().parent().find('tr th:nth-child(6)');
		var mth3 = $(this).parent().parent().parent().find('tr th:nth-child(7)');
		var mth4 = $(this).parent().parent().parent().find('tr th:nth-child(8)');
		var mth5 = $(this).parent().parent().parent().find('tr th:nth-child(9)');
		var mth6 = $(this).parent().parent().parent().find('tr th:nth-child(10)');
		
		if ($(this).hasClass('nav-forward') == true){
			if (mth1.text() == 'Jun 2010'){
				mth1.animate({opacity: 0}, 1000 , function(){mth1.text('Jul 2010')}).fadeTo(1000,1);
				mth2.animate({opacity: 0}, 1000 , function(){mth2.text('Aug 2010')}).fadeTo(1000,1);
				mth3.animate({opacity: 0}, 1000 , function(){mth3.text('Sep 2010')}).fadeTo(1000,1);
				mth4.animate({opacity: 0}, 1000 , function(){mth4.text('Oct 2010')}).fadeTo(1000,1);
				mth5.animate({opacity: 0}, 1000 , function(){mth5.text('Nov 2010')}).fadeTo(1000,1);
				mth6.animate({opacity: 0}, 1000 , function(){mth6.text('Dec 2010')}).fadeTo(1000,1);
			} else if(mth1.text() == 'Jul 2010'){
				mth1.animate({opacity: 0}, 1000 , function(){mth1.text('Aug 2010')}).fadeTo(1000,1);
				mth2.animate({opacity: 0}, 1000 , function(){mth2.text('Sep 2010')}).fadeTo(1000,1);
				mth3.animate({opacity: 0}, 1000 , function(){mth3.text('Oct 2010')}).fadeTo(1000,1);
				mth4.animate({opacity: 0}, 1000 , function(){mth4.text('Nov 2010')}).fadeTo(1000,1);
				mth5.animate({opacity: 0}, 1000 , function(){mth5.text('Dec 2010')}).fadeTo(1000,1);
				mth6.animate({opacity: 0}, 1000 , function(){mth6.text('Jan 2011')}).fadeTo(1000,1);
			} else if (mth1.text() == 'May 2010'){
				mth1.animate({opacity: 0}, 1000 , function(){mth1.text('Jun 2010')}).fadeTo(1000,1);
				mth2.animate({opacity: 0}, 1000 , function(){mth2.text('Jul 2010')}).fadeTo(1000,1);
				mth3.animate({opacity: 0}, 1000 , function(){mth3.text('Aug 2010')}).fadeTo(1000,1);
				mth4.animate({opacity: 0}, 1000 , function(){mth4.text('Sep 2010')}).fadeTo(1000,1);
				mth5.animate({opacity: 0}, 1000 , function(){mth5.text('Oct 2010')}).fadeTo(1000,1);
				mth6.animate({opacity: 0}, 1000 , function(){mth6.text('Nav 2010')}).fadeTo(1000,1);
			} else if(mth1.text() == 'Apr 2010'){
				mth1.animate({opacity: 0}, 1000 , function(){mth1.text('May 2010')}).fadeTo(1000,1);
				mth2.animate({opacity: 0}, 1000 , function(){mth2.text('Jun 2010')}).fadeTo(1000,1);
				mth3.animate({opacity: 0}, 1000 , function(){mth3.text('Jul 2010')}).fadeTo(1000,1);
				mth4.animate({opacity: 0}, 1000 , function(){mth4.text('Aug 2010')}).fadeTo(1000,1);
				mth5.animate({opacity: 0}, 1000 , function(){mth5.text('Sep 2010')}).fadeTo(1000,1);
				mth6.animate({opacity: 0}, 1000 , function(){mth6.text('Oct 2010')}).fadeTo(1000,1);
			} 
		} else{
			if (mth1.text() == 'Jun 2010'){
				mth1.animate({opacity: 0}, 1000 , function(){mth1.text('May 2010')}).fadeTo(1000,1);
				mth2.animate({opacity: 0}, 1000 , function(){mth2.text('Jun 2010')}).fadeTo(1000,1);
				mth3.animate({opacity: 0}, 1000 , function(){mth3.text('Jul 2010')}).fadeTo(1000,1);
				mth4.animate({opacity: 0}, 1000 , function(){mth4.text('Aug 2010')}).fadeTo(1000,1);
				mth5.animate({opacity: 0}, 1000 , function(){mth5.text('Sep 2010')}).fadeTo(1000,1);
				mth6.animate({opacity: 0}, 1000 , function(){mth6.text('Oct 2010')}).fadeTo(1000,1);
			} else if(mth1.text() == 'May 2010'){
				mth1.animate({opacity: 0}, 1000 , function(){mth1.text('Apr 2010')}).fadeTo(1000,1);
				mth2.animate({opacity: 0}, 1000 , function(){mth2.text('May 2010')}).fadeTo(1000,1);
				mth3.animate({opacity: 0}, 1000 , function(){mth3.text('Jun 2010')}).fadeTo(1000,1);
				mth4.animate({opacity: 0}, 1000 , function(){mth4.text('Jul 2010')}).fadeTo(1000,1);
				mth5.animate({opacity: 0}, 1000 , function(){mth5.text('Aug 2010')}).fadeTo(1000,1);
				mth6.animate({opacity: 0}, 1000 , function(){mth6.text('Sep 2010')}).fadeTo(1000,1);
			} else if (mth1.text() == 'Jul 2010'){
				mth1.animate({opacity: 0}, 1000 , function(){mth1.text('Jun 2010')}).fadeTo(1000,1);
				mth2.animate({opacity: 0}, 1000 , function(){mth2.text('Jul 2010')}).fadeTo(1000,1);
				mth3.animate({opacity: 0}, 1000 , function(){mth3.text('Aug 2010')}).fadeTo(1000,1);
				mth4.animate({opacity: 0}, 1000 , function(){mth4.text('Sep 2010')}).fadeTo(1000,1);
				mth5.animate({opacity: 0}, 1000 , function(){mth5.text('Oct 2010')}).fadeTo(1000,1);
				mth6.animate({opacity: 0}, 1000 , function(){mth6.text('Nav 2010')}).fadeTo(1000,1);
			} else if(mth1.text() == 'Aug 2010'){
				mth1.animate({opacity: 0}, 1000 , function(){mth1.text('Jul 2010')}).fadeTo(1000,1);
				mth2.animate({opacity: 0}, 1000 , function(){mth2.text('Aug 2010')}).fadeTo(1000,1);
				mth3.animate({opacity: 0}, 1000 , function(){mth3.text('Sep 2010')}).fadeTo(1000,1);
				mth4.animate({opacity: 0}, 1000 , function(){mth4.text('Oct 2010')}).fadeTo(1000,1);
				mth5.animate({opacity: 0}, 1000 , function(){mth5.text('Nov 2010')}).fadeTo(1000,1);
				mth6.animate({opacity: 0}, 1000 , function(){mth6.text('Dec 2010')}).fadeTo(1000,1);
			}
		}
		
	});
	
	//at a glance interactive chart

//////////////////////////////////////////////////////////
// Nadeem - Setting default widths for main nav dropdowns
//////////////////////////////////////////////////////////

	$(document).ready(function(){ 
		$("ul.topnav-menu").supersubs({ 
			minWidth:    17,   // minimum width of sub-menus in em units 
			maxWidth:    32,   // maximum width of sub-menus in em units 
			extraWidth:  1     // extra width can ensure lines don't sometimes turn over 
							   // due to slight rounding differences and font-family 
		}).superfish( {
		});  // call supersubs first, then superfish, so that subs are 
						 // not display:none when measuring. Call before initialising 
						 // containing tabs for same reason. 
	});
	
//////////////////////////////////////////////////////////
// Nadeem - Adding Lightbox / ColorBox for Help Button
//////////////////////////////////////////////////////////
	$(document).ready(function(){
		$(".help").colorbox();
	});
	
//////////////////////////////////////////////////////////
// END REMOVE FROM BUILD
//////////////////////////////////////////////////////////	

/*
    jQuery News Ticker is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, version 2 of the License.
 
    jQuery News Ticker is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with jQuery News Ticker.  If not, see <http://www.gnu.org/licenses/>.
*/
//(function(a){a.fn.ticker=function(c){var e=a.extend({},a.fn.ticker.defaults,c);var b="#"+a(this).attr("id");var d=a(this).attr("tagName");return this.each(function(){var h={position:0,time:0,distance:0,newsArr:{},play:true,paused:false,contentLoaded:false,dom:{contentID:"#ticker-content",titleID:"#ticker-title",titleElem:"#ticker-title SPAN",tickerID:"#ticker",wrapperID:"#tickerWrapper",revealID:"#ticker-swipe",revealElem:"#ticker-swipe SPAN",controlsID:"#ticker-controls",prevID:"#prev",nextID:"#next",playPauseID:"#play-pause"}};if(d!="UL"&&d!="OL"&&e.htmlFeed===true){o("Cannot use <"+d.toLowerCase()+"> type of element for this plugin - must of type <ul> or <ol>");return false;}e.direction=="rtl"?e.direction="right":e.direction="left";f();function k(s){var r=0,q;for(q in s){if(s.hasOwnProperty(q)){r++;}}return r;}function o(q){}function f(){a(h.dom.wrapperID).append('<div id="'+h.dom.tickerID.replace("#","")+'"><div id="'+h.dom.titleID.replace("#","")+'"><span><!-- --></span></div><p id="'+h.dom.contentID.replace("#","")+'"></p><div id="'+h.dom.revealID.replace("#","")+'"><span><!-- --></span></div></div>');a(h.dom.wrapperID).removeClass("no-js").addClass("has-js "+e.direction);a(h.dom.tickerElem+","+h.dom.contentID).hide();if(e.controls){a(h.dom.controlsID).live("click mouseover mousedown mouseout mouseup",function(r){var q=r.target.id;if(r.type=="click"){switch(q){case h.dom.prevID.replace("#",""):h.paused=true;a(h.dom.playPauseID).addClass("paused");m(q);break;case h.dom.nextID.replace("#",""):h.paused=true;a(h.dom.playPauseID).addClass("paused");m(q);break;case h.dom.playPauseID.replace("#",""):if(h.play==true){h.paused=true;a(h.dom.playPauseID).addClass("paused");i();}else{h.paused=false;a(h.dom.playPauseID).removeClass("paused");n();}break;}}else{if(r.type=="mouseover"&&a("#"+q).hasClass("controls")){a("#"+q).addClass("over");}else{if(r.type=="mousedown"&&a("#"+q).hasClass("controls")){a("#"+q).addClass("down");}else{if(r.type=="mouseup"&&a("#"+q).hasClass("controls")){a("#"+q).removeClass("down");}else{if(r.type=="mouseout"&&a("#"+q).hasClass("controls")){a("#"+q).removeClass("over");}}}}}});a(h.dom.wrapperID).append('<ul id="'+h.dom.controlsID.replace("#","")+'"><li id="'+h.dom.playPauseID.replace("#","")+'" class="controls"></li><li id="'+h.dom.prevID.replace("#","")+'" class="controls"></li><li id="'+h.dom.nextID.replace("#","")+'" class="controls"></li></ul>');}if(e.displayType!="fade"){a(h.dom.contentID).mouseover(function(){if(h.paused==false){i();}}).mouseout(function(){if(h.paused==false){n();}});}l();}function l(){if(h.contentLoaded==false){if(e.ajaxFeed){if(e.feedType=="xml"){a.ajax({url:e.feedUrl,cache:false,dataType:e.feedType,async:true,success:function(u){count=0;for(var r=0;r<u.childNodes.length;r++){if(u.childNodes[r].nodeName=="rss"){xmlContent=u.childNodes[r];}}for(var s=0;s<xmlContent.childNodes.length;s++){if(xmlContent.childNodes[s].nodeName=="channel"){xmlChannel=xmlContent.childNodes[s];}}for(var q=0;q<xmlChannel.childNodes.length;q++){if(xmlChannel.childNodes[q].nodeName=="item"){xmlItems=xmlChannel.childNodes[q];var v,t=false;for(var w=0;w<xmlItems.childNodes.length;w++){if(xmlItems.childNodes[w].nodeName=="title"){v=xmlItems.childNodes[w].lastChild.nodeValue;}else{if(xmlItems.childNodes[w].nodeName=="link"){t=xmlItems.childNodes[w].lastChild.nodeValue;}}if((v!==false&&v!="")&&t!==false){h.newsArr["item-"+count]={type:e.titleText,content:'<a href="'+t+'">'+v+"</a>"};count++;v=false;t=false;}}}}if(k(h.newsArr<1)){o("Couldn't find any content from the XML feed for the ticker to use!");return false;}p();h.contentLoaded=true;}});}else{o("Code Me!");}}else{if(e.htmlFeed){if(a(b+" LI").length>0){a(b+" LI").each(function(q){h.newsArr["item-"+q]={type:e.titleText,content:a(this).html()};});p();}else{o("Couldn't find HTML any content for the ticker to use!");return false;}}else{o("The ticker is set to not use any types of content! Check the settings for the ticker.");return false;}}}}function p(){h.contentLoaded=true;a(h.dom.titleElem).html(h.newsArr["item-"+h.position].type);a(h.dom.contentID).html(h.newsArr["item-"+h.position].content);if(h.position==(k(h.newsArr)-1)){h.position=0;}else{h.position++;}distance=a(h.dom.contentID).width();time=distance/e.speed;g();}function g(){if(h.play){var q=a(h.dom.titleElem).width()+20;a(h.dom.revealID).css(e.direction,q+"px");if(e.displayType=="fade"){a(h.dom.revealID).hide(0,function(){a(h.dom.contentID).css(e.direction,q+"px").fadeIn(e.fadeInSpeed,j);});}else{if(e.displayType=="scroll"){}else{a(h.dom.revealElem).show(0,function(){a(h.dom.contentID).css(e.direction,q+"px").show();animationAction=e.direction=="right"?{marginRight:distance+"px"}:{marginLeft:distance+"px"};a(h.dom.revealID).css("margin-"+e.direction,"0px").delay(20).animate(animationAction,time,"linear",j);});}}}else{return false;}}function j(){if(h.play){a(h.dom.contentID).delay(e.pauseOnItems).fadeOut(e.fadeOutSpeed);if(e.displayType=="fade"){a(h.dom.contentID).fadeOut(e.fadeOutSpeed,function(){a(h.dom.wrapperID).find(h.dom.revealElem+","+h.dom.contentID).hide().end().find(h.dom.tickerID+","+h.dom.revealID).show().end().find(h.dom.tickerID+","+h.dom.revealID).removeAttr("style");p();});}else{a(h.dom.revealID).hide(0,function(){a(h.dom.contentID).fadeOut(e.fadeOutSpeed,function(){a(h.dom.wrapperID).find(h.dom.revealElem+","+h.dom.contentID).hide().end().find(h.dom.tickerID+","+h.dom.revealID).show().end().find(h.dom.tickerID+","+h.dom.revealID).removeAttr("style");p();});});}}else{a(h.dom.revealElem).hide();}}function i(){h.play=false;a(h.dom.tickerID+","+h.dom.revealID+","+h.dom.titleID+","+h.dom.titleElem+","+h.dom.revealElem+","+h.dom.contentID).stop(true,true);a(h.dom.revealID+","+h.dom.revealElem).hide();a(h.dom.wrapperID).find(h.dom.titleID+","+h.dom.titleElem).show().end().find(h.dom.contentID).show();}function n(){h.play=true;h.paused=false;j();}function m(q){i();switch(q){case"prev":if(h.position==0){h.position=k(h.newsArr)-2;}else{if(h.position==1){h.position=k(h.newsArr)-1;}else{h.position=h.position-2;}}a(h.dom.titleElem).html(h.newsArr["item-"+h.position].type);a(h.dom.contentID).html(h.newsArr["item-"+h.position].content);break;case"next":a(h.dom.titleElem).html(h.newsArr["item-"+h.position].type);a(h.dom.contentID).html(h.newsArr["item-"+h.position].content);break;}if(h.position==(k(h.newsArr)-1)){h.position=0;}else{h.position++;}}});};a.fn.ticker.defaults={speed:0.1,ajaxFeed:false,feedUrl:"",feedType:"xml",displayType:"reveal",htmlFeed:true,debugMode:true,controls:true,titleText:"Latest",direction:"ltr",pauseOnItems:3000,fadeInSpeed:600,fadeOutSpeed:300};})(jQuery);
//
////latest news ticker
//$(function () {
//	 $('#js-news').ticker({
//		titleText: 'Latest:',
//		fadeOutSpeed: 0
//	 });
//});

});

//////////////////////////////////////////////////////////
// Nadeem - Cru Online Tabs Navigation
//////////////////////////////////////////////////////////

  // onhover effect only - tab menu //

var timeout    = 500;
var closetimer = 0;
var ddmenuitem = 0;

function crutabs_open()
{  crutabs_canceltimer();
crutabs_close();
ddmenuitem = $(this).find('ul').css('visibility', 'visible');}

function crutabs_close()
{  if(ddmenuitem) ddmenuitem.css('visibility', 'hidden');}

function crutabs_timer()
{  closetimer = window.setTimeout(crutabs_close, timeout);}

function crutabs_canceltimer()
{  if(closetimer)
{  window.clearTimeout(closetimer);
 closetimer = null;}}

$(document).ready(function()
{  $('.tabs-menu > li').bind('mouseover', crutabs_open)
 $('.tabs-menu > li').bind('mouseout',  crutabs_timer)});
 
 
	document.onclick = crutabs_close;

  // onclick effect only - global menu //

var globaltimeout    = 500;
var globalclosetimer = 0;
var globalmenuitem = 0;

function globaltabs_open(event)
{
globaltabs_canceltimer();
globaltabs_close();
var submenu = $(this).find('ul');
if(submenu){
	globalmenuitem = submenu.css('visibility', 'visible');
      return true;
    }
}

	function globaltabs_close()
	{  if(globalmenuitem) globalmenuitem.css('visibility', 'hidden');}

	function globaltabs_timer()
	{  globalclosetimer = window.setTimeout(globaltabs_close, globaltimeout);}

	function globaltabs_canceltimer()
	{  if(globalclosetimer)
	{  window.clearTimeout(globalclosetimer);
    globalclosetimer = null;}}

	$(document).ready(function()
	{  $('.global-menu li').bind('click', globaltabs_open);
   $('.global-menu > li').bind('mouseout',  globaltabs_timer);
   $('.global-menu > li').bind('mouseover', globaltabs_canceltimer);
	});

  
  // onclick effect only - table monthly menu //

var tabletimeout    = 500;
var tableclosetimer = 0;
var tablemenuitem = 0;

function tabletabs_open(event)
{
tabletabs_canceltimer();
tabletabs_close();
var submenu = $(this).find('ul');
if(submenu){
	tablemenuitem = submenu.css('visibility', 'visible');
     return true;
    }
    
}

	function tabletabs_close()
	{  if(tablemenuitem) tablemenuitem.css('visibility', 'hidden');}

	function tabletabs_timer()
	{  tableclosetimer = window.setTimeout(tabletabs_close, tabletimeout);}

	function tabletabs_canceltimer()
	{  if(tableclosetimer)
	{  window.clearTimeout(tableclosetimer);
    tableclosetimer = null;}}

	$(document).ready(function()
	{  $('.table-menu li').bind('click', tabletabs_open);
   $('.table-menu > li').bind('mouseout',  tabletabs_timer);
   $('.table-menu > li').bind('mouseover', tabletabs_canceltimer);
	});
	
  // onclick effect only - header title menu //

var headertimeout    = 500;
var headerclosetimer = 0;
var headermenuitem = 0;

function headertabs_open(event)
{
headertabs_canceltimer();
headertabs_close();
var submenu = $(this).find('ul');
if(submenu){
	headermenuitem = submenu.css('visibility', 'visible');
     return true;
    }
    
}

	function headertabs_close()
	{  if(headermenuitem) headermenuitem.css('visibility', 'hidden');}

	function headertabs_timer()
	{  headerclosetimer = window.setTimeout(headertabs_close, headertimeout);}

	function headertabs_canceltimer()
	{  if(headerclosetimer)
	{  window.clearTimeout(headerclosetimer);
    headerclosetimer = null;}}

	$(document).ready(function()
	{  $('.header-menu li').bind('click', headertabs_open);
   $('.header-menu > li').bind('mouseout',  headertabs_timer);
   $('.header-menu > li').bind('mouseover', headertabs_canceltimer);
	});


//////////////////////////////////////////////////////////////////////
// Nadeem - Setting varying styles for Tables - commented out for now
/////////////////////////////////////////////////////////////////////	
    // $(document).ready(function () {
		// targeting specific columns ( by td ) in a table
		// $(".rgMasterTable td:nth-child(4)").css("background", "white");
		// $(".rgMasterTable td:nth-child(4)").css("font-weight", "bold");
		// $(".rgMasterTable td:nth-child(4)").css("color", "green");
		// $(".rgMasterTable td:nth-child(10)").css("background", "white");
		// $(".rgMasterTable td:nth-child(10)").css("font-weight", "bold");
		// $(".rgMasterTable td:nth-child(10)").css("color", "green");	
		// targeting specific tds in a tr of a table
		// $(".rgMasterTable") // table class/id name
			// .find("tbody tr")
				// .eq(3).children() // targeting a row
					// .eq(5).css("color","#fff").end()  // targeting a specific td
					// .eq(5).css("background-color","green").end()  // targeting a specific td
					// .eq(6).css("font-weight","bold").end();  // targeting a specific td
					
		// targeting all elements in a th row except the first two, for example
		// $(".td-underline > th").slice(2).css('text-decoration', 'underline');  
    // });
	
$(document).ready(function()
{
	$('.table-core table').tableHover({colClass: 'hover'});
});


$(document).ready(function()
{
	$(".global-dropdown > a, .table-dropdown > a, .header-dropdown > h2 > a").click(function(e) {
		e.preventDefault();
	});
});



	
