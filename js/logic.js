
const input_file = document.querySelector('.file input');
const button_file = document.querySelector('.file button');

input_file.style.opacity = 0;


button_file.addEventListener('click', () => {

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

    const input_num = document.querySelector('.input input').value;
    res = convert(input_num, startingSystem, endingSystem);

    const output = document.querySelector('.output p');
    output.textContent = res.toUpperCase();

})

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











