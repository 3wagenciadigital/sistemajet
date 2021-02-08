import { _alert } from "./message";
import { setInStorage } from "./storage";
import { getFromStorage } from "./storage";
import { isValidEmail } from "./validate";

$(function(){

    var FRONT = {
        onChangeInput:function(){
           
                var name = $(this).attr("name");
                $("."+name).html($(this).val())
           
        },
        formSubmit:function(){
            var fname = $('[name="fname"]').val();
            var femail = $('[name="femail"]').val();
            var fphone = $('[name="fphone"]').val();
            var fsubject = $('[name="fsubject"]').val();
            var fcontent = $('[name="fcontent"]').val();

            if(fname=='' || femail=='' || fphone=='' || fsubject=='' || fcontent==''){
                FRONT.setMessage("Preencha todos os campos do formulário");
                return false;
            }
            if(fphone.length<15){
                FRONT.setMessage("Número do telefone esta incorreto");
                return false;
            }
            
            if(!isValidEmail(femail)){
                FRONT.setMessage("E-mail informado não é válido");
                return false;
            }

            setInStorage('fname',fname);
            setInStorage('femail',femail);
            setInStorage('fphone',fphone);
            setInStorage('fsubject',fsubject);
            setInStorage('fcontent',fcontent);
            _alert("Sucesso","Os dados foram salvos com sucesso","success");
            
            setTimeout(function(){
                window.location.href="/hotsite/front_end_views";
            },1000);
           
            return false; 

        },
        setMessage:function(content){
            $(".ui.message.form-message p").text(content);
            $(".ui.message.form-message").show();
        },
        clearData:function(){
            setInStorage('fname',"");
            setInStorage('femail',"");
            setInStorage('fphone',"");
            setInStorage('fsubject',"");
            setInStorage('fcontent',"");
            _alert("Sucesso","Os dados foram apagados com sucesso","success");
            
            FRONT.loadData();
   
            setTimeout(function(){
                window.location.href="/hotsite/front_end";
            },1000);
            return false;
        },
        loadData:function(){
             
        var fname = getFromStorage('fname');
        var femail = getFromStorage('femail');
        var fphone = getFromStorage('fphone');
        var fsubject = getFromStorage('fsubject');
        var fcontent = getFromStorage('fcontent'); 

        $('[name="fname"]').val(fname);
        $('[name="femail"]').val(femail);
        $('[name="fphone"]').val(fphone);
        $('[name="fsubject"]').val(fsubject);
        $('[name="fcontent"]').val(fcontent);
        $(".fname").html(fname);
        $(".femail").html(femail);
        $(".fphone").html(fphone);
        $(".fsubject").html(fsubject);
        $(".fcontent").html(fcontent);

        }
    }

    $('input, textarea').on('keypress keyup change',FRONT.onChangeInput)
    $('.formMessage').on('submit',FRONT.formSubmit);
    $('.btnDelete').on('click',FRONT.clearData);

    if($('.page-result').length){
        FRONT.loadData();
    }
    
 

})