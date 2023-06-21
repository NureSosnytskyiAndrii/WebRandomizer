/* variables */

const textarea = document.getElementById("textarea");

const number = document.getElementById("number");

const range = document.getElementById("range");

const sevNumbInRange = document.getElementById("several_num_in_range");

const item = document.getElementById("item");

const list = document.getElementById("list");

const severalItems = document.getElementById("severalItems");

const quantity = document.getElementById("quantity");

const quantityDiv = document.getElementById("quantityDiv");

const pwd_len = document.getElementById("pwd_len");

const password = document.getElementById("password");

const radio = document.querySelectorAll(".pwdRadio");

const passwordDiv = document.getElementById("passwordDiv");

const color = document.getElementById("color");

const coloredDiv = document.querySelector(".color");

const smile = document.getElementById("smile");

const smileHeader = document.getElementById("smileHeader");

const header = document.getElementById("header");

const counterHeader = document.getElementById("counterHeader");

const firstNumber = document.getElementById("firstNumber");

const secondNumber = document.getElementById("secondNumber");

const alert = document.getElementById("alert");

const alertBlock = document.getElementById("alert_block");

const reset = document.getElementById("reset");

const titleEl = document.querySelector(".title");

const memeEl = document.querySelector(".meme");

const authorEl = document.querySelector(".author");

const generateMemeBtnEl = document.querySelector(".generateMemeBtn");


var RandNumber = 0;

/* Onpaste event */

document.getElementById('textarea').addEventListener('paste', function (event) {
    event.preventDefault();
    var clipboardData = event.clipboardData || window.clipboardData;
    var pastedText = clipboardData.getData('text/plain');
    var modifiedText = pastedText.replace(/\s/g, '_');
    this.value += modifiedText;
});


/* Button listeners */

/* One number */

number.addEventListener("click", function () {

    if (textarea.value == '') {
        alertBlock.removeAttribute("hidden", true);

        header.removeAttribute("hidden", true);
        header.innerHTML = "Enter data please!";
    } else {

        RandNumber = Math.floor(Math.random() * textarea.value);

        header.removeAttribute("hidden", true);

        header.innerHTML = "Random number:" + "\t" + RandNumber;

    }

});

/* Number in current range */

range.addEventListener("click", function () {

    if ((firstNumber.value == '') || (secondNumber.value == '')) {
        alertBlock.removeAttribute("hidden", true);

        header.removeAttribute("hidden", true);
        header.innerHTML = "Enter data please!";
    } else {

        function randomInteger(min, max) {
            let rand = min - 0.5 + Math.random() * (max - min + 1);
            return Math.round(rand);
        }

        var rangeRandom = randomInteger(firstNumber.value, secondNumber.value);

        header.removeAttribute("hidden", true);

        header.innerHTML = "Random number in the current range:" + "\t" + rangeRandom;

    }

});

/* Several random numbers in the range */

sevNumbInRange.addEventListener("click", function () {

    if ((firstNumber.value == '') || (secondNumber.value == '')) {

        alertBlock.removeAttribute("hidden", true);

        header.removeAttribute("hidden", true);
        header.innerHTML = "Enter data please!";

    } else {


        function severalRandNums(min, max) {

            // get the user input for the range

            const rangeStart = parseInt(min);
            const rangeEnd = parseInt(max);

            const quantity = parseInt(prompt("Enter the quantity: "));


            // generate the specified quantity of random numbers within the range

            const randomNumbers = [];

            while (randomNumbers.length < quantity) {

                const random = Math.floor(Math.random() * (rangeEnd - rangeStart + 1)) + rangeStart;

                if (!randomNumbers.includes(random)) {
                    randomNumbers.push(random);
                }
            }

            return `Random Numbers: ${randomNumbers.join(", ")}`;

        }

        var sevRange = severalRandNums(firstNumber.value, secondNumber.value);

        header.removeAttribute("hidden", true);

        header.innerHTML = sevRange;
    }


});

/* Random item */

item.addEventListener("click", function () {

    if ((textarea.value == '') || (typeof textarea.value === Number)) {
        alertBlock.removeAttribute("hidden", true);
        header.removeAttribute("hidden", true);
        header.innerHTML = "Enter data please!";
    } else {

        function getRandomWord() {

            var words = textarea.value.match(/[^\s]+/g);

            var res = Math.floor(Math.random() * words.length);

            //console.log(words.length)
            return (words[res]);
        }

        header.removeAttribute("hidden", true);

        header.innerHTML = "Winner:" + "\t" + getRandomWord();

    }

});

/* Random ordered list */

list.addEventListener("click", function () {

    if ((textarea.value == '') || (typeof textarea.value === Number)) {
        alertBlock.removeAttribute("hidden", true);
    }

    var words = textarea.value.match(/[^\s]+/g);

    if (words != null) {

        function getRandomList(array) {

            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }

            return array;

        }

        words = getRandomList(words);

        header.removeAttribute("hidden", true);

        header.innerHTML = "Random list:" + "\t" + words.join(' => ');

    } else {
        header.removeAttribute("hidden", true);
        header.innerHTML = "Enter data please!";
    }

});

/* Several random items */

severalItems.addEventListener("click", function () {

    if ((textarea.value == '') || (typeof textarea.value === Number) || (quantity.value == '')) {
        alertBlock.removeAttribute("hidden", true);

        header.removeAttribute("hidden", true);
        header.innerHTML = "Enter data please!";
    } else {

        var words = textarea.value.match(/[^\s]+/g);
        var res = [];

        function getRandomValue(words) {

            if (quantity.value > words.length) {
                return "Enter correct value!";
            }

            for (let i = 0; i < quantity.value; i++) {
                res.push(words[Math.floor(Math.random() * words.length)]);
            }

            var seen = {};
            var out = [];
            var len = res.length;
            var j = 0;
            for (var i = 0; i < len; i++) {
                var item = res[i];
                if (seen[item] !== 1) {
                    seen[item] = 1;
                    out[j++] = item;
                }

            }

            if (out.length < quantity.value) {
                out.length = 0;
                res.length = 0;
                return getRandomValue(words);
            }

            return out.join(' & ');

        }


        header.removeAttribute("hidden", true);

        header.innerHTML = "Winners:" + "\t" + getRandomValue(words);
    }
});

/* Random password */

password.addEventListener("click", function () {

    if (pwd_len.value == '') {
        alertBlock.removeAttribute("hidden", true);
    }


    var difficulty;

    if (pwd_len.value == '') {
        header.removeAttribute("hidden", true);
        header.innerHTML = "Enter data please!";
    } else {

        var radio = document.querySelectorAll('input[name="radio"]');
        for (let i = 0; i < radio.length; i++) {
            if (radio[i].checked) {
                difficulty = radio[i].value;

            }
        }

        function generatePassword(pwd_len, difficulty) {
            var psw = [];

            let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "@", "#", "&", "$", "/", "*", "~", "^"];

            if (difficulty == "light") {
                if ((pwd_len.value > 9) || (pwd_len.value < 2)) {
                    return "Can not generate password! ";
                }

                for (let i = 0; i < arr.length; i++) {
                    if (i == pwd_len.value) {
                        break;
                    }
                    psw.push(arr[Math.floor(Math.random() * 9)]);

                }
            } else if (difficulty == "middle") {
                if ((pwd_len.value > 16) || (pwd_len.value < 4)) {
                    return "Can not generate password!";
                }

                for (let i = 0; i < arr.length; i++) {
                    if (i == pwd_len.value) {
                        break;
                    }
                    psw.push(arr[Math.floor(Math.random() * 35)]);

                }
            } else if (difficulty == "difficult") {
                if ((pwd_len.value > 16) || (pwd_len.value < 4)) {
                    return "Can not generate password!";
                }

                for (let i = 0; i < arr.length; i++) {
                    if (i == pwd_len.value) {
                        break;
                    }
                    psw.push(arr[Math.floor(Math.random() * 43)]);

                }
            }

            return psw;

        }

        header.removeAttribute("hidden", true);

        header.innerHTML = generatePassword(pwd_len, difficulty);
    }


});

/* Random colour */

color.addEventListener("click", function () {

    coloredDiv.removeAttribute("hidden", true);

    var r = Math.floor(Math.random() * 256);

    g = Math.floor(Math.random() * 256);

    b = Math.floor(Math.random() * 256);

    textarea.value = "See_color_below:" + "\n" + "rgb(" + r + ", " + g + ", " + b + ")";
    coloredDiv.style.backgroundColor = "rgb(" + r + ", " + g + ", " + b + ")";
});

/* Random smile */

smile.addEventListener("click", function () {

    textarea.value = "See_smile_below!";

    var smileArray = ["&#128513;", "&#128514;", "&#128517;", "&#128518;", "&#128521;", "&#128522;", "&#128523;", "&#128524;", "&#128525;", "&#128526;", "&#128527;", "&#128528;", "&#128536;", "&#128540;", "&#128545;", "&#128548;", "&#128563;", "&#128571;", "&#128591;", "&#128588;", "&#128583;", "&#10084;", "&#128151;", "&#129392;", "&#128293;", "&#128077;", "&#128405;", "&#9996;", "&#129304", "&#128171;", "&#128640;"];

    smileHeader.removeAttribute("hidden", true);

    smileHeader.innerHTML = smileArray[Math.floor(Math.random() * smileArray.length)];

});

/* Meme Generator */

// Meme Api GitHub Link : https://github.com/D3vd/Meme_Api
async function generateMeme(){
    const response = await fetch("https://meme-api.com/gimme/wholesomememes");
    const data = await response.json();
    titleEl.innerHTML = data.title;
    memeEl.setAttribute("src",data.url);
    authorEl.innerHTML = `Meme Created By ${data.author}`
    console.log(data);
}

generateMemeBtnEl.addEventListener("click",generateMeme);

generateMeme();

reset.addEventListener("click", function () {
    textarea.value = null;
    firstNumber.value = null;
    secondNumber.value = null;
    header.setAttribute("hidden", true);
    coloredDiv.setAttribute("hidden", true);
    smileHeader.setAttribute("hidden", true);
    quantityDiv.setAttribute("hidden", true);
    quantity.value = null;
    passwordDiv.setAttribute("hidden", true);
    pwd_len.value = null;
    counterHeader.setAttribute("hidden", true);

    for (let i = 0; i < radio.length; i++) {
        radio[i].checked = false;
    }
});
