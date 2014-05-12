$( document ).ready(function() {
    
    //map
    train_localization();
    update_location();

    setInterval(function(){
      d3.select("circle").remove();
      d3.select("text").remove();
      update_location();
    },5000);
    //map

    var dataStore = (function(){
      var result = [{level:0}]; 

      path = "./line_data.php";

      $.ajax({
        url: path,
        type: 'post',
        data: {'post': 'true'},
        success: function(data, status) {
          var data = eval('(' + data + ')');
          result = data;
        },
        error: function(xhr, desc, err) {
          console.log(xhr);
          console.log("Details: " + desc + "\nError:" + err);
        }
      }); // end ajax call

      return {getData : function()
      {
          if (result) return result;
          else{ console.log("ERRORROROROROOROROROR");}
          // else show some error that it isn't loaded yet;
      }};
    })();

    //line graph
          Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });
    
        var chart;
        $('#line_graph').highcharts({
            chart: {
                type: 'spline',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
                events: {
                    load: function() {
    
                        // set up the updating of the chart each second
                        var series = this.series[0];
                        setInterval(function() {
                            //data = get_data_for_linegraph();
                            console.log("=============");
                            console.log(dataStore.getData()[0].level);
                            var y = parseInt(dataStore.getData()[0].level);
                            var x = (new Date()).getTime(), // current time
                                y = y;
                            series.addPoint([x, y], true, true);
                        }, 1000);
                    }
                }
            },
            title: {
                text: 'Live random data'
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150
            },
            yAxis: {
                title: {
                    text: 'Value'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                formatter: function() {
                        return '<b>'+ this.series.name +'</b><br/>'+
                        Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) +'<br/>'+
                        Highcharts.numberFormat(this.y, 2);
                }
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [{
                name: 'Random data',
                data: (function() {
                    // generate an array of random data
                    var data = [],
                        time = (new Date()).getTime(),
                        i;
                    var y = parseInt(dataStore.getData()[0].level);
                    for (i = -19; i <= 0; i++) {
                        data.push({
                            x: time + i * 1000,
                            y: y
                        });
                    }
                    return data;
                })()
            }]
        });
    
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

function get_data_for_linegraph(){
  var path = "./line_data.php"; 
    $.ajax({
      url: path,
      type: 'post',
      data: {'post': 'true'},
      success: function(data, status) {
        var data = eval('(' + data + ')');
        all_data = data;
      },
      error: function(xhr, desc, err) {
        console.log(xhr);
        console.log("Details: " + desc + "\nError:" + err);
      }
    }); // end ajax call
}

