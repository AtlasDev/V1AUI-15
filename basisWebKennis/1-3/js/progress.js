"use strict";

/* Enclosing all logic in a function, to prevent open access. */
(() => {
  /* Total amount of points. */
  let totalPoints = 0;
  /* Average points per month. */
  let pointsPerMonth = 0;
  /*
   * List of items.
   * This will act link a virtual DOM.
   */
  let items = [{
    vakcode: "TICT-V1PROG-15",
    ects: 5,
    dateEarned: new Date(2016, 11, 10)
  }, {
    vakcode: "TICT-V1CSN-15",
    ects: 5,
    dateEarned: new Date(2016, 11, 7)
  }, {
    vakcode: "TICT-V1ICOR-15",
    ects: 5,
    dateEarned: new Date(2016, 10, 30)
  }, {
    vakcode: "TICT-V1MOD-15",
    ects: 5,
    dateEarned: new Date(2017, 1, 19)
  }, {
    vakcode: "TICT-V1PROF-15",
    ects: 5,
    dateEarned: new Date(2017, 1, 31)
  }, {
    vakcode: "TICT-V1IDP-15",
    ects: 5,
    dateEarned: new Date(2017, 2, 10)
  }, {
    vakcode: "TICT-V1AUI-15",
    ects: 5,
    dateEarned: new Date(2017, 3, 2)
  }, {
    vakcode: "TICT-V1OODC-15",
    ects: 5,
    dateEarned: new Date(2017, 3, 7)
  }, {
    vakcode: "TICT-V1GP-15",
    ects: 5,
    dateEarned: new Date(2017, 4, 1)
  }];

  /* Show the popup when the button has been pressed. */
  document.getElementById('showPopup').onclick = (e) => {
    document.getElementById('popup').classList.remove('hidden');
  };

  /* Close the popup again. */
  document.getElementById('closePopup').onclick = (e) => {
    document.getElementById('popup').classList.add('hidden');
  };

  /* Listens for changes in the input fields. */
  const inputs = document.querySelectorAll("table input");
  for (let i = 0; i < inputs.length; i++) {
    const inputNumber = i;
    let row = (inputNumber - (inputNumber % 3)) / 3;
    inputs[inputNumber].addEventListener('input', (e) => {
      let value = inputs[inputNumber].value;
      if (!inputs[inputNumber].reportValidity()) return;
      if (!inputs[inputNumber].value) return;
      if (inputs[inputNumber].id === 'dateEarned') value = new Date(value);
      if (inputs[inputNumber].id === 'ects') value = Number(value);
      items[row][inputs[inputNumber].id] = value;
      recalculate();
      render();
    });
  };

  /* Recalculate the average values. */
  const recalculate = () => {
    let firstDate = new Date();
    let totalEcts = 0;
    for (var i = 0; i < items.length; i++) {
      if(items[i].dateEarned < firstDate) firstDate = items[i].dateEarned;
      totalEcts += items[i].ects;
      if(i == items.length-1) {
        totalPoints = totalEcts;
        const now = new Date();
        let months = (now.getFullYear() - firstDate.getFullYear()) * 12;
        months -= firstDate.getMonth() + 1;
        months += now.getMonth();
        months = months <= 0 ? 0 : months;
        pointsPerMonth = totalEcts / months;
      }
    }
  };

  /* Render the view, applying all changes. */
  const render = () => {
    document.getElementById('popupEcts').innerHTML = totalPoints;
    document.getElementById('popupEctsMonth').innerHTML = pointsPerMonth;
    document.getElementById('popupTotalMonths').innerHTML = 45 / pointsPerMonth;
  };

  /* Recalculate & render once, so all values will be filled. */
  recalculate();
  render();
})();
