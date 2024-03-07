var tabCount = 1;
var formValues = {};

function openTab(tabName) {
    var tabContents = document.getElementsByClassName("tab-content");
    for (var i = 0; i < tabContents.length; i++) {
        tabContents[i].style.display = "none";
    }
    document.getElementById(tabName + "Content").style.display = "block";

    var inputs = document.querySelectorAll("#" + tabName + "Content input");
    inputs.forEach(function(input) {
        var tabNumber = parseInt(tabName.replace("tab", ""));
        var tabValues = formValues["tab" + tabNumber];
        if (tabValues && tabValues[input.id] !== undefined) {
            input.value = tabValues[input.id];
        } else {
            input.value = "";
        }
    });
}


function addNewTab() {
    tabCount++;
    var tabsDiv = document.getElementById("tabs");
    var newTab = document.createElement("div");
    newTab.className = "tab";
    newTab.id = "tab" + tabCount;
    newTab.innerHTML = "Tab " + tabCount + " <span class='plus-button' onclick='removeTab(\"tab" + tabCount + "\", event)'>x</span>";
    newTab.addEventListener("click", function() {
        openTab("tab" + tabCount);
    });
    tabsDiv.insertBefore(newTab, tabsDiv.lastElementChild);

    var newTabContent = document.createElement("div");
    newTabContent.id = "tab" + tabCount + "Content";
    newTabContent.className = "tab-content";
    newTabContent.innerHTML = `
        <form id="formTab${tabCount}" onsubmit="submitForm(event, 'tab${tabCount}')">
            <label for="inputField${tabCount}">Input Field:</label>
            <input type="text" id="inputField${tabCount}" name="inputField${tabCount}">
            <button type="submit">Submit</button>
        </form>
        <div class="iframe-container">
            <iframe id="iframeTab${tabCount}" src="" frameborder="0"></iframe>
        </div>`;
    tabsDiv.parentNode.insertBefore(newTabContent, tabsDiv.nextSibling);

    formValues["tab" + tabCount] = {};
    
    openTab("tab" + tabCount);
}


function removeTab(tabName, event) {
    event.stopPropagation();
    var tabToRemove = document.getElementById(tabName);
    var tabContentToRemove = document.getElementById(tabName + "Content");
    if (tabToRemove && tabContentToRemove) {
        tabToRemove.remove();
        tabContentToRemove.remove();

        delete formValues[tabName];
    }
}

function submitForm(event, tabName) {
    event.preventDefault();
    var tabNumber = parseInt(tabName.replace("tab", ""));
    var inputField = document.getElementById("inputField" + tabNumber).value;
    var iframe = document.getElementById("iframeTab" + tabNumber);
    iframe.src = inputField;
    // console.log("🚀 ~ submitForm ~ iframe:", iframe)
}
