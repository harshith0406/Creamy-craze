import { Carousel, initMDB } from "mdb-ui-kit";

initMDB({ Carousel });
<script type="text/javascript" src="https://code.jquery.com/jquery-1.12.0.min.js"></script>
 
 $(document).ready(function(){
     $('.counter-value').each(function(){
         $(this).prop('Counter',0).animate({
             Counter: $(this).text()
         },{
             duration: 3500,
             easing: 'swing',
             step: function (now){
                 $(this).text(Math.ceil(now));
             }
         });
     });
 });
