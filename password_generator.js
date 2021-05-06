'use strict';

/**
 * Generates a password by randomizing allowed characters
 * 
 * @param {int} length Password length
 * @param {int} pCase 1 = mixed case, 0 = miniscule
 * @param {int} pNumber 1 = mix numbers, 0 = don't mix numbers
 * @param {int} pSymbol 1 = mix symbols, 0 = don't mix symbols
 * @return {string} pwd 
 */
const passwordGen = (length = 25, pCase = 1, pNumber = 1, pSymbol = 1) => {
    if (isNaN(Number(length)) || length < 4) return 'A minimum length of 4 must be provided for the password.';
    const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    const symbols = ['+', '=', '_', '*', '@', '-', '/', '[', ']', '{', '}', '(', ')'];
    let pwd = '';
    let mix = [...alphabet];

    if (Number(pNumber) === 1) mix = [...mix, ...numbers];
    if (Number(pSymbol) === 1) mix = [...mix, ...symbols];

    for (let i = 0; i < length; i++) {
        let rand = getRandomInt(0, mix.length);
        pwd += rand % 3 === 0 && Number(pCase) === 1 ? mix[rand].toUpperCase() : mix[rand];
    }

    return pwd;
}

/**
 * Get a random int in range
 * The maximum is exclusive and the minimum is inclusive
 * 
 * @param {int} min floor
 * @param {int} max ceiling
 * @return {int} Random int
 */
const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

/**
 * Uses MacOS pb copy to copy data to clipboard
 * 
 * @param {string} data Data to copy in the clipboard
 */
const pbcopy = (data) => {
    let proc = require('child_process').spawn('pbcopy'); 
    proc.stdin.write(data); 
    proc.stdin.end();
}

/**
 * Save data to clipboard depending on the OS
 * 
 * @param {string} data 
 * @return {boolean} true on success 
 */
const saveToClipboard = data => {
    switch(process.platform){
        case 'darwin': 
            pbcopy(data);
            return true;
        case 'win32': // clipboard bindings missings
            return false;
        case 'linux': // clipboard bindings missings
            return false;
    }
}

let pwd = passwordGen(...process.argv.slice(2));
console.log('* Usage: \n\nnode pwdgen.js [length:int] [case sensitivity:1|0] [numbers:1|0] [symbols:1|0]\n');
console.log('* Default settings are length = 25, case sensitivity = 1, numbers = 1, symbols = 1\n');
if(saveToClipboard(pwd)) console.log(`* Password generated and saved to clipboard! \n* Password: \x1b[33m${pwd}\x1b[0m\n`);
else console.log(`* Password generated but could not be saved to clipboard! \nPassword: \x1b[33m${pwd}\x1b[0m`);
