const myForm = document.querySelector('#myForm')

myForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let formData = new FormData(myForm)
    let values = Object.fromEntries(formData.entries())
    let {fullname, email, company, message, privacy} = values

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
        errors.privacy = "Пожалуйста отметьте галочку"
    }




    for (let el of myForm.elements) {
        let name = el.getAttribute('name')
        if (name in errors) {
            el.classList.add("error")
        } else {
            el.classList.remove("error")
        }
    }

    if (Object.keys(errors).length > 0) {
        alert('Поля заполнены неверно')
    } else {
        alert(`Congratulations! Name: ${fullname}, Email: ${email}`)
    }

})

