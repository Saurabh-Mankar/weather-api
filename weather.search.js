function ajaxSearch() {
    try {
        let inputValue = $("#inputId").val();
        inputValue = inputValue || "MUMBAI";

        $("#inputId").val(inputValue);

        let APPID = "7023923dd26a725da995c75b65864de5";

        let url = "http://api.openweathermap.org/data/2.5/forecast"
        let inputData = { "q": inputValue, "APPID": APPID, "units": "metric" };

        //let url = "http://api.openweathermap.org/data/2.5/forecast"
        //url += "?q=mumbai&appid=7023923dd26a725da995c75b65864de5";
        let jqxhr = $.get(url, inputData);

        jqxhr.done(function (data) {
            paintPage(data);
        });

        jqxhr.fail(function (xhr, status, err) {
            console.log(err);
            alert("INVALID INPUT");
        });

    } catch (err) {
        console.log(err);
    }
}
function paintPage(data) {
    try {
        for (let i = 0; i < data.list.length; i++) {
            let items = data.list[i];

            let refblock = document.getElementById("refblock");
            let clone = refblock.cloneNode(true);
            clone.removeAttribute("id");
            clone.style.display = "block";

            let dref = new Date(items.dt * 1000);
            let sdate = dref.getDate() + "-" + (dref.getMonth() + 1) + "-" + dref.getFullYear() + " " + dref.getHours() + ":" + dref.getMinutes();

            clone.children[0].children[0].innerHTML = $("#inputId").val();
            clone.children[0].children[1].innerHTML = sdate;

            let min = "Min  " + items.main.temp_min + "<sup>o</sup> c"
            let max = "Max  " + items.main.temp_max + "<sup>o</sup> c"

            clone.children[0].children[2].innerHTML = min;
            clone.children[0].children[3].innerHTML = max;
            clone.children[0].children[4].innerHTML = items.weather[0].description;

            let parent = document.getElementById("parent");
            parent.appendChild(clone);
        }

    } catch (err) {
        console.log(err);
    }
}

// DEFAULT CALL
$(document).ready(function () {
    ajaxSearch();
});
