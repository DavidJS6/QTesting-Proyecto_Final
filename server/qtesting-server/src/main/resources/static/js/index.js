$(function () {

    // https://codeseven.github.io/toastr/

    $("#register-button").click(function () {
        var name = document.getElementById("name-txt").value;
        console.log(name);
        if(name !== ""){
            registerUser(name);
        }else{
            toastr.warning("Debe ingresar un nombre");
        }
    });

    $("#login-button").click(function () {
        var name = document.getElementById("name-txt").value;
        if(name !== ""){
            login(name);
        }else{
            toastr.warning("Debe ingresar un nombre");
        }
    });

    $("#income-button").click(function () {
        var amount = document.getElementById("amount-txt").value;
        if(amount !== ""){
            registerIncome(localStorage.getItem("name"), amount);
        }else{
            toastr.warning("Debe ingresar un monto");
        }
    });

    $("#withdrawal-button").click(function () {
        var amount = document.getElementById("amount-txt").value;
        if(amount !== ""){
            registerWithdrawal(localStorage.getItem("name"), amount);
        }else{
            toastr.warning("Debe ingresar un monto");
        }
    });

    /*-------------------------------------------------------------------------*/

    function registerUser(name){
        $.ajax({
            url: '/register-user',
            type: 'POST',
            contentType : 'application/json; charset=utf-8',
            dataType: 'json',
            data: JSON.stringify({
                name: name
            }),
            success: function(response){
                console.log(response);
                localStorage.setItem("name", name);
                $("#user-name").text(response.user.name);
                $("#registration-block").css("display", "none");
                $("#transaction-block").css("display", "block");
            },
            error: function(response){
                console.log(response);
                toastr.error(response.responseJSON.message);
            }
        });
    }

    function login(name){
        $.ajax({
            url: '/login-user',
            type: 'POST',
            contentType : 'application/json; charset=utf-8',
            dataType: 'json',
            data: JSON.stringify({
                name: name
            }),
            success: function(response){
                console.log(response);
                localStorage.setItem("name", name);
                $("#user-name").text(response.user.name);
                $("#registration-block").css("display", "none");
                $("#transaction-block").css("display", "block");
                updateView(response.user);
            },
            error: function(response){
                console.log(response);
                toastr.error(response.responseJSON.message);
            }
        });
    }

    function registerIncome(name, amount){
        $.ajax({
            url: '/register-income',
            type: 'POST',
            contentType : 'application/json; charset=utf-8',
            dataType: 'json',
            data: JSON.stringify({
                userName: name,
                transactionAmount: amount
            }),
            success: function(response){
                console.log(response);
                updateView(response.user);
            },
            error: function(response){
                console.log(response);
                toastr.error(response.responseJSON.message);
            }
        });
    }

    function registerWithdrawal(name, amount){
        $.ajax({
            url: '/register-withdrawal',
            type: 'POST',
            contentType : 'application/json; charset=utf-8',
            dataType: 'json',
            data: JSON.stringify({
                userName: name,
                transactionAmount: amount
            }),
            success: function(response){
                console.log(response);
                updateView(response.user);
            },
            error: function(response){
                console.log(response);
                toastr.error(response.responseJSON.message);
            }
        });
    }

    function updateView(user){
        if(user.balance === 0 && user.balanceDetail.length === 0){
            return;
        }

        $("#balance-detail").css("display", "block");
        $("#balance-amount").text(user.balance);
        $(".item").remove();
        user.balanceDetail.forEach(showTransaction);
    }

    function showTransaction(item, index){
        var current_datetime = new Date(item.transactionDate);
        var formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds()

        var sign = item.transactionType === "Retiro" ? '-':'';
        var className = item.transactionType === "Retiro" ? "withdrawal-transaction":'income-transaction';
        var newItem =   "<tr class='item " + className + "' >" +
                            "<td>" + item.transactionType + "</td>" +
                            "<td>" + formatted_date + "</td>" +
                            //"<td>" + item.transactionDate + "</td>" +
                            "<td>" + sign + item.amount + "</td>" +
                        "</tr>";
        $("#balance-table").append(newItem);
    }

});

