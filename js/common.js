
$(document).ready(function() {
	$(".loader").delay(2500).fadeOut(function (){ 
		setTimeout(function () {
				$(".top_text h1").animated("fadeInDown", "fadeOutUp");
				$(".top_text p").animated("fadeInUp", "fadeOutDown");
		}, 50);
	});
  function heightDetect() {
		$(".main_head").css("height", $(window).height());
		
	};
	
	heightDetect();
	
	$(window).resize(function() {
		heightDetect();
	});
  
	$(".form").submit(function(event) {
			var form_data = $(this).serialize();
				event.preventDefault();
				//console.log(form_data);
				if (cFM_checktrueAttr($(this))) {
					send_data(form_data);
				}
		
  });
	function send_data(form_data) {
					$.ajax({
			type: "POST",
			url: "https://formspree.io/freepe@protonmail.com",
			data: form_data,
			success: function() {
				alert("Ваши данные приняты в обработку. Приятного дня!");
			},
				error: function(){alert('Что-то пошло не так');}
		});	
	}
});

$(window).load(function() {
	$("#teamExtend").click(function(){
	$(".other_workers").css("display","block").addClass("animated fadeIn");
	$(this).css("display","none");
	});
	var clock;

			

				// Grab the current date
				var currentDate = new Date();

				// Set some date in the future. In this case, it's always Jan 1
				var futureDate  = new Date(2017, 3, 1);

				// Calculate the difference in seconds between the future and current date
				var diff = futureDate.getTime() / 1000 - ( currentDate.getTime() ) / 1000 - 3600;

                // Instantiate a coutdown FlipClock
                if($('.clock').length) {
                    clock = $('.clock').FlipClock(diff, {
                    clockFace: 'DailyCounter',
                    countdown: true
                });
                }
			
	$('.stat').on('inview', function(event, isInView) {
  if (isInView) {
		$('#numberFtl').animateNumber({ number: 25000},2000);
		$('#numberFby').animateNumber({ number: 250 },2000);
		$('#numberPpl').animateNumber({ number: 20 },2000);
		$('#numberVar').animateNumber({ number: 5 },2000);
		$('.stat').off('inview');
	  } else {
		
	  }
	});
	
	$('.information').on('inview', function(event, isInView) {
	  if (isInView) {
		  var elems = document.getElementsByClassName("progressbar");
		  for(var i = 0; i < elems.length; i++){
			  let reqWidth = elems[i].dataset.width;
			  let width = 0;
			  let elem = elems[i];
			  let id = setInterval(frame, 20);
			  function frame() {					
					if ( width >= reqWidth) {
					  clearInterval(id);
					} else {
					  width++;
					  elem.style.width = width + '%';
					}
				  }		
		  }
		 $('.information').off('inview');
		  } 
	});

	if ($('#back-to-top').length) {
    var scrollTrigger = 300, // px
        backToTop = function () {
            var scrollTop = $(window).scrollTop();
            if (scrollTop > scrollTrigger) {
                $('#back-to-top').addClass('show');
            } else {
                $('#back-to-top').removeClass('show');
            }
        };
    backToTop();
    $(window).on('scroll', function () {
        backToTop();
    });
    $('#back-to-top').on('click', function (e) {
        e.preventDefault();
        $('html,body').animate({
            scrollTop: 0
        }, 700);
    });
}
}); 
//FIELDS CHECKER
if(typeof cFM_classError === 'undefined')//сюда запишем css-класс, приписывающийся неправильным полям
    var cFM_classError='cFM_wrong';
     
function cFM_checktrueAttr(parent)//подготавливает данные к обработке
//(parent – jq-указатель на форму, или объединяющий блок)
{
    var error=true;
     
    //подчищаем за вызванной ранее функцией
    $('.'+cFM_classError).each(function(){//убираем подсветку ошибок
        $(this).removeClass(cFM_classError);
    });
     
    //ищем поля для проверки
    var inputsToHandle=false;
    if(typeof parent !== 'undefined')
		inputsToHandle=parent.find('[cFM_check]');
    else 
     inputsToHandle=$('[cFM_check]');//ну, а если родитель не задан – давайте уж все проверим
	 
    //хватаем найденные элементы и наблюдаем их
    inputsToHandle.each(function(){
        if(error) error=cFM_prepareChecking(this);//проверяем объекты, ищем хотя бы единственную ошибку
        else cFM_prepareChecking(this);
    }); 
    return error;//возвращаем true, если все элементы прошли ошибку, и false, если кто-то завалился

}
 
function cFM_prepareChecking(handle)// запускает проверку конкретного элемента и маркерует ошибочные
{
    var error=true; //возвращаемое значение; смысл - просто показать, что есть ошибка принимает значение: 
    var after = handle;//куда лепить сообщение об ошибке
    var attribute = $(handle).attr('cFM_check');//значение великого атрибута cFM_check
     
    //а не задали ли какую хитрую функцию для проверки поля?
    if(typeof $(handle).attr('cFM_function') !== 'undefined')
        var chkFunk=$(handle).attr('cFM_function');
         
    //наконец, проверяем поле
    if(typeof chkFunk !== 'undefined')
        error=window[chkFunk]($(handle));
    else
        error=cFM_checkFullness(handle);
     
    //коль ошибка закралась к нам
    if(error!==true)
    {
        //определяем, куда лепим сообщение об ошибке    
        if(typeof $(handle).attr('cFM_confirmInfo') !== 'undefined')
        {
            after=$(handle).attr('cFM_confirmInfo');
            if(after.indexOf('self')===0)//если вдруг селфы непойми зачем прилепили
            after=after.substr(4);
        }
		
        $(handle).addClass(cFM_classError);//добавление класса ошибки
        error=false;
    }
    return error;
}
 
function cFM_checkFullness(handle)//а это стандартная функция проверки
{
    var error = true;
     
    //считываем данные с атрибутов
    var attribute = $(handle).attr('cFM_check');
    //флаг обязательности
    var required = true;
    if(attribute.indexOf('Y')===-1)
        required=false;
    //проверка на формат
    var format=attribute;
    if(required)
        format=attribute.substr(2);
    switch($(handle).attr('type'))//смотрим, что же у нас за элемент такой
    {
        case 'checkbox': 
            if(!$(handle).prop('checked'))  error=false;
            break;
        case 'radio'://обещанная проблема с radio
            if(!$(handle).prop('checked') && $('[name="'+$(handle).attr('name')+'"]:checked').length==0)
                error=false;
            else
                error=true;
            break;
         //и text, и select, и textarea здесь идентичны
        default:
            if(($(handle).val()=='0' || $(handle).val().trim().length == 0) && required)          
                error=false;
            else
            {
                if(format==='phone')//проверка на число
                {
                    var regCheck = new RegExp('[^0-9\s-]+');
                    if(regCheck.test($(handle).val()) || $(handle).val().length < 10)
                        error='wrong';
                }
                if(format==='email')//проверка на е-мейл
                {
                    var regCheck = new RegExp("^([0-9a-zA-Z]+[-._+&])*[0-9a-zA-Z]+@([-0-9a-zA-Z]+[.])+[a-zA-Z]{2,6}$");
                    if(!regCheck.test($(handle).val()))
                        error='wrong';
                }
            }
            break;
    }
    return error;
}
