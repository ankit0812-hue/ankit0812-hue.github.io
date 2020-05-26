function globalstats() {
    var request = new XMLHttpRequest();
    request.open("GET",'https://api.covid19api.com/summary',true);
    request.send();
    request.onload = function(){
        let data = JSON.parse(request.response);
        for(let i=1;i<=6;i++)
        {
            var stats = document.getElementById('statistics');
            var columns = document.createElement("div");
            var card = document.createElement("div");
            var card_body = document.createElement("div");
            columns.className = "col-md-2 col-sm-4 col-12 columns";
            card.className = "card";
            card_body.className = "card-body";
            if(i==1){
                card_body.innerHTML = (`
                <h6 class="new-confirmed">New Confirmed Cases</h6>
                 <p class="new-confirmed">${data.Global.NewConfirmed}</p>                
                `);
            }
            else if(i==2){
                card_body.innerHTML = (`
                <h6 class="total-confirmed">Total Confirmed Cases</h6>
                 <p class="total-confirmed">${data.Global.TotalConfirmed}</p>                
                `);
            }
            else if(i==3){
                card_body.innerHTML = (`
                <h6 class="new-deaths">New Death Cases</h6>
                 <p class="new-deaths">${data.Global.NewDeaths}</p>                
                `);
            }
            else if(i==4){
                card_body.innerHTML = (`
                <h6 class="total-deaths">Total Death Cases</h6>
                 <p class="total-deaths">${data.Global.TotalDeaths}</p>                
                `);
            }
            else if(i==5){
                card_body.innerHTML = (`
                <h6 class="new-recovered">New Recovered Cases</h6>
                 <p class="new-recovered">${data.Global.NewRecovered}</p>                
                `);
            }
            else {
                card_body.innerHTML = (`
                <h6 class="total-recovered">Total Recovered Cases</h6>
                 <p class="total-recovered">${data.Global.TotalRecovered}</p>                
                `);
            }

            card.appendChild(card_body);
            columns.appendChild(card);
            stats.appendChild(columns);

        }

        var ctx = document.getElementById('bar-graph').getContext('2d');
        var chart = new Chart(ctx,{
            type: 'bar',
            maintainAspectRatio: false,
            data :{
                labels: ['New Confirmed Cases','Total Confirmed Cases','New Death Cases','Total Death Cases','New Recovered Cases','Total Recovered Cases'],
                datasets: [{
                    label: "Number of Cases",
                    data: [data.Global.NewConfirmed,data.Global.TotalConfirmed,data.Global.NewDeaths,data.Global.TotalDeaths,data.Global.NewRecovered,data.Global.TotalRecovered],
                    backgroundColor: ['#ff073a','#007bff','#ffc107','#20c997','#28a745','#201aa2dd'],
                    borderColor: ['#ff073a','#007bff','#ffc107','#20c997','#28a745','#201aa2dd'],
                    borderWidth: 1
                }]

            },
            options: {
                scales: {
                    xAxes: [{
                        barPercentage: 0.3
                    }]
                }
            }
        });

        var cty = document.getElementById('line-graph').getContext('2d');
        var lchart = new Chart(cty, {
        type: 'line',
        data: {
        labels: ['New Confirmed Cases','Total Confirmed Cases','New Death Cases','Total Death Cases','New Recovered Cases','Total Recovered Cases'],
        datasets: [{
            label: 'Number of Cases',
            backgroundColor: '#161625',
            borderColor: '#007bff',
            data: [data.Global.NewConfirmed,data.Global.TotalConfirmed,data.Global.NewDeaths,data.Global.TotalDeaths,data.Global.NewRecovered,data.Global.TotalRecovered]
        }]
    },
    options: {}
});
        
    }
}

var searchButton = document.getElementById('search-btn');
searchButton.addEventListener('click',() =>{
    var country_name = document.getElementById('country').value;
    if(country_name=="United States of America"||country_name=="America"||country_name=="USA"){
        country_name = "US";
    }
        var request = new XMLHttpRequest();
        request.open('GET',`https://covid2019-api.herokuapp.com/v2/country/${country_name}`,true);
        request.send();
        request.onload = function(){
            let apidata = JSON.parse(request.response);
            console.log(apidata.data.deaths);
            var stats = document.getElementById('statistics');
            stats.innerHTML = "";
            document.getElementById("title-app").innerHTML = country_name + "'s Statistics";
            for(var i=1;i<=4;i++)
            {
                var columns = document.createElement("div");
                var card = document.createElement("div");
                var card_body = document.createElement("div");
                columns.className = "col-md-3 col-sm-6 col-12 columns";
                card.className = "card";
                card_body.className = "card-body";
                if(i==1){
                    card_body.innerHTML = (`
                    <h6 class="confirmed-country">Confirmed Cases</h6>
                     <p class="confirmed-country">${apidata.data.confirmed}</p>                
                    `);
                }
                else if(i==2){
                    card_body.innerHTML = (`
                    <h6 class="death-country">Death Cases</h6>
                     <p class="death-country">${apidata.data.deaths}</p>                
                    `);
                }
                else if(i==3){
                    card_body.innerHTML = (`
                    <h6 class="recovered-country">Recovered Cases</h6>
                     <p class="recovered-country">${apidata.data.recovered}</p>                
                    `);
                }
                else if(i==4){
                    card_body.innerHTML = (`
                    <h6 class="active-country">Active Cases</h6>
                     <p class="active-country">${apidata.data.active}</p>                
                    `);
                }
                card.appendChild(card_body);
                columns.appendChild(card);
                stats.appendChild(columns);
            }

            var ctx = document.getElementById('bar-graph').getContext('2d');
        var chart = new Chart(ctx,{
            type: 'bar',
            maintainAspectRatio: false,
            data :{
                labels: ['Confirmed Cases','Death Cases','Recovered Cases','Active Cases'],
                datasets: [{
                    label: "Number of Cases",
                    data: [apidata.data.confirmed,apidata.data.deaths,apidata.data.recovered,apidata.data.active],
                    backgroundColor: ['#ff073a','#007bff','#ffc107','#20c997'],
                    borderColor: ['#ff073a','#007bff','#ffc107','#20c997'],
                    borderWidth: 1
                }]

            },
            options: {
                scales: {
                    xAxes: [{
                        barPercentage: 0.3
                    }]
                }
            }
        });

        var cty = document.getElementById('line-graph').getContext('2d');
        var lchart = new Chart(cty, {
        type: 'line',
        data: {
        labels:  ['Confirmed Cases','Death Cases','Recovered Cases','Active Cases'],
        datasets: [{
            label: 'Number of Cases',
            backgroundColor: '#161625',
            borderColor: '#007bff',
            data: [apidata.data.confirmed,apidata.data.deaths,apidata.data.recovered,apidata.data.active]
        }]
    },
    options: {}
});
         
        }
});
