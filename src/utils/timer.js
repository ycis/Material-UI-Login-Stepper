const duration = 10000;
export const getDuration = () => duration;
export const decrementTimer = (timer, updateTimer) => {
  timer.distance = timer.expires - Date.now() + 1000;
  timer.percentage = Math.floor((timer.distance / duration) * 100);
  timer.displayText =
    timer.distance > 1
      ? Math.floor((timer.distance % 3600000) / 60000) +
        ":" +
        (
          new Array(3).join(0) + Math.floor((timer.distance % 60000) / 1000)
        ).slice(-2)
      : "PIN Expired";
  if (timer.distance > 0) {
    timer.id = setTimeout(() => updateTimer(timer), 1000);
  } else {
    timer.id = 0;
    timer.percentage = 0;
  }
  return timer;
};
