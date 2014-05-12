$( document ).ready(function() {
    
    train_localization();
    update_location();

    setInterval(function(){
      update_location();
    },5000);
});


function update_location(){
    var path = "./download_from_webserver.php"; 
    $.ajax({
      url: path,
      type: 'post',
      data: {'post': 'true'},
      success: function(data, status) {
        console.log("SUCCESS");
        console.log(data);
            sample_localization();
        },
      error: function(xhr, desc, err) {
        console.log(xhr);
        console.log("Details: " + desc + "\nError:" + err);
      }
    }); // end ajax call
}


function train_localization(){
  classifier_path = "./train_localization.php"
  $.ajax({
      url: classifier_path,
      type: 'post',
      data: {'post': 'true'},
      success: function(data, status) {
        console.log("SUCCESS");
        console.log(data);
      },
      error: function(xhr, desc, err) {
        console.log("error in calling python file");
        console.log(xhr);
        console.log("Details: " + desc + "\nError:" + err);
      }
    }); // end ajax call
}

function sample_localization(){
  classifier_path = "./sample_localization.php"
  $.ajax({
      url: classifier_path,
      type: 'post',
      data: {'post': 'true'},
      success: function(data, status) {
        console.log("SUCCESS");
        console.log("log data= "+data);

	room_num = parseInt(data, 10);

        change_location_of_user(room_num);
        },
      error: function(xhr, desc, err) {
        console.log("error in calling python file");
        console.log(xhr);
        console.log("Details: " + desc + "\nError:" + err);
      }
    }); // end ajax call
}


//room_number is an identifier for which room you want to draw a circle on.
//1 = kitchen
//2 = dinning room
//3 = meeting room
//4 = guest bedroom
//5 = bathroom
//6 = sewing room
function change_location_of_user(room_number){
  console.log("updating the location of the user");
  xCoordinate = 0;
  yCoordinate = 0;

  if(room_number == 1){
    xCoordinate = 500;
    yCoordinate = 300;
  }
  else if(room_number == 2){
    xCoordinate = 520;
    yCoordinate = 130;
  }
  else if(room_number == 3){
    xCoordinate = 350;
    yCoordinate = 100;
  }
  else if(room_number == 4){
    xCoordinate = 100;
    yCoordinate = 350;
  }
  else if(room_number == 5){
    xCoordinate = 160;
    yCoordinate = 160;
  }
  else if(room_number == 6){
    xCoordinate = 65;
    yCoordinate = 180;
  }else{
    alert("Wrong Room Number inputed");
  }


  var circle = svg.append("circle")
                          .attr("cx", xCoordinate)
                          .attr("cy", yCoordinate)
                          .attr("r", 7)
                          .style("fill", "red");
  
  var text = svg.selectAll("text")
                        .data(circle)
                       .enter()
                      .append("text");

  text.attr("x", xCoordinate + 10)
      .attr("y", yCoordinate + 5)
      .text("Android");

}

