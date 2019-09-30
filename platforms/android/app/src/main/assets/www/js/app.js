/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var animate_logo = function(){
  let loader = $('#loader');
  let items = [
    'saturate',
    'grayscale',
    'contrast',
    'brightness',
    'invert',
    'sepia',
    'huerotate',
  ];
  for (item in items){
   $('#logo').removeClass(item);
  }
  $('#logo').addClass(items[Math.floor(Math.random()*items.length)]);

  /*Filter styles*/
  $('#logo').addClass(item);
};
$('.toast').toast('hide');

var doOnOrientationChange = function (){
  console.log(window.innerHeight + " Height")
  if(window.innerHeight < 400){
    $('#logo').attr('style', 'height: 150px!important');
  }  
  if(window.innerHeight > 400){
    $('#logo').attr('style', 'height: 200px!important');
  }
  console.log(window.innerWidth + " Width")
  
  if($('#logo').length){
    animate_logo();
    switch(window.orientation){ 
      case 90:
        $("#formBuscarAuto").css('margin-top','0px');
        $("#formBuscarAuto").css('margin-bottom','0px');
        $("#send_search").css('margin-top','5%');

        $('.form-group').css('margin-bottom','0px');
        $('.col6').css('width','50%');
        $('#logo').attr('src', 'img/logo.png');      break;
      default:
        $("#send_search").css('margin-top','5%');
        $("#formBuscarAuto").css('margin-top','5%');
        $("#formBuscarAuto").css('margin-bottom','5%');
        $('.form-group').css('margin-bottom','5%');
        $('.col6').css('width','100%');
        $('#logo').attr('src', 'img/logo_deposito.png');
      break;
    }   
  }
}
let tabs      = $(".my-tabs"); 
let loader    = $("#loader"); 
let consultar = $("#consultar"); 
let result    = $("#result"); 
let historial = $("#historial"); 
var send_search = function(){
 

  let url = "https://barbellate-lights.000webhostapp.com";

  let params = {
    auth_token: 'z9KdkBgWansrozTK9wcy',
    plate_number: $('#InputPlaca').val(),
    serial_number: $('#InputSerie').val()
  };

  $('#InputPlaca').removeClass('error-input');
  $('#InputSerie').removeClass('error-input');

  if(params.plate_number == ''){
    $('#InputPlaca').addClass('error-input')
  }
  if(params.serial_number == ''){
    $('#InputSerie').addClass('error-input')
  }

  if(params.serial_number == '' || params.plate_number == ''){
    return false;
  }


  loader.fadeIn('slow');
  $.ajax({
    type: "GET",
    url: url,
    data: params,
    error: function (rror) {
      $('.toast-body').html("Error desconocido en la conexion");
        loader.fadeOut();
    },
    }).done(function (data) {
      console.log(data)
      data = JSON.parse(data);
      img =  JSON.parse(data.img);
      data =  JSON.parse(data.data);

      $("#pae").html(data.lodge);
      
     if(data.success==false){
        console.log(3)

        $('.toast').removeClass('h0');
        $('.toast-body').html(data.error);
        $('.toast').toast('show');
      }
     else if(data.lodge=="RECLAMADO"){
        console.log(2)

        $('.toast').removeClass('h0');
        $('.toast-body').html("El vehículo se encuentra RECLAMADO");
        $('.toast').toast('show');
      }
     else if(!data.succes || data.success!=false){
        $(".plate_number").val(data.plate_number);
        $(".join_date").val(data.join_date);
        $(".parking_lot").val(data.parking_lot);
        $(".crane_name").val(data.crane_name);
        $(".authority_name").val(data.authority_name);
        $(".lodge").val(data.lodge);
        $(".crane_cost").val(data.authority_name);
        $(".crane_maneuvers").val(data.crane_maneuvers);
        
        item = '<a href="#" class="mr-2 ml-2 list-group-item list-group-item-action flex-column align-items-start ">'+
        '<div class="d-flex w-100 justify-content-between">'+
        '<h6 class="mb-1">'+data.plate_number+' '+params.serial_number+'</h6>'+
        '<small> '+data.join_date +' </small>'+
        '</div>'+
        '<p class="mb-1">'+data.lodge+'</p>'+
        '<small> '+data.authority_name+' '+data.authority_name+' .</small>'+
        '</a> ';
        $("#history").append(item);
          console.log(item);
        loader.fadeIn('slow');
        tabs.attr('style', 'display:none!important;');
        result.fadeIn()
      }
    
      let images = $('#images')
      for(x in img){
        images.append('<div class="col"><img width="100px" src="http://201.131.6.16/'+img[x]+'"></div>');
      }
      loader.fadeOut();

    });
            
}



tabs.attr('style', 'display:none!important;');
loader.fadeOut();
consultar.fadeIn('slow');

$('.nav-link').click(function(e){
  e.preventDefault();
  loader.fadeIn('slow');
  tabs.attr('style', 'display:none!important;');
  $($(this).attr('href')).fadeIn()
  loader.fadeOut();
  $("#navbarText").collapse('toggle');

})
function myFunction() {
  $('.hamburger-icon').toggleClass("change");
}


var app = {
  initialize: function() {},
  onDeviceReady: function() {
    animate_logo();
  },
  receivedEvent: function(id) {}
};

app.initialize();

$("#loader").fadeOut();

$('#send_search').click(send_search);

window.addEventListener('orientationchange', doOnOrientationChange);

// First launch
doOnOrientationChange();    
