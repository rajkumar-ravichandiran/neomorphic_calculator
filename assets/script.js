$(document).ready(function() {
var expression = ""; // Stores the arithmetic expression
var $history = $('.history');
var display = $("#display"); // Display input field
var results = $("#results"); // result input field
var history = [];
var buttonClick = new Audio('assets/button_click.wav');
var switchToggle = new Audio('assets/switch_toggle.mp3');
var operatorClick = new Audio('assets/operator_click.mp3');
var emptyClick = new Audio('assets/empty_trash.mp3');

// Check if a mode preference is already set
var savedNotif = localStorage.getItem('notif');
if (savedNotif === 'notif-off') {
    $('html').addClass('notif-off').removeClass('notif-on');
    $('#notif-toggle').prop('checked', true);
}
// Toggle between notif mode
$('#notif-toggle').on('change', function() {
    if ($(this).is(':checked')) {
    $('html').addClass('notif-off').removeClass('notif-on');
    localStorage.setItem('notif', 'notif-off');
    } else {
    $('html').addClass('notif-on').removeClass('notif-off');
    localStorage.setItem('notif', 'notif-on');
    }
});


// Retrieve history from local storage if available
if (localStorage.getItem('calculatorHistory')) {
    history = JSON.parse(localStorage.getItem('calculatorHistory'));
    renderHistory();
}

function calculate() {
    try {
        var result = eval(expression);
        previousResult = result;
        display.text(result);
        expression += ' = ' + result;
        addToHistory(expression);
        expression = ""; // Reset expression after calculation
    } catch (error) {
        display.text("Error");
        expression = ""; // Reset expression in case of error
    }
}

function clear() {
    display.text("");
    results.text("");
    expression = "";
}

function clearHistory() {
    history = [];
    $history.empty();
    saveHistoryToLocalStorage();
}

function addToHistory(entry) {
    history.push(entry);
    renderHistory();
    saveHistoryToLocalStorage();
}

function renderHistory() {
    $history.empty();
    for (var i = 0; i < history.length; i++) {
      $history.append('<p>' + history[i] + '</p>');
    }
}

function saveHistoryToLocalStorage() {
    localStorage.setItem('calculatorHistory', JSON.stringify(history));
}

// Handle number button click events
$(".number").click(function() {
    var value = $(this).val();
    display.text("0");
    var savedNotif = localStorage.getItem('notif');
    if (savedNotif === 'notif-on') {
    buttonClick.play();
    }
    expression += value;
    results.text(expression);
});

// Handle operator button click events
$(".operator").click(function() {
    var value = $(this).val();
    var savedNotif = localStorage.getItem('notif');
    if (savedNotif === 'notif-on') {
    operatorClick.play();
    }
    if (expression === '' && previousResult !== '') {
        display.text("0");
        expression = previousResult + value;
      } else {
        expression += value;
      }
      results.text(expression);
});

// Handle equal button click event
$("#calculateBtn").click(function() {
    var savedNotif = localStorage.getItem('notif');
    if (savedNotif === 'notif-on') {
    operatorClick.play();
    }
    calculate();
});

// Handle clear button click event
$("#clearBtn").click(function() {
    var savedNotif = localStorage.getItem('notif');
    if (savedNotif === 'notif-on') {
    emptyClick.play();
    }
    clear();
});

$('.clear-history').click(function() {
    var savedNotif = localStorage.getItem('notif');
    if (savedNotif === 'notif-on') {
    emptyClick.play();
    }
    clearHistory();
});

// Check if a mode preference is already set
const savedMode = localStorage.getItem('mode');
if (savedMode === 'dark') {
    $('html').addClass('dark-mode').removeClass('light-mode');
    $('#mode-toggle').prop('checked', true);
}

// Toggle between light and dark mode
$('#mode-toggle').on('change', function() {
    var savedNotif = localStorage.getItem('notif');
    if (savedNotif === 'notif-on') {
    switchToggle.play();
    }
    if ($(this).is(':checked')) {
    $('html').addClass('dark-mode').removeClass('light-mode');
    localStorage.setItem('mode', 'dark');
    } else {
    $('html').addClass('light-mode').removeClass('dark-mode');
    localStorage.setItem('mode', 'light');
    }
});
});
  