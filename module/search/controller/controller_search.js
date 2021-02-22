function load_brands(condition = $(".select-condition-search").val()) {
    $.ajax({
        type: 'GET',
        dataType: 'JSON',
        url: 'module/search/controller/controller_search.php?op=load_brands&condition='+condition,
    }).done(function (jsonSearch) {
        $('.select-brand-search').empty();
        $("<option></option>").attr({'value':'%','disabled':'disabled'}).append(document.createTextNode("Brand")).appendTo(".select-brand-search");
        $.each(jsonSearch, function (i, item) {
            $("<option></option>").attr({ 'value': jsonSearch[i]["brand"] }).append(document.createTextNode(jsonSearch[i]["brand"] + "  " + jsonSearch[i]["num"])).appendTo(".select-brand-search");
        });
    }).fail(function (jqXHR, textStatus, errorThrown) {
        if (console && console.log) {
            console.log("Error name/code: " + textStatus);
        }
    });
}
function load_autocomplete(keyword) {
    $.ajax({
        type: 'GET',
        dataType: 'JSON',
        url: 'module/search/controller/controller_search.php?op=load_autocomplete&keyword='+keyword+"&condition="+$(".select-condition-search").val()+"&brand="+$(".select-brand-search").val(),
    }).done(function (jsonSearch) {
        $('#autocomplete-containter').empty();
        $.each(jsonSearch, function (i, item) {
            $("<div></div>").attr({ 'id':jsonSearch[i]["model"],'class':'autocomplete-item'}).append(document.createTextNode(jsonSearch[i]['model'])).appendTo("#autocomplete-containter");
        });

    }).fail(function (jqXHR, textStatus, errorThrown) {
            $('#autocomplete-containter').empty();
    });

}
$(document).ready(function () {
    $(document).on("change", ".select-condition-search", function () {
        load_brands();
    });
    $(document).on("click", ".autocomplete-item", function () {
        // alert(this.getAttribute("id"));
        $(".search-input").val(this.getAttribute("id"));
        // $(".search-input").append(document.createTextNode(this.getAttribute("id")));
    });
    $("body").click(function() {
        $("#autocomplete-containter").empty();
    });
    $(document).on("keyup", ".search-input", function (tecla) {
        load_autocomplete($(".search-input").val());
        if (tecla.keyCode == 13) {
            localStorage.setItem("op", "search");
            localStorage.setItem("value", "global");
            localStorage.setItem("brand", $(".select-brand-search").val());
            localStorage.setItem("condition", $(".select-condition-search").val());
            localStorage.setItem("keyword",$(".search-input").val());
            window.location.href = "index.php?page=shop&op=list";
        }
        
    });
});