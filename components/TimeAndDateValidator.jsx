const checkDate = (dataFromAdd) => {
  let time = [];

  //let d = new Date();
  const date = new Date();
  time = new Date().toString().slice(16, 24);

  let dayOfTheMonth = date.getDate();
  let actualMonth = date.getMonth() + 1;

  const getDayNumber = DateToCut => {
    if (DateToCut) {
      const cuttedDate = DateToCut.split("-");
      const t1 = cuttedDate[2] + "-" + cuttedDate[1];

      if (cuttedDate[2].slice(0, 1) <= 0) {
        return cuttedDate[2].slice(1, 2);
      } else {
        return cuttedDate[2];
      }
    }
  };

  const getMonthNumber = DateToCut => {
    if (DateToCut) {
      const cuttedDate = DateToCut.split("-");

      const t1 = cuttedDate[2] + "-" + cuttedDate[1];

      if (cuttedDate[1].slice(0, 1) <= 0) {
        return cuttedDate[1].slice(1, 2);
      } else {
        return cuttedDate[1];
      }
    }
  };

  if (
      dayOfTheMonth == getDayNumber(dataFromAdd) &&
      actualMonth == getMonthNumber(dataFromAdd)
  ) {
    return true;
  } else {
    return false;
  }
};

const checkTime = (timeStart, timeEnd) => {
  let time = [];

  //let d = new Date();
  const date = new Date();
  time = new Date().toString().slice(16, 24);

    const getValueInMinutes = (timeToTransform) => {
        if (timeToTransform != null) {
            const t1 = timeToTransform.split(":")
            const hoursToMinutes = t1[0] * 60
            const a = parseInt(t1[1])
            const timeInMinutes = a + hoursToMinutes
            return timeInMinutes
        }
    }



  if (
    getValueInMinutes(time) < getValueInMinutes(timeEnd) &&
    getValueInMinutes(time) > getValueInMinutes(timeStart)
  ) {
    return true;
  } else {
    return false;
  }
};

export { checkDate, checkTime };
