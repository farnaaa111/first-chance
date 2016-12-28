$(document).ready(function () {
    var date = new Date();
    var year = "2014";
    var month = "12";
    var day = date.getDate();

    var ul = $('.calendar-days ul');
    for (var i = 0; i < 31; i++) {
        $(ul).append('<li class="december day-' + (i + 1) + '">' + (i + 1) + '</li>');
    }
    for (var i = 0; i < 11; i++) {
        $(ul).append('<li class="out-from-month">' + (i + 1) + '</li>');
    }

    $('.day-' + day).addClass('calendar-selected');

    var data = year + "-" + month + '-' + day;

    fillTable(data);
});

$(document).on('click', '.calendar-days ul li.december', function (e) {
    var date = new Date();
    var year = "2014";
    var month = "12";
    var day = $(this).html();

    if (date.getDate() >= $(this).html()) {
        $('.calendar-days ul li.december').removeClass('calendar-selected');
        $(this).addClass("calendar-selected");
    }

    var data = year + "-" + month + '-' + day;

    fillTable(data);
});

function fillTable(data) {
    $.ajax({
        url: "https://europe-bet.com/Top20/Seka/SekaHandler.ashx",
        type: 'GET',
        data: { date: data },
        success: function (response) {
            var myString = "";

            for (var i = 0; i < response.length; i++) {
                myString += "<tr>";
                myString += ("<td>" + (i + 1) + "</td><td>" + response[i].userName + "</td><td>" + response[i].userRating + "</td><td>" + response[i].payout + "</td>");
                myString += "</tr>";
            }

            $('.grid-list tbody').html("");
            $('.grid-list tbody').append(myString);
        }
    });
}