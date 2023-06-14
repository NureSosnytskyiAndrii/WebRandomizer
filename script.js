/* variables */

var textarea = document.getElementById("textarea");

var number = document.getElementById("number");

var range = document.getElementById("range");

var sevNumbInRange = document.getElementById("several_num_in_range");

var item = document.getElementById("item");

var list = document.getElementById("list");

var severalItems = document.getElementById("severalItems");

var quantity = document.getElementById("quantity");

var quantityDiv = document.getElementById("quantityDiv");

var pwd_len = document.getElementById("pwd_len");

var password = document.getElementById("password");

var radio = document.querySelectorAll(".pwdRadio");

var passwordDiv = document.getElementById("passwordDiv");

var color = document.getElementById("color");

var coloredDiv = document.querySelector(".color");

var smile = document.getElementById("smile");

var smileHeader = document.getElementById("smileHeader");

var image = document.getElementById("image");

var character = document.getElementById("character");

var animImage = document.getElementById("animImage");

var header = document.getElementById("header");

var counterHeader = document.getElementById("counterHeader");

var firstNumber = document.getElementById("firstNumber");

var secondNumber = document.getElementById("secondNumber");

var alert = document.getElementById("alert");

var alertBlock = document.getElementById("alert_block");

var reset = document.getElementById("reset");


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

/* Random Naruto character */

animImage.addEventListener("click", function () {
    image.removeAttribute("hidden", true);
    var src = ["https://static.wikia.nocookie.net/naruto/images/3/34/Sasuke_Part_1.jpg/revision/latest?cb=20210404192311&path-prefix=ru", "https://static.wikia.nocookie.net/naruto/images/0/09/Naruto_newshot.png/revision/latest?cb=20210213224703&path-prefix=ru", "https://static.wikia.nocookie.net/naruto/images/6/64/Sakura_Part_1.png/revision/latest?cb=20210224205026&path-prefix=ru", "https://static.wikia.nocookie.net/naruto/images/2/27/Kakashi_Hatake.png/revision/latest?cb=20210214190655&path-prefix=ru", "https://static.wikia.nocookie.net/naruto/images/9/97/Hinata.png/revision/latest?cb=20150215152718&path-prefix=ru", "https://static.wikia.nocookie.net/naruto/images/b/bb/Itachi.png/revision/latest?cb=20210225204731&path-prefix=ru", "https://static.wikia.nocookie.net/naruto/images/0/0c/Madara_img2.png/revision/latest?cb=20210227095726&path-prefix=ru", "https://static.wikia.nocookie.net/naruto/images/4/46/Nagato.png/revision/latest?cb=20200327005137&path-prefix=ru", "https://static.wikia.nocookie.net/naruto/images/4/4a/Obito_Uchiha.png/revision/latest?cb=20210214221823&path-prefix=ru", "https://static.wikia.nocookie.net/naruto/images/9/9a/Sarada_Infobox.png/revision/latest?cb=20180723152825&path-prefix=ru", "https://static.wikia.nocookie.net/naruto/images/4/4a/Gaara_p1.png/revision/latest?cb=20190310163727&path-prefix=ru", "https://static.wikia.nocookie.net/naruto/images/2/21/Profile_Jiraiya.PNG/revision/latest?cb=20170818131513&path-prefix=ru", "https://static.wikia.nocookie.net/naruto/images/7/71/Minato_Namikaze.png/revision/latest?cb=20200324174322&path-prefix=ru", "https://static.wikia.nocookie.net/naruto/images/9/97/Rock_Lee_Part_I.png/revision/latest?cb=20190205134607&path-prefix=ru", "https://static.wikia.nocookie.net/naruto/images/1/14/Orochimaru_Infobox.png/revision/latest?cb=20151017160235&path-prefix=ru", "https://static.wikia.nocookie.net/naruto/images/8/8e/Neji_Part_I_Screenshot.png/revision/latest?cb=20210313213316&path-prefix=ru", "https://static.wikia.nocookie.net/naruto/images/4/44/Shikamaru_Part_I.png/revision/latest?cb=20180225131949&path-prefix=ru", "https://static.wikia.nocookie.net/naruto/images/8/89/Konohamaru_p1.png/revision/latest?cb=20150215165046&path-prefix=ru", "https://static.wikia.nocookie.net/naruto/images/6/68/New_Boruto_infobox.png/revision/latest?cb=20220319093513&path-prefix=ru", "https://static.wikia.nocookie.net/naruto/images/0/07/Sai_Infobox.png/revision/latest?cb=20190419133920&path-prefix=ru", "https://static.wikia.nocookie.net/naruto/images/c/c9/Kabuto_Part_1.png/revision/latest?cb=20170906124719&path-prefix=ru", "https://static.wikia.nocookie.net/naruto/images/5/5c/Mitsuki.png/revision/latest?cb=20180830180405&path-prefix=ru", "https://static.wikia.nocookie.net/naruto/images/f/f7/Yamato_newshot.png/revision/latest?cb=20190202094154&path-prefix=ru", "https://static.wikia.nocookie.net/naruto/images/9/9c/Shino.png/revision/latest?cb=20170831172651&path-prefix=ru"];

    var characters = ["Sasuke Uchiha", "Naruto Uzumaki", "Sakura Haruno", "Kakashi Hatake", "Hinata Hyuga", "Itachi Uchiha", "Madara Uchiha", "Nagato", "Obito Uchiha", "Sarada Uchiha", "Gaara", "Jiraiya", "Minato Namikaze", "Rock Lee", "Orochimaru", "Neji Hyuga", "Nara Shikamaru", "Sarutobi Konohamaru", "Uzumaki Boruto", "Sai", "Yakushi Kabuto", "Mitsuki", "Yamato", "Aburame Shino"];

    var num = Math.floor(Math.random() * src.length);

    image.src = src[num];

    textarea.value = "See_character_below!";
    character.removeAttribute("hidden", true);
    character.innerHTML = characters[num];
});

reset.addEventListener("click", function () {
    textarea.value = null;
    firstNumber.value = null;
    secondNumber.value = null;
    header.setAttribute("hidden", true);
    coloredDiv.setAttribute("hidden", true);
    smileHeader.setAttribute("hidden", true);
    image.setAttribute("hidden", true);
    character.setAttribute("hidden", true);
    quantityDiv.setAttribute("hidden", true);
    quantity.value = null;
    passwordDiv.setAttribute("hidden", true);
    pwd_len.value = null;
    counterHeader.setAttribute("hidden", true);

    for (let i = 0; i < radio.length; i++) {
        radio[i].checked = false;
    }
});
