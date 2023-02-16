export const randomColor = () : string => {
    const maxVal = 0xFFFFFF; // 16777215
    let randomNumber = Math.random() * maxVal; 
    randomNumber = Math.floor(randomNumber);
    const randColor = randomNumber.toString(16);
    return '#' + randColor;
}