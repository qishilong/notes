// function sleep(duration: number) {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve(undefined);
//         }, duration);
//     });
// }

function sleep(duration: number) {
    const start = Date.now();
    while (Date.now() - start < duration) {
        continue;
    }
}

// console.log(1);
// sleep(1000);
// console.log(2);