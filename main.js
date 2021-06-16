const myForm = document.querySelector('#myForm')

let isEventListenerHandled = false

function validate() {
    let formData = new FormData(myForm)
    let values = Object.fromEntries(formData.entries())
    let {fullname, email, company, message} = values

    let errors = {}

    if (fullname.length < 2 || fullname.length > 30) {
        errors.fullname = "Имя не должно быть короче 2 символов и длиннее 30 символов"
    }

    let mailPattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
    if (!mailPattern.test(email)) {
        errors.email = "Email введен некорректно"

    }

    if (company.length < 2) {
        errors.company = "Название компании не должно быть короче 2 символов"
    }

    if (message.length < 2 || message.length > 300) {
        errors.message = "Текст сообщения не должен быть короче 2 символов и длиннее 300 символов"

    }

    if (!myForm.privacy.checked) {
        errors.privacy = true
    }
    return errors
}

myForm.addEventListener('submit', (e) => {
        e.preventDefault()
        let errors = validate()


        for (let el of myForm.elements) {
            if (el.tagName === 'button') continue
            let nameAttrValue = el.getAttribute('name')
            let inputType = el.getAttribute('type')
            if (nameAttrValue in errors) {
                if (inputType === 'checkbox') {
                    showCheckboxInputError(el)
                } else {
                    showTextInputError(el, errors[nameAttrValue])
                }
            } else {
                if (inputType === 'checkbox') {
                    hideCheckboxInputError(el)
                } else {
                    hideTextInputError(el)
                }

            }
            if (!isEventListenerHandled) {
                el.addEventListener('change', e => {

                    let errors = validate()

                    if (!(nameAttrValue in errors)) {

                        if (inputType === 'checkbox') {
                            hideCheckboxInputError(el)
                        } else {
                            hideTextInputError(el)
                        }
                    }
                })
            }

        }
        isEventListenerHandled = true

        if (Object.keys(errors).length === 0) {

            fetch('https://jsonplaceholder.typicode.com/todos/1', {
                method: 'POST',
                body: new FormData(myForm)
            })
                .then(function (response) {
                    console.log(response)
                    alert('Успешная отправка данных')
                })
        }

    }
)


function showTextInputError(input, text) {
    let newErrorLabel = document.createElement('span')
    newErrorLabel.classList.add("error-message")
    newErrorLabel.innerText = text
    input.parentNode.appendChild(newErrorLabel)
    input.classList.add("error")
}

function showCheckboxInputError(input) {
    input.parentNode.classList.add("error")
}


function hideTextInputError(input) {
    input.classList.remove("error")
    let testErrorMessage = input.parentNode.querySelector('.error-message')
    if (testErrorMessage) {
        testErrorMessage.remove()
    }

}

function hideCheckboxInputError(input) {
    input.parentNode.classList.remove("error")
}



