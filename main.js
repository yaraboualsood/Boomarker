var bookmarkNameInput = document.getElementById('bookmarkName')
var websiteURLInput = document.getElementById('websiteURL')
var tableData = document.getElementById('tableData')
var btn = document.getElementById('btn')
var bookmarkArray = []


if (localStorage.getItem('bookmark') != null) {
    bookmarkArray = JSON.parse(localStorage.getItem('bookmark'))
    display()

}

btn.onclick = function () {
    addBookmark()
    clearForm()
}



function addBookmark() {
    if (validate() == true) {

        var bookmark = {
            bookmarkName: bookmarkNameInput.value,
            websiteURL: websiteURLInput.value
        }

        bookmarkArray.push(bookmark)
        localStorage.setItem('bookmark', JSON.stringify(bookmarkArray))
        display()
    }
    else {
        alert(`Site Name or Url is not valid, Please follow the rules below :
    -Site name must contain at least 3 characters
    -Site URL must be a valid one`)
    }
}


function display() {
    var box = ''

    for (var i = 0; i < bookmarkArray.length; i++) {
        box += `
    <tr>
        <td>${i + 1}</td>
        <td>${bookmarkArray[i].bookmarkName}</td>
        <td><button class="btn bg-success text-white"><a href="${websiteURLInput.value}" target="_blank">Visit</a></button></td>
       <td><button class="btn bg-danger text-white" onclick="deleteBookmark(${i})">Delete</button></td>
   </tr>
     `
    }

    tableData.innerHTML = box
}

function clearForm() {
    bookmarkNameInput.value = ''
    websiteURLInput.value = ''
}

function deleteBookmark(index) {

    bookmarkArray.splice(index, 1)
    display()
}

// function visitBookmark(){
//     var website = `<a href="${websiteURLInput.value}"></a>`
//     website     
// }


function validate() {
    var websiteRegex = /^(https:\/\/)[a-zA-Z0-9\-/\.]*(\.com|\.net|\.to|\.eg)[a-zA-Z0-9\-/]*$/
    var nameRegex = /^[a-z ]{3,}$/
    if (websiteRegex.test(websiteURLInput.value) && nameRegex.test(bookmarkNameInput.value) == true) {
        return true
    }
    else {
        return false
    }
}
