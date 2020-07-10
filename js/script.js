/******************************************
Treehouse Techdegree:
FSJS project 3 - Interactive Form
******************************************/

/******************************************
 * Global Variables
 ******************************************/

const form = document.querySelector('form');
const checkJobRole = document.querySelector('#title');
const jobRoleInput = document.querySelector('#other-title');
const tshirtColor = document.querySelector('#colors-js-puns');
const tshirtColors = document.querySelectorAll('#color option')
const colorSelect = document.querySelector('#color');
const checkTheme = document.querySelector('#design');
const activities = document.querySelector('.activities');
const checkboxes = document.querySelectorAll('.activities input');
const paypalInfo = document.querySelector('#paypal');
const bitcoinInfo = document.querySelector('#bitcoin');
const creditcardDiv = document.querySelector('#credit-card');
const paymentSelect = document.querySelector('#payment');
const creditcardSelected = document.querySelector('#payment option[value="credit card"]');
const paypalSelected = document.querySelector('#payment option[value="paypal"]');
const bitcoinSelected = document.querySelector('#payment option[value="bitcoin"]');
const name = document.querySelector('#name');
const email = document.querySelector('#mail');
const ccMediaQuery = window.matchMedia("(max-width: 680px)");


/******************************************
 * Function Declarations
 ******************************************/

// Function that sets the focus to the first input field. 
function setFocus() {
    document.querySelector('input').focus();
}

// the Tshirt colors from the dropdown list are hidden by default by this function, until a theme is selected
function setTshirtColor() {
    for (let i = 0; i < tshirtColors.length; i++) {
        tshirtColors[i].setAttribute('hidden', 'hidden');
    }
}

// function that either shows or hides the Job Role Input field, depending on if the 'Other' job role is selected or not. 
function checkJobRoleFunction() {
    if (document.querySelector('[value="other"]').selected) {
        jobRoleInput.style.display = 'block';
    } else {
        jobRoleInput.style.display = 'none';
    }
};

// Function that checks the selected theme and sets the colors that are available for the selected theme. Shows no colors at all and adds the 'select color theme' option when no theme is selected.
function checkThemeFunction() {
    const selectColorTheme = document.querySelector('#color option[value="selectcolor"]');
    const allColors = colorSelect.querySelectorAll('option');
    if (this.value === 'heart js') {
        tshirtColor.style.display = 'block';
        for (let i = 0; i < 3; i++) {
            allColors[i].setAttribute('hidden', 'hidden');
        }
        for (let i = 3; i < 6; i++) {
            allColors[i].removeAttribute('hidden', 'hidden');
        }
        document.querySelector('#color').options[3].selected = 'selected';
        if (selectColorTheme) {
            colorSelect.removeChild(selectColorTheme);
        }
    } else if (this.value === 'js puns') {
        tshirtColor.style.display = "block";
        for (let i = 0; i < 3; i++) {
            allColors[i].removeAttribute('hidden', 'hidden');
        }
        for (let i = 3; i < 6; i++) {
            allColors[i].setAttribute('hidden', 'hidden');
        }
        document.querySelector('#color').options[0].selected = 'selected';
        if (selectColorTheme) {
            colorSelect.removeChild(selectColorTheme);
        }
    } else {
        tshirtColor.style.display = 'none';
    }
};

// Function that checks if checkboxes with conflicting time-and-date values are checked. Conflicting activity checkboxes are disabled and line-through style is applied to the text
function activitiesCheckboxStyles() {
    for (let i = 0; i < checkboxes.length; i++) {
        for (let j = 0; j < checkboxes.length; j++) {
            if (checkboxes[i].getAttribute('data-day-and-time') === checkboxes[j].getAttribute('data-day-and-time') && i !== j) {
                if (checkboxes[j].checked) {
                    checkboxes[i].disabled = true;
                    checkboxes[i].parentNode.style.textDecoration = "line-through";
                } else {
                    checkboxes[i].disabled = false;
                    checkboxes[i].parentNode.style.textDecoration = "none";
                }
            }
        }
    }
}

// Function that calculates the total cost of all selected activities
function calculateTotalCost() {
    let totalCost = 0;
    const total = document.createElement('p');
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            const cost = parseInt(checkboxes[i].getAttribute('data-cost'));
            totalCost += cost;
        }
    }
    if (totalCost !== 0) {
        total.innerHTML = `Total: $${totalCost}`;
        activities.appendChild(total);
    }
}

// Function that selects the credit card payment option and hides the PayPal and Bitcoin information
function paymentStart() {
    document.querySelector('#payment option[value="select method"]').setAttribute('disabled', 'disabled');;
    creditcardSelected.selected = 'selected';
    paypalInfo.style.display = 'none';
    bitcoinInfo.style.display = 'none';
}

// Function that shows and/or hides the payment information depending on the selected payment method
function paymentSelectFunction() {
    if (creditcardSelected.selected) {
        creditcardDiv.style.display = 'block';
        paypalInfo.style.display = 'none';
        bitcoinInfo.style.display = 'none';
    } else if (paypalSelected.selected) {
        creditcardDiv.style.display = 'none';
        paypalInfo.style.display = 'block';
        bitcoinInfo.style.display = 'none';
    } else if (bitcoinSelected.selected) {
        creditcardDiv.style.display = 'none';
        paypalInfo.style.display = 'none';
        bitcoinInfo.style.display = 'block';
    }
}

// Function that checks if a name is provided
function nameValidator() {
    const nameValue = name.value;

    if (nameValue) {
        name.style.border = '2px solid rgb(111, 157, 220)';
        return true;
    } else {
        if (!document.querySelector('.name-error')) {
            name.style.border = '1px solid red';
            const errorMessage = document.createElement('div');
            errorMessage.classList.add('error');
            errorMessage.classList.add('name-error');
            errorMessage.innerHTML = 'You have to provide your name to register';
            document.querySelector('fieldset').insertBefore(errorMessage, document.querySelector('label[for="mail"]'));
        }
        return false;
    }
}

// Function that checks if the emailaddress is validly formatted
function emailValidator() {
    const emailValue = email.value;
    const indexOfAt = emailValue.indexOf('@');
    const indexOfDot = emailValue.lastIndexOf('.');
    if (indexOfAt > 1 && indexOfDot > (indexOfAt + 1)) {
        email.style.border = '2px solid rgb(111, 157, 220)';
        return true;
    } else {
        if (!document.querySelector('.email-error')) {
            email.style.border = '1px solid red';
            const errorMessage = document.createElement('div');
            errorMessage.classList.add('error');
            errorMessage.classList.add('email-error');
            errorMessage.innerHTML = 'You have to provide a valid emailaddress to register';
            document.querySelector('fieldset').insertBefore(errorMessage, document.querySelector('label[for="title"]'));
        }
        return false;
    }
}

// Function that checks the users' input for the emailadress while typing
function emailInputFunction() {
    const emailValue = email.value;
    const indexOfAt = emailValue.indexOf('@');
    const indexOfDot = emailValue.lastIndexOf('.');
    if (indexOfAt > 1 && indexOfDot > (indexOfAt + 1)) {
        email.style.border = '2px solid rgb(111, 157, 220)';
        if (document.querySelector('.email-error')) {
            document.querySelector('.email-error').remove();
        }
        return true;
    } else {
        if (!document.querySelector('.email-error')) {
            email.style.border = '1px solid red';
            const errorMessage = document.createElement('div');
            errorMessage.classList.add('error');
            errorMessage.classList.add('email-error');
            errorMessage.innerHTML = 'You have to provide a valid emailaddress to register';
            document.querySelector('fieldset').insertBefore(errorMessage, document.querySelector('label[for="title"]'));
        }
        return false;
    }
}

function jobRoleValidator() {
    if (checkJobRole.value === 'other' && !document.querySelector('.jobrole-error')) {
        jobRoleInput.style.border = '1px solid red';
        const errorMessage = document.createElement('div');
        errorMessage.classList.add('error');
        errorMessage.classList.add('jobrole-error');
        errorMessage.innerHTML = 'Please specify your jobrole';
        document.querySelector('fieldset').appendChild(errorMessage);    
    }

}

// Function that checks if there is at least 1 checkbox selected from the activities registration section of the form
function activitiesValidator() {
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            return true;
        }
    }
    if (!document.querySelector('.activities-error')) {
        const errorMessage = document.createElement('div');
        errorMessage.classList.add('error');
        errorMessage.classList.add('activities-error');

        errorMessage.innerHTML = 'You have to select at least 1 activity to register';
        activities.appendChild(errorMessage);
    }
    return false;
}

// Function that checks if a valid creditcard number is provided
function ccNumberValidator() {
    let ccNumber = document.querySelector('#cc-num');
    if (/^\d{13,16}$/.test(parseInt(ccNumber.value))) {
        return true;
    }
    if (!document.querySelector('.ccnum-error')) {
        if (/^\d+$/.test(parseInt(ccNumber.value))) {
            ccNumber.style.border = '1px solid red';
            const errorMessage = document.createElement('div');
            errorMessage.classList.add('error');
            errorMessage.classList.add('ccnum-error');
            errorMessage.innerHTML = 'You have to provide a creditcard number that is between 13 and 16 digits long';
            document.querySelector('#credit-card').insertBefore(errorMessage, document.querySelector('label[for="exp-month"]'));
            return false;
        } else {
            ccNumber.style.border = '1px solid red';
            const errorMessage = document.createElement('div');
            errorMessage.classList.add('error');
            errorMessage.classList.add('ccnum-error');
            errorMessage.innerHTML = 'You have to provide a valid creditcard number';
            document.querySelector('#credit-card').insertBefore(errorMessage, document.querySelector('label[for="exp-month"]'));
            return false;
        }

    }
}

// Function to check if a valid zipcode is provided
function zipCodeValidator() {
    const zipCode = document.querySelector('#zip');
    if (/^\d{5}$/.test(parseInt(zipCode.value))) {
        return true;
    }
    if (!document.querySelector('.zipcode-error')) {
        zipCode.style.border = '1px solid red';
        const errorMessage = document.createElement('div');
        errorMessage.classList.add('error');
        errorMessage.classList.add('zipcode-error');
        errorMessage.innerHTML = 'You have to provide a valid zipcode';
        document.querySelector('#credit-card').insertBefore(errorMessage, document.querySelector('label[for="exp-month"]'));
    }
    return false;
}

// Function to check if a valid CVV number is provided
function cvvValidator() {
    const cvv = document.querySelector('#cvv');
    if (/^\d{3}$/.test(parseInt(cvv.value))) {
        return true;
    }
    if (!document.querySelector('.cvv-error')) {
        cvv.style.border = '1px solid red';
        const errorMessage = document.createElement('div');
        errorMessage.classList.add('error');
        errorMessage.classList.add('cvv-error');

        errorMessage.innerHTML = 'You have to provide a valid cvv number';
        document.querySelector('#credit-card').insertBefore(errorMessage, document.querySelector('label[for="exp-month"]'));
    }
    return false;
}

// Function that sets the right position for the creditcard error messages on smaller screens 
function ccMediaQueryFunction(ccMediaQuery) {
    const ccnumerror = document.querySelector('.ccnum-error');
    const ziperror = document.querySelector('.zipcode-error');
    const cvverror = document.querySelector('.cvv-error');

    if (ccnumerror) {
        if (ccMediaQuery.matches) {
            if (ccnumerror) {
                ccnumerror.parentNode.insertBefore(ccnumerror, document.querySelector('.zipcode'));
            }
            if (ziperror) {
                ziperror.parentNode.insertBefore(ziperror, document.querySelector('.cvv'));
            }
        }
        else {
            if (ccnumerror) {
                ccnumerror.parentNode.insertBefore(ccnumerror, document.querySelector('label[for="exp-month"]'));
            }
            if (ziperror) {
                ziperror.parentNode.insertBefore(ziperror, document.querySelector('label[for="exp-month"]'));
            }
            if (cvverror) {
                cvverror.parentNode.insertBefore(cvverror, document.querySelector('label[for="exp-month"]'));
            }
        }
    }
}

// Function that creates an error message under the register button to notify the user that the form could not be submitted because some information is missing
function registerError() {
    if (!document.querySelector('.register-error')) {
        const errorMessage = document.createElement('div');
        errorMessage.classList.add('error');
        errorMessage.classList.add('register-error');
        errorMessage.innerHTML = 'Form could not be submitted. Please provide all required information.';
        document.querySelector('button[type="submit"]').parentNode.appendChild(errorMessage);
    }
}

/******************************************
 * Function Calls On Page Load
 ******************************************/

activitiesCheckboxStyles();
checkThemeFunction();
checkJobRoleFunction();
setFocus();
setTshirtColor();
calculateTotalCost();
paymentStart();
ccMediaQueryFunction(ccMediaQuery);

/******************************************
 * Event Listeners
 ******************************************/

// Event listener that listens for input in the email field
email.addEventListener('keyup', emailInputFunction);

// Event listener that listens for changes to the theme options dropdown list
checkTheme.addEventListener('change', checkThemeFunction);

// Event listener that listens for changes to the job role dropdown list
checkJobRole.addEventListener('change', checkJobRoleFunction);

// Event listener that listens for changes in the activities checkboxes field. When something changes, the totalcost paragraph is removed, and is remade by calling the calculateTotalCost function. The 
activities.addEventListener('change', () => {
    if (activities.querySelector('p')) {
        activities.querySelector('p').remove();
    }
    if (activities.querySelector('.activities-error')) {
        activities.querySelector('.activities-error').remove();
    }
    calculateTotalCost();
    activitiesCheckboxStyles();
});

// Event listener that listens for changes on the payment method
paymentSelect.addEventListener('change', paymentSelectFunction);

// Event listener that listens for form submit, and performs validation checks on the forms' input fields
form.addEventListener('submit', () => {
    event.preventDefault();
    if (!nameValidator()) {
        registerError();
        event.preventDefault();
    }
    if (!emailValidator()) {
        registerError();
        event.preventDefault();
    }
    if (!jobRoleValidator()) {
        registerError();
        event.preventDefault();
    }
    if (!activitiesValidator()) {
        registerError();
        event.preventDefault();
    }

    if (creditcardSelected.selected) {
        if (!ccNumberValidator()) {
            registerError();
            event.preventDefault();
        }
        if (!zipCodeValidator()) {
            registerError();
            event.preventDefault();
        }
        if (!cvvValidator()) {
            registerError();
            event.preventDefault();
        }
        ccMediaQueryFunction(ccMediaQuery);
    }
});

// Mediaquery that listens for changes to the viewport size and calls the media query function whenever the viewport changes
ccMediaQuery.addEventListener("change", ccMediaQueryFunction)