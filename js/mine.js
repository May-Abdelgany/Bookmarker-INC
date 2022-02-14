var allsites;
if (localStorage.getItem("bookmarks") == null) {
    allsites = [];
}
else {
    allsites = JSON.parse(localStorage.getItem("bookmarks"));
    display();
}
function addSite() {
    document.getElementById("errorInput1").setAttribute("class", "d-none");
    document.getElementById("errorInput2").setAttribute("class", "d-none");
    var site = {
        siteName: document.getElementById("siteNameId").value,
        siteUrl: document.getElementById("siteUrlId").value
    }
    if (site.siteName == "" && site.siteUrl != "") {
        document.getElementById("errorInput1").innerHTML = "Name is required";
        document.getElementById("errorInput1").setAttribute("class", "alert alert-danger mt-2 py-2");
    }
    else if (site.siteName != "" && site.siteUrl == "") {
        document.getElementById("errorInput2").innerHTML = "Url Field is required";
        document.getElementById("errorInput2").setAttribute("class", "alert alert-danger mt-2 py-2");
    }
    else if (site.siteName == "" && site.siteUrl == "") {
        document.getElementById("errorInput1").innerHTML = "Name is required";
        document.getElementById("errorInput1").setAttribute("class", "alert alert-danger mt-2 py-2");
        document.getElementById("errorInput2").innerHTML = "Url Field is required";
        document.getElementById("errorInput2").setAttribute("class", "alert alert-danger mt-2 py-2");
    }
    else {
        clear();
        allsites.push(site);
        localStorage.setItem("bookmarks", JSON.stringify(allsites));
        display();
    }
}
function clear() {
    document.getElementById("siteNameId").value = "";
    document.getElementById("siteUrlId").value = "";
}
function display() {
    var row = ``;
    for (var i = 0; i < allsites.length; i++) {
        row += `
        <div class="row m-1 mb-4 py-3" style="background-image: linear-gradient(rgb(238, 238, 238), rgb(255, 255, 255));">
            <div class="col-lg-2 col">
               <h2>${allsites[i].siteName}</h2>
            </div>
            <div class="col-lg-2  offset-lg-1 col ">
               <button type="button" class="btn btn-primary" onclick="visitSite(${i})">Visit</button>
            </div>
            <div class="col-lg-2  col ">
               <button id="btnUpdate"
                type="button" class="btn btn-warning text-white update" onclick="updateBookmark(${i})">Update</button>
            </div>
            <div class="col-lg-2  col">
                <button type="button" class="btn btn-danger" onclick="deleteUrl(${i})">Delete</button>
            </div>

        </div>
        `
    }
    document.getElementById("display").innerHTML = row;
}
function visitSite(urlIndex) {
    var url = allsites[urlIndex].siteUrl;
    if (allsites[urlIndex].siteUrl.includes("https://")) {
        window.open(url);
    }
    else {
        window.open("https://" + url);
    }
}
function deleteUrl(urlIndex) {
    allsites.splice(urlIndex, 1);
    localStorage.setItem("bookmarks", JSON.stringify(allsites));
    display();
}
function updateBookmark(index) {
    document.getElementById("siteNameId").value = allsites[index].siteName;
    document.getElementById("siteUrlId").value = allsites[index].siteUrl;
    document.getElementById("btnUpdate").setAttribute("class", `btn btn-info update text-white`);
    document.getElementById("btnSubmit").setAttribute("onclick", `updateData(${index})`);
    document.getElementById("btnSubmit").innerHTML = "Update";
}
function updateData(index) {
    allsites[index].siteName = document.getElementById("siteNameId").value;
    allsites[index].siteUrl = document.getElementById("siteUrlId").value;
    if (allsites[index].siteName == "" && allsites[index].siteUrl != "") {
        document.getElementById("errorInput1").innerHTML = "Name is required";
        document.getElementById("errorInput1").setAttribute("class", "alert alert-danger mt-2 py-2");
    }
    else if (allsites[index].siteName != "" && allsites[index].siteUrl == "") {
        document.getElementById("errorInput2").innerHTML = "Url Field is required";
        document.getElementById("errorInput2").setAttribute("class", "alert alert-danger mt-2 py-2");
    }
    else if (allsites[index].siteName == "" && allsites[index].siteUrl == "") {
        document.getElementById("errorInput1").innerHTML = "Name is required";
        document.getElementById("errorInput1").setAttribute("class", "alert alert-danger mt-2 py-2");
        document.getElementById("errorInput2").innerHTML = "Url Field is required";
        document.getElementById("errorInput2").setAttribute("class", "alert alert-danger mt-2 py-2");
    }
    else {
        clear();
        document.getElementById("btnSubmit").setAttribute("onclick", `addSite()`);
        document.getElementById("btnSubmit").innerHTML = "Submit";
        localStorage.setItem("bookmarks", JSON.stringify(allsites));
        display();
    }
}

function search(item) {
    var row = ``;
    for (var i = 0; i < allsites.length; i++) {
        if (allsites[i].siteName.includes(item)) {
            row += `
            <div class="row m-1 mb-4 py-3" style="background-image: linear-gradient(rgb(238, 238, 238), rgb(255, 255, 255));">
                <div class="col-lg-2 col">
                   <h2>${allsites[i].siteName}</h2>
                </div>
                <div class="col-lg-2  offset-lg-1 col ">
                   <button type="button" class="btn btn-primary" onclick="visitSite(${i})">Visit</button>
                </div>
                <div class="col-lg-2  col ">
                   <button id="btnUpdate"
                    type="button" class="btn btn-warning text-white update" onclick="updateBookmark(${i})">Update</button>
                </div>
                <div class="col-lg-2  col">
                    <button type="button" class="btn btn-danger" onclick="deleteUrl(${i})">Delete</button>
                </div>
    
            </div>
            `
        }
    }
    document.getElementById("display").innerHTML = row;
}
