// 利用系统时间进行修正
// 还是会有稍微的时间偏差，如果一点偏差都不想要，可以使用 while 循环，但会阻塞 js 执行
// while 循环不是很准确，while 执行会有运行时间，也会导致细小的偏差
const timer = (speed, counter = 1, start = new Date().getTime()) => {
  const loop = () => {
    const real = counter * speed,
      ideal = new Date().getTime() - start;
    counter++;
    const diff = ideal - real;
    console.log(real, ideal, diff);
    setTimeout(loop, speed - diff); // 通过系统时间进行修正
  };
  setTimeout(loop, speed);
};

timer(50);
