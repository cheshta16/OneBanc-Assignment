// api url
const api_url = 
    "https://dev.onebanc.ai/assignment.asmx/GetTransactionHistory?userId=1&recipientId=2";
  
// Defining async function
async function getresponse(url) {
    
    // Storing response
    const response = await fetch(url);
    
    // Storing data in form of JSON
    var data = await response.json();
    console.log(data);
    if (response) {
        hideloader();
    }
    Transaction(data);
}

// Calling that async function
getresponse(api_url);
  
// Function to hide the loader
function hideloader() {
    document.getElementById('loading').style.display = 'none';
}

//Comparer Function 
function GetSortOrder(prop) {    
    return function(a, b) {    
        if (a[prop] > b[prop]) {    
            return 1;    
        } else if (a[prop] < b[prop]) {    
            return -1;    
        }    
        return 0;    
    }    
}    

// Function to define innerHTML for HTML table
function Transaction(data) {
    var month = new Array();
    month[0] = "Jan";
    month[1] = "Feb";
    month[2] = "Mar";
    month[3] = "Apr";
    month[4] = "May";
    month[5] = "Jun";
    month[6] = "Jul";
    month[7] = "Aug";
    month[8] = "Sep";
    month[9] = "Oct";
    month[10] = "Nov";
    month[11] = "Dec";


    // Sorting Json object using Comparer Function
    data.transactions.sort(GetSortOrder("startDate"));

    for (var i = 0; i < data.transactions.length; i++) {
        var amount = data.transactions[i].amount;
        var id = data.transactions[i].id;
        var des = data.transactions[i].description;

        var dt = new Date(data.transactions[i].startDate);
        var year = dt.getFullYear();
        var m = dt.getMonth();
        var d = dt.getDate();
        
        // 12-hours AMPM Format
        var hours = dt.getHours();
        var min = dt.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        min = min < 10 ? '0'+min : min;
        var strTime = hours + ':' + min + ' ' + ampm;
        
        var date = '';
        var datetime = '';
        date += d + " " + month[m] + " " + year;
        datetime += month[m] + " " + d + ", " + strTime;

        var tab = '';
        
        if (data.transactions[i].direction === 1 ) {
            if (data.transactions[i].type === 2 ) {
                tab += '<div class="time">';
        tab += ' ' + '<span><i class="fas fa-clock"></i>' + ' ' + date + '</p>';
                tab += '<div class="left pending" >';
            }
            if (data.transactions[i].type === 1 && data.transactions[i].amount===1000.0) {
                tab += '<div class="time">';
        tab += ' ' + '<span><i class="fas fa-clock"></i>' + ' ' + date + '</p>';
                tab += '<div class="left send">';
                
            }
            if (data.transactions[i].type === 1 && data.transactions[i].amount===10000.0) {
                tab += '<div class="left send">';
                
            }

        }
        if (data.transactions[i].direction === 2) {
            if (data.transactions[i].type === 1) {
                tab += '<div class="time">';
        tab += ' ' + '<span><i class="fas fa-clock"></i>' + ' ' + date + '</p>';
                tab += '<div class="right send" >';
            }
            if (data.transactions[i].type === 2) {
                tab += '<div class="right pending get">';
            }
        }

        tab += '<div class="l-text">';
        tab += '<span><i class="fas fa-rupee-sign"></i>' + amount + '</span><p>' + des + '</p>';

        if (data.transactions[i].status === 1) {
            if (data.transactions[i].direction === 1) {
                tab += '<button class="btn">Cancel</button> </div >';
            }
            if (data.transactions[i].direction === 2) {
                tab += '<div class="buttons"><button class="btn-sm" > Pay</button >';
                tab += '<button class="btn">Decline</button></div ></div >';
            }
        }
        if (data.transactions[i].status === 2) {
            tab += '<p> Transaction ID</p><p>' + id + '</p></div>';
        }

        tab += '<div class="r-text"><span><i class="fas fa-';

        if (data.transactions[i].status === 1) {
            if (data.transactions[i].direction === 1) {
                tab += 'link"></i> You requested</span>';
            }
            if (data.transactions[i].direction === 2) {
                tab += 'link"></i>  Request received</span>';
            }
        }
        if (data.transactions[i].status === 2) {
            if (data.transactions[i].direction === 1) {
                tab += 'check"></i> You paid</span>';
            }
            if (data.transactions[i].direction === 2) {
                tab += 'check"></i> You recieved</span>';
            }
        }

        tab += '<i class="fas fa-chevron-right"></i></div></div >';

        if (data.transactions[i].direction === 1) {
            tab += '<p class="time-left">' + datetime + '</p>';
        }
        if (data.transactions[i].direction === 2) {
            tab += '<p class="time-right">' + datetime +'</p>';
        }
    
        // Setting innerHTML as tab variable
        var Div1 = document.createElement("div");
        Div1.innerHTML = tab;
        document.getElementById('box').appendChild(Div1);
    }
}

