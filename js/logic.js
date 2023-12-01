const input_file = document.querySelector('.file input');
const button_file = document.querySelector('.file button');
input_file.style.opacity = 0;
let falseInputData = false

document.querySelector('.input input').value = ''

let output = document.querySelector('.output p');

const defaultStartingRadio = document.querySelector('.tuple_block p input[name="1"][value="10"]');
const defaultEndingRadio = document.querySelector('.tuple_block p input[name="2"][value="2"]');
defaultStartingRadio.click()
defaultEndingRadio.click()

function clearOutput() {
    output.textContent = ''
}

button_file.addEventListener('click', () => {
    if (output.textContent == 'NAN') {
        alert("Пожалуйста, введите число")
        clearOutput()
        falseInputData = true
        } 

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

    clearOutput()
 
    
    const startingRadio = document.querySelectorAll('.tuple_block p input[name="1"]');
    startingSystem = getRadioValue(startingRadio);
    const endingRadio = document.querySelectorAll('.tuple_block p input[name="2"]');
    endingSystem = getRadioValue(endingRadio);

    const input_num = document.querySelector('.input input').value;

    function checkInputData(startingSystem) {

        DictionaryFor2 = ['0', '1']
        DictionaryFor8 = ['0', '1', '2', '3', '4', '5', '6', '7']
        DictionaryFor10 = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
        DictionaryFor16 = ['0', '1', '2', '3', '4', '5', '6', '7', 'A', '8', '9', 'B', 'C', 'D', 'E', 'F', 'a', 'b', 'c', 'd', 'e', 'f']
        const numberOfDictionary = [DictionaryFor2, DictionaryFor8, DictionaryFor10, DictionaryFor16]
        let convert_startingSystem = {
            '2': 0,
            '8': 1,
            '10': 2,
            '16': 3,
        }
        convert_startingSystem = convert_startingSystem[startingSystem]
    
        for (const element of input_num) {

            if (!numberOfDictionary[convert_startingSystem].includes(element)) {
                switch(convert_startingSystem) {
                    case 0:
                        alert("Двоичное число принимает на вход только цифры 0 и 1")
                        break
                    case 1:
                        alert("Восьмеричное число принимает на вход только цифры (0-7)")
                        break

                    case 2:
                        alert("Десятичное число принимает на вход только цифры (0-9)")
                        break
                    case 3:
                        alert("Шестнадцатеричное число принимает на вход только цифры (0-9), а также буквы из латинского алфавита (A-F)")
                        break
                }
                falseInputData = true
                clearOutput()
                return falseInputData
            }
        };
    }
    checkInputData(startingSystem)

    if (!(falseInputData)) {
        res = convert(input_num, startingSystem, endingSystem);
        output.textContent = res.toUpperCase();

        }
    
    if (output.textContent == 'NAN') {
        alert("Пожалуйста, введите число")
        clearOutput()
        falseInputData = true
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

    
    falseInputData = false
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





















