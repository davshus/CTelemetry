function sendValue() {
    jQuery.ajax({
        method: 'POST',
        url: '/values/submit',
        data: {
            key: this.name,
            value: this.value
        },
        dataType: 'application/json'
    });
}

var inputs = document.querySelectorAll('input');

for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('input', sendValue.bind(inputs[i]));
}