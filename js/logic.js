
const input_file = document.querySelector('.file input');
const button_file = document.querySelector('.file button');
let output = document.querySelector('.output p');
input_file.style.opacity = 0;


button_file.addEventListener('click', () => {

    clearOutput()

    input_file.click()

    input_file.addEventListener('change', (e) => {
        if (!input_file.files?.[0]) return

        const reader = new FileReader()
        reader.onload = (e) => {
            document.querySelector('.input input').value = reader.result
        }
        reader.readAsText(input_file.files[0])

    })

})


const calculate = document.querySelector('#calculate');
calculate.addEventListener('click', () => {
    
    const startingRadio = document.querySelectorAll('.tuple_block p input[name="1"]');
    startingSystem = getRadioValue(startingRadio);
    const endingRadio = document.querySelectorAll('.tuple_block p input[name="2"]');
    endingSystem = getRadioValue(endingRadio);

    // if (startingSystem || endingSystem == 'undefined') {
    //     alert("Пожалуйста, выберите системы счисления чисел")
    // }

    const input_num = document.querySelector('.input input').value;
    res = convert(input_num, startingSystem, endingSystem);

    output.textContent = res.toUpperCase();

    if (output.textContent == 'NAN') {
        switch (startingSystem) {
            case '2':
                alert("Двоичное число принимает на вход только цифры 0 и 1")
                clearOutput()
                break
            case '8':
                alert("Восьмеричное число принимает на вход только цифры (0-7)")
                clearOutput()
                break
            case '10':
                alert("Десятичное число принимает на вход только цифры (0-9)")
                clearOutput()
                break
            case '16':
                alert("Шестнадцатиричное число принимает на вход только цифры (0-9), а также буквы из латинского алфавита (A-F)")
                clearOutput()
                break
            default:
                alert("Пожалуйста, введите число")
                clearOutput()
                break
        }
    }

    function convert(input_num, startingSystem, endingSystem) {
        input_num = parseInt(input_num, startingSystem).toString(endingSystem);
        return input_num;
    }

    function getRadioValue(radioName) {
        for (const radio of radioName) {
            if (radio.checked) {
                return radio.value;
            }
        }
    }

    

})


const saveButton = document.querySelector('#saveButton')

saveButton.addEventListener('click', () => {
    const data = res
    const el = document.createElement('a')
    el.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(data)}`)
    el.setAttribute('download', 'результат.txt')
    document.body.appendChild(el);
    el.click();
    document.body.removeChild(el);
})

function clearOutput() {
    output.textContent = ''
}

















