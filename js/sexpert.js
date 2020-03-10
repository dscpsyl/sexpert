const countries = ["Afghanistan", "Åland Islands", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "British Indian Ocean Territory", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Caribbean Netherlands", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos", "Colombia", "Comoros", "Congo", "Congo", "Cook Islands", "Costa Rica", "Côte d’Ivoire", "Croatia", "Cuba", "Curaçao", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong SAR", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau SAR", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "North Korea", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn Islands", "Poland", "Portugal", "Puerto Rico", "Qatar", "Réunion", "Romania", "Russia", "Rwanda", "Saint Barthélemy", "Saint Helena", "Saint Kitts and Nevis", "Saint Lucia", "Saint Martin", "Saint Pierre and Miquelon", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "São Tomé and Príncipe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Sint Maarten", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia & South Sandwich Islands", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Svalbard and Jan Mayen", "Swaziland", "Sweden", "Switzerland", "Syria", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "U.S. Minor Outlying Islands", "U.S. Virgin Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Wallis and Futuna", "Western Sahara", "Yemen", "Zambia", "Zimbabwe"];
const PROD = false;
const URL_PREFIX = PROD ? "/wordpress/?rest_route=/" : "/?rest_route=/";
const IS_SEXPERT_PAGE_REGEX = PROD ? /ask-the-sexperts/ : /\?page_id=\d/;
function get(url, d, ol) {
    for (let key in d){
        if (d.hasOwnProperty(key)){
            url += `&${key}=${d[key]}`
        }
    }
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = !ol ? function () {
        console.log(this.responseText);
    } : ol;
    xhr.send();
}

function post(url, d, ol) {
    let data = new FormData();
    for (let key in d){
        if (d.hasOwnProperty(key)){
            data.append(key, d[key])
        }
    }

    let xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.onload = !ol ? function () {
        console.log(this.responseText);
    }: ol;
    xhr.send(data);
}

function patch(url, d, ol) {
    for (let key in d){
        if (d.hasOwnProperty(key)){
            url += `&${key}=${d[key]}`
        }
    }
    let xhr = new XMLHttpRequest();
    xhr.open('PATCH', url, true);
    xhr.onload = !ol ? function () {
        console.log(this.responseText);
    } : ol;
    xhr.send();
}

function del(url, d, ol) {
    for (let key in d){
        if (d.hasOwnProperty(key)){
            url += `&${key}=${d[key]}`
        }
    }
    let xhr = new XMLHttpRequest();
    xhr.open('DELETE', url, true);
    xhr.onload = !ol ? function () {
        console.log(this.responseText);
    } : ol;
    xhr.send();
}

function error_handler(t) {
    let response = JSON.parse(t.responseText);
    if (!response["success"]){
        alert(response["message"]);
        throw new Error(response["message"]);
    }
}

function get_val(id) {
    return document.getElementById(id).value
}

function get_radio_val(name) {
    let el_arr = document.getElementsByName(name);
    let checked_el = null;
    el_arr.forEach((v)=>{
        if (v.checked){
            checked_el = v
        }
    });
    if (checked_el != null){
        return checked_el.value
    }
    return -1
}

function toggle_modal(html) {
    let modal = document.querySelector(".m0");
    modal.classList.toggle("show-modal");
    if (html){
        document.getElementById("m0_content").innerHTML = html
    } else {
        location.reload();
    }
}

function toggle_modal_unchange(html) {
    let modal = document.querySelector(".m1");
    modal.classList.toggle("show-modal");
    document.getElementById("m1_content").innerHTML = html
}

function close_modal() {
    if(confirm("This would erase everything you created!")){
        location.reload();
    }
}

function submit_inquiry() {
    // converting gender
    let gender_code = get_radio_val("gender");
    let gender = "Unknown";
    switch (gender_code) {
        case "0":
            gender = "Female";
            break;
        case "1":
            gender = "Male";
            break;
        case "2":
            gender = "Trans Male";
            break;
        case "3":
            gender = "Trans Female";
            break;
        case "4":
            gender = document.getElementById("not_listed_input").value;
            break;
        case "5":
            gender = "Prefer Not to Say";
            break;
        case "6":
            gender = "Non-binary / Genderqueer";
            break;
        case "7":
            gender = "Trans Non-binary / Genderqueer";
            return;
        default:
            alert("No gender specified");
            return
    }
    let message = get_val("message");
    if (!message){
        alert("No message specified");
        return
    }
    let email = get_val("email");
    if (!email){
        alert("No email specified");
        return
    }
    let age = get_val("age");
    if (age < 1){
        alert("Wrong age");
        return
    }
    post(URL_PREFIX + "sexpert/v1/inquiry/", {
        'email': email,
        'age': age,
        'gender': gender,
        'country': get_val("country"),
        'message': message,
        'status': 0,
    }, function() {
        alert("success");
        error_handler(this);
        location.reload();
    });
}

function assign_inquiry(i, assignee_id) {
    post(URL_PREFIX + "sexpert/v1/assignment/" + i, {
        'assignee_id': assignee_id,
        '_wpnonce': php_variables.nonce
    },function() {
        error_handler(this);
        location.reload();
    });

}

function unassign_inquiry(i, assignee_id) {
    del(URL_PREFIX + "sexpert/v1/assignment/" + i, {
        'assignee_id': assignee_id,
        '_wpnonce': php_variables.nonce
    }, function() {
        error_handler(this);
        location.reload();
    });
}
let editorInquiry = [];
function open_inquiry_modal(i, inquirer_info, message, response) {
    patch(URL_PREFIX + "sexpert/v1/status/" + i, {
        'status': 2,
        '_wpnonce': php_variables.nonce
    });
    toggle_modal(
        `
            <div class="blocks">
                <div class='info'>${inquirer_info}</div
                <br><br>
                <strong>Inquiry</strong>
                <div class='message'>${message}</div>
            </div>
            <br>
            Your Response:
            <textarea
                class="modal-textbox"
                id="response${i}" 
                onchange="save_response(${i})">${response === "No response yet" ? "" : response}</textarea>
            <br><br>
            <button class="button button-secondary" onclick="submit_response(${i})">Submit</button>
            <button class="button button-primary" onclick="send_response(${i})">Send</button>
        `
    );
    editorInquiry[i] = SUNEDITOR.create((document.getElementById(`response${i}`)),{
    });
}

function open_inquiry_modal_with_confirm(i, inquirer_info, message, response) {
    if (confirm("You are editing a sent message. This would force the status to be 'Editing' and may be sent again!")){
        open_inquiry_modal(i, inquirer_info, message, response)
    }
}

let editorComment = [];
function open_comment_modal(i, inquirer_info, message, response) {
    toggle_modal(
        `
            <div class="blocks">
                <div class='info'>${inquirer_info}</div
                <br><br>
                <strong>Inquiry</strong>
                <div class='message'>${message}</div>
                <strong>Response</strong>
                <div class='message'>${response}</div>
            </div>
            <br>
            Your Comment:
            <div 
                class="modal-textbox"
                id="comment${i}">Your argument is great</div>
            <br><br>
            <button class="button button-primary" onclick="send_comment(${i})">Send</button>
        `
    );
    editorComment[i] = SUNEDITOR.create((document.getElementById(`comment${i}`)),{
    });
}

function get_editor_val(i, v) {
    if (v === "comment"){
        return editorComment[i].getContents()
    } else {
        return editorInquiry[i].getContents()
    }
}

function save_response(i) {
    patch(URL_PREFIX + "sexpert/v1/response_of_inquiry/" + i, {
        'response': get_val("response" + i),
        '_wpnonce': php_variables.nonce
    })
}


function submit_response(i) {
    post(URL_PREFIX + "sexpert/v1/response_of_inquiry/" + i, {
        'response': get_editor_val(i, "inquiry"),
        '_wpnonce': php_variables.nonce
    }, function(){
        error_handler(this);
        toggle_modal();
    });
}

function send_response(i) {
    if (confirm("Please confirm: an email is going to be sent after.")) {
        post(URL_PREFIX + "sexpert/v1/mailing/" + i, {
            'response': get_editor_val(i, "inquiry"),
            '_wpnonce': php_variables.nonce
        }, function () {
            error_handler(this);
            toggle_modal();
        });
    }
}

function send_comment(i) {
    post(URL_PREFIX + "sexpert/v1/comment_of_inquiry/" + i, {
        'comment': get_editor_val(i, "comment"),
        '_wpnonce': php_variables.nonce
    }, function(){
        error_handler(this);
        toggle_modal();
    });
}

function get_status() {
    get(URL_PREFIX + "sexpert/v1/status_sexpert/" , {}, function(v){
        error_handler(this);
        document.getElementById("status").innerHTML = JSON.parse(this.response).message ? "Activated": "Not activated";
        document.getElementById("status_button").innerHTML = JSON.parse(this.response).message ? "Deactivate": "Activate";

    });
}

function change_status() {
    patch(URL_PREFIX + "sexpert/v1/status_sexpert/", {
        '_wpnonce': php_variables.nonce
    }, function(){
        error_handler(this);
        alert("Success");
        location.reload();
    });
}

function get_config() {
    get(URL_PREFIX + "sexpert/v1/config/" , {}, function(v){
        error_handler(this);
        const content = JSON.parse(this.response).message;
        document.getElementById("inquiry_received_title").value = content.inquiry_received_title;
        document.getElementById("inquiry_received").value = content.inquiry_received;
        document.getElementById("inquiry_resolved_title").value = content.inquiry_resolved_title;
        document.getElementById("inquiry_resolved").value = content.inquiry_resolved;
        document.getElementById("disabled_banner").value = content.disabled_banner;
        document.getElementById("disclaimer").value = content.disclaimer;
    });
}

function change_config() {
    patch(URL_PREFIX + "sexpert/v1/config/", {
        '_wpnonce': php_variables.nonce,
        "inquiry_received_title": document.getElementById("inquiry_received_title").value,
        "inquiry_received": document.getElementById("inquiry_received").value,
        "inquiry_resolved_title": document.getElementById("inquiry_resolved_title").value,
        "inquiry_resolved": document.getElementById("inquiry_resolved").value,
        "disabled_banner": document.getElementById("disabled_banner").value,
        "disclaimer": document.getElementById("disclaimer").value
    }, function(){
        error_handler(this);
        alert("Success");
        location.reload();
    });
}

function change_showing_status() {
    let new_status = get_val("contributor_selector");
    let re_exp = /&status=\d/;
    if (new_status === "-1"){
        window.location.href = window.location.href.replace(re_exp, "");
    } else if (re_exp.exec(window.location.href)) {
        window.location.href = window.location.href.replace(re_exp,
            "&status=" + new_status);
    } else {
        window.location.href += ("&status=" + new_status);
    }
}

function show_gender_input(){
    if (document.getElementById("notlisted").checked){
        // show input
        document.getElementById("not_listed_specify").innerHTML = `
            <br>
            <label>Enter Your Gender Identity Here</label><br>
            <input class="sexpert-form-input" id="not_listed_input" />
        `
    } else {
        document.getElementById("not_listed_specify").innerHTML = ""
    }
}

window.onload = function () {
    if (IS_SEXPERT_PAGE_REGEX.test(window.location.href)){
        let country_elem = document.getElementById("country");
        let options_html = "";
        countries.forEach((country) => {
            options_html += `
                <option value="${country}" ${country === "United States" ? "selected" : ""}>${country}</option>
            `
        });
        country_elem.innerHTML = options_html;
    }
};
