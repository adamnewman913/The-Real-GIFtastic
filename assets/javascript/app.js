$(document).ready(function(){
    var topics = ['My Lady', 'Kansas City Royals', 'Kansas City Chiefs', 'Kansas Jayhawks', 'The Office', 
    'Stranger Things', 'Tom Brady Upset', 'Oreos', 'The Beatles', 'Kanye West', 'Harry Potter', 'Coding Bootcamp', 'Patrick Mahomes'];

    

 
    function buttonExpress(){
        $('#buttonsView').empty();
        
        for ( var i=0; i < topics.length; i++) {
            var a = $('<button>');
            a.addClass('expression');
            a.attr('data-name', topics[i]);
            a.text(topics[i]);
            $('#buttonsView').append(a);
        }
    }    
    buttonExpress();
   


  $(document).on('click', '.expression', function() {

    var newGif = $(this).html(); 
    console.log(newGif);
    
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + newGif + "&api_key=dc6zaTOxFJmzC&limit=10";
        
        $.ajax({url: queryURL, method: 'GET'})
        .done(function(response) {
            
            var results = response.data;
           
            $('#expressView').empty();
                
                for ( var j=0; j < results.length; j++) {
                    var imageDiv = $('<div>');
                    var imageView = results[j].images.fixed_height.url;
                    var still = results[j].images.fixed_height_still.url;
                      
                    var expressImage = $('<img>').attr("src", still).attr('data-animate', imageView).attr('data-still', still);
                    expressImage.attr('data-state', 'still');
                    $('#expressView').prepend(expressImage);
                    expressImage.on('click', playGif);
                    
                    
                        var rating = results[j].rating;
                            
                        var displayRated= $('<p>').text("Rating: " + rating);
                        $('#expressView').prepend(displayRated);
            
                } 
        });  

        function playGif() { 
                    var state = $(this).attr('data-state');
                    console.log(state);
                 if ( state == 'still'){
                     $(this).attr('src', $(this).data('animate'));
                     $(this).attr('data-state', 'animate');
                 } else {
                     $(this).attr('src', $(this).data('still'));
                     $(this).attr('data-state', 'still');
                    }

                } 
                
    }) 

       



$(document).on('click', '#addExpress', function(){
    if ($('#express-input').val().trim() == ''){
      alert('Ya need to type something dude!');
   }
   else {
    var newGif = $('#express-input').val().trim();
    topics.push(newGif);
    $('#express-input').val('');
    buttonExpress();
    return false;

    }

});



});