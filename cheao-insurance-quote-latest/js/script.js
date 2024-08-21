$(document).ready(function() {
	$(".menu").click(function(){
		$(".menu").toggleClass("active");
		$("body").toggleClass("body-lock");
		// $(".header-menu-section").slideToggle();
		$("body").toggleClass("menu-opened");
	});

	$('.about-personalized-car, .about-banner, .fair-quote.bottom-zip-code-section, .terms-personalized-section, .terms-saving').viewportChecker({
    	classToAdd: 'visible',
    	offset: 50
    });

	$('.insurance-cost-item input[type=checkbox]:checked').parent().addClass('checked');
    $('.insurance-cost-item input[type=checkbox]').change(function() {
    	if ($(this).prop('checked')==true){ 
        	$(this).parent().addClass('checked');
        } else {
        	$(this).parent().removeClass('checked');
        }
    });

    $(".faq-list .title").on("click", function() {
		if ($(this).hasClass("active")) {
			$(this).removeClass("active");
			$(this).siblings(".faq-content").slideUp();
		} else {
			$(".faq-list .title").removeClass("active");
			$(this).addClass("active");
			$(".faq-content").slideUp();
			$(this).siblings(".faq-content").slideDown();
		}
	});

    $('.step-container:eq(0)').show();
	$('.button.back').addClass('disable o-none');
	updateProgressbar();
	var i = [];
    $('.next').on('click', function(){
		if($('.step-btns .button.next').is(".get-auto-quotes")){
			$('.all-steps').addClass('hide');
			$('.final-step').removeClass('hide');
			$('.container').removeClass('bg');
			
			var progression = 0,
			progress = setInterval(function() 
			{
				$('.quote-progress-block .quote-progress').css({'width':progression+'%'});
				if(progression == 100) {
					clearInterval(progress);
					$('.final-step .top-block').removeClass('o-none');
					$('.final-step .quote-progress-block').addClass('hide');
					$('.final-step .agent-contact').removeClass('hide');
					i.push($('.step-container.show').data('step'));
					$('.step-btns .button.back').addClass('get-auto-quotes');
				} else
					progression += 10;

			}, 300);
			
			return;
		}
		
		$('.next').addClass('disable');
		var activeSection = $('.step-container.show');
		
		if(activeSection.find('.next-step-value').length){
			var nextStep = activeSection.find('.next-step-value').val();
		}else{
			var nextStep = activeSection.find('.radio-container input[type=radio]:checked').val();
		}
		
		if(nextStep == 'lastStep'){
			$('.next').addClass('o-none');
		}
		
		i.push(activeSection.data('step'));
		
		if(i.length > 0){
			$('.back').removeClass('disable o-none');
		}
		
		activeSection.removeClass('show');
		$('#'+ nextStep).addClass('show');
		
        activeSection.fadeOut('show', function(){
            $('#'+ nextStep).fadeIn('slow');
        });
		
		if(nextStep == 'completeStep'){
			$('.container').addClass('bg');
			$('.step-progress').addClass('hide');
			$('.complete-text').show();
			$('.step-btns .button.next span').text('Get My Free Auto Quotes');
			$('.step-btns .button.next').addClass('get-auto-quotes');
		}else{
			$('.container').removeClass('bg');
			$('.step-progress').removeClass('hide');
			$('.complete-text').hide();
			$('.step-btns .button.next span').text('Save & Continue');
			$('.step-btns .button.next').removeClass('get-auto-quotes');
		}
		
		updateProgressbar();
		
		setTimeout(function(){
			$('.next').removeClass('disable');
		},500);
    });
	
	$('.back').on('click', function(){
		if (typeof i !== 'undefined' && i.length > 0) {
			if($('.step-btns .button.back').is(".get-auto-quotes")){
				$('.all-steps').removeClass('hide');
				$('.final-step').addClass('hide');
				$('.final-step .top-block').addClass('o-none');
				$('.final-step .quote-progress-block').removeClass('hide');
				$('.final-step .agent-contact').addClass('hide');
				$('.quote-progress-block .quote-progress').css({'width':'0%'});
				$('.container').addClass('bg');
				$('.step-btns .button.back').removeClass('get-auto-quotes');
				var lastEl = i.pop();
				return;
			}
			
			$('.back').addClass('disable');
			var lastEl = i.pop();
			var prevStep = $('div[data-step="'+ lastEl +'"]');
			
			if($('.step-container.show').is("#lastStep")){
				$('.next').removeClass('o-none');
			}
			
			$('.step-container.show').fadeOut('show', function(){
				prevStep.fadeIn('slow');
				$('.step-container.show').removeClass('show');
				prevStep.addClass('show');
				updateProgressbar();
			});
			
			if(prevStep.is("#completeStep")){
				$('.container').addClass('bg');
				$('.step-progress').addClass('hide');
				$('.complete-text').show();
				$('.step-btns .button.next span').text('Get My Free Auto Quotes');
				$('.step-btns .button.next').addClass('get-auto-quotes');
			}else{
				$('.container').removeClass('bg');
				$('.step-progress').removeClass('hide');
				$('.complete-text').hide();
				$('.step-btns .button.next span').text('Save & Continue');
				$('.step-btns .button.next').removeClass('get-auto-quotes');
			}
			
			setTimeout(function(){
				if (i.length > 0) {
					$('.back').removeClass('disable');
				}else{
					$('.back').addClass('disable o-none');
				}
			},500);
		}else{
			$('.back').addClass('disable');
		}
	});
	
	function updateProgressbar(){
		totalStep = $('.all-steps .step-container').length;
		currentStep = $('.all-steps .step-container.show').data('step');
		
		percentComplete = Math.round(currentStep * 100 / totalStep);
		
		$('.step-progress .progress-block .progress').css({'width':percentComplete+'%'});
		$('.step-progress .progress-block .progress').attr('fill', percentComplete);
		
		progressTextEle = $('.step-progress .progress-block .progress .progress-point .progress-text');
		
		if(percentComplete < 33){
			progressTextEle.html('Your Minutes away from your personalized quote!');
		}
		else if(percentComplete < 50){
			progressTextEle.html('You’re doing great! A few more details to go...');
		}
		else if(percentComplete < 75){
			progressTextEle.html('Whoa! You’re halfway there <img class="music-icon" src="images/music.png">');
		}
		else{
			progressTextEle.html('You’re so close! Keep going to discover savings');
		}
		
		if(percentComplete >= 35 && percentComplete <= 60){
			$('.step-progress .progress-block').removeClass('right');
			$('.step-progress .progress-block').addClass('center');
		}
		else if(percentComplete > 60){
			$('.step-progress .progress-block').removeClass('center');
			$('.step-progress .progress-block').addClass('right');
		}
		else{
			$('.step-progress .progress-block').removeClass('center');
			$('.step-progress .progress-block').removeClass('right');
		}
	}

    $('.btn-block button').on('click', function(){
        $(this).parents('.btn-block').find('button').removeClass('selected');
        $(this).addClass('selected');
    })

    $('ul.picker li').on('click', function(){
        $(this).parent().find('li').removeClass('selected');
        $(this).addClass('selected');
    });

    $("#dob").datepicker({
        autoClose: true,
        date: new Date()
    });
    $("#adob").datepicker({
        autoClose: true,
        date: new Date()
    });


    /* if($('.radio-container input[type=radio]').is(':checked')) { 
        $(this).addClass('checked');
    } */
	$('.radio-container input[type=radio]:checked').parent().addClass('checked');
	$('.radio-container input[type=radio]:not(:checked)').parent().removeClass('checked');
    $('.radio-container input[type=radio]').change(function() {
        $(this).parents('.list').find('.radio-container').removeClass('checked');
        $(this).parent().addClass('checked');

    });

    function customSelect(){
        $('select.custom-select').each(function(){
            var $this = $(this), numberOfOptions = $(this).children('option').not('.select-lable').length;
          
            $this.addClass('select-hidden'); 
            $this.wrap('<div class="select"></div>');
            $this.after('<div class="select-styled"></div>');

            var $styledSelect = $this.next('div.select-styled');
            $styledSelect.text($this.children('option').eq(0).text());
          
            var $list = $('<ul />', {
                'class': 'select-options'
            }).insertAfter($styledSelect);
          
            for (var i = 0; i < numberOfOptions; i++) {
                var listItem = $('<li />', {
                    text: $this.children('option').not('.select-lable').eq(i).text(),
                    rel: $this.children('option').not('.select-lable').eq(i).val()
                }).appendTo($list);
				
				var attr = $this.children('option').not('.select-lable').eq(i).attr('data-img');
				if (typeof attr !== 'undefined' && attr !== false) {
					listItem.prepend('<div class="img"><img src="images/'+ attr +'"></div>');
				}
            }
          
            var $listItems = $list.children('li');
          
            $styledSelect.click(function(e) {
                e.stopPropagation();
                $('div.select-styled.active').not(this).each(function(){
                    $(this).removeClass('active').next('ul.select-options').slideUp();
                });
                $(this).toggleClass('active').next('ul.select-options').slideToggle();
            });
          
            $listItems.on('click', function(e) {
                e.stopPropagation();
                $styledSelect.text($(this).text()).removeClass('active');
                $this.val($(this).attr('rel')).trigger('change');
                $list.slideUp();
				
				if($this.find('.select-lable').length && $(this).closest('.select-wrapper').find('label.select-lable').length == 0){
					$('<label />', {
						'text': $this.find('.select-lable').text(),
						'class': 'select-lable'
					}).prependTo($(this).closest('.select-wrapper'));
					
					$styledSelect.addClass('selected');
					$styledSelect.prev('select.custom-select').addClass('selected');
				}
				
            });
          
            $(document).click(function() {
                $styledSelect.removeClass('active');
                $list.slideUp();
            });

        });
		
		$('select.custom-select').on('change', function(){
			if($(this).find('.select-lable').length && $(this).closest('.select-wrapper').find('label.select-lable').length == 0){
				$('<label />', {
					'text': $(this).find('.select-lable').text(),
					'class': 'select-lable'
				}).prependTo($(this).closest('.select-wrapper'));
				
				$(this).next('.select-styled').addClass('selected');
				$(this).addClass('selected');
			}
		});
		
		if($(window).width() < 1024){
			$('.select-styled').hide();
			$('.select select').show();
		}else{
			$('.select-styled').show();
			$('.select select').hide();
		}
    }

	var resizeTimer;
	$(window).resize(function(){
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(function(){
			if($(window).width() < 1024){
				$('.select-styled').hide();
				$('.select select').show();
			}else{
				$('.select-styled').show();
				$('.select select').hide();
				$('.select').each(function(){
					var selectVal = $(this).find('select').val();
					$(this).find(".select-options li[rel='"+ selectVal +"']").trigger('click');
				});
				
			}
		},300);
	});
	
    customSelect();
	
	// handle click event on search input
	$(document).off('click').on('click', '.input-dropdown .input-field', function(){
		$(this).addClass('open');
		$(this).parent().find('.input-option').slideDown(400);
		$(".input-dropdown .input-field").trigger('keyup'); // this is for if any value is already entered
	});
	
	// search on search input
	$(".input-dropdown .input-field").on('keyup', function() {
		var value = $(this).val().toLowerCase();
		var item = 0;
		$(this).siblings('.input-option').find("li").each(function() {
			if ($(this).text().toLowerCase().search(value) > -1) {
				$(this).show();
				item++;
			}
			else {
				$(this).hide();
			}
		});
		
		// if no items found hide block else show it
		if(item == 0) {
			$('.input-dropdown .input-field').removeClass('open');
			$('.input-option').slideUp();
		}
		else {
			$('.input-dropdown .input-field').addClass('open');
			$('.input-option').slideDown();
		}
	});
	
	// set value on selection
	$('.input-dropdown .input-option li').off('click').on('click', function() {
		$('.input-dropdown .input-field').removeClass('open');
		$('.input-option').slideUp();
		$('.input-dropdown .input-field').val($(this).text());
	});
	
	// close search on outside click
	$(document).on('click', function (e) {
		e.stopPropagation();

		var dropdownContainer = $('.input-dropdown');
		if (dropdownContainer.has(e.target).length === 0) {
			$('.input-dropdown .input-field').removeClass('open');
			$('.input-option').slideUp();
		}
	});
});
