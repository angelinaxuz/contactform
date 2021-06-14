const myForm = document.querySelector('#myForm')

myForm.addEventListener('submit', (e) => {
    e.preventDefault()
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

    for (let el of myForm.elements) {
        let nameAttrValue = el.getAttribute('name')
        let inputType = el.getAttribute('type')
        if (nameAttrValue in errors) {
            if (inputType === 'checkbox'){
                showCheckboxInputError(el)
            }else{
                showTextInputError(el, errors[nameAttrValue])
            }
        } else {
            if (inputType === 'checkbox'){
                hideCheckboxInputError(el)
            }else{
                hideTextInputError(el)
            }

        }
    }


    if (Object.keys(errors).length > 0) {
        alert('Поля заполнены неверно')
    } else {
        alert(`Congratulations! Name: ${fullname}, Email: ${email}`)
    }

})


function showTextInputError(input, text) {
    let newError = document.createElement('span')
    newError.classList.add("error-message")
    newError.innerText = text
    input.parentNode.appendChild(newError)
    input.classList.add("error")
}

function showCheckboxInputError(input){
    input.parentNode.classList.add("error")
}


function hideTextInputError(input) {
    input.classList.remove("error")
//    удалить span
}

function hideCheckboxInputError(input){
    input.parentNode.classList.remove("error")
}
//для текущего импута написать addEventListener который будет убирать классы с ошибками



// let input = document.querySelector('.form__input')
//
// showErrorItem(input, 'моя ошибка')
