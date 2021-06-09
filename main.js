let myForm = document.forms.myform

myForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let formData = new FormData(myForm)
    let values = Object.fromEntries(formData.entries())

    let {fullname, email} = values

    if (fullname.length < 2) {
        alert("число символов не должно быть меньше 2")
        return
    }

    let mailPattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
    if (!mailPattern.test(email)) {
        alert("Email введен некорректно")
    }

    alert(`Congratulations! Name: ${fullname}, Email: ${email}`)
})

