const config = {
  min: 40,
  max: 250,
  prices: 215,
}

// 

let oll_price = document.querySelector('.product-calculator-data__price'),
    s_oll = document.querySelector('.product-calculator-data__s'); 

const setPriceAndS = () => {
  const w = document.querySelector('.product-calculator-data-input-width input'),
      h = document.querySelector('.product-calculator-data-input-height input')
      n = document.querySelector('.product-calculator-data-quantity__input');
      s = (w.value * h.value / 10000) * n.value
      s_oll.textContent = `${(s).toFixed(2)} м2`;
  // oll_price.textContent = `${(s * config.prices)} €`;
  setTimeout(function(){
    odometer.innerHTML = (s * config.prices).toFixed(2);
}, 500);
} 
 
setPriceAndS()

// 


let inputs = document.querySelectorAll('.product-calculator-data__input-input input'),
    span = document.querySelector('.product-calculator-img__span span'),
    inputs_width = document.querySelector('.product-calculator-img__width .product-calculator-img__num'),
    inputs_height = document.querySelector('.product-calculator-img__height .product-calculator-img__num');

let errorinput = () => {
  if (inputs && inputs[0] && inputs[1]) {  
    if (inputs[0].value >= config.min && inputs[0].value <= config.max) {
      inputs[0].parentElement.style.border = '1px solid #36373833';
      if (inputs[1].value >= config.min && inputs[1].value <= config.max) {
        inputs[1].parentElement.style.border = '1px solid #36373833';
        return true;
      } else {
        inputs[1].parentElement.style.border = '1px solid red';
      }
    } else {
      inputs[0].parentElement.style.border = '1px solid red';
    }
  } else {
    console.log('Error: инпутов нет')
  }
  return false;
}

let   select_text = document.querySelector('.product-calculator-data__select-item-title');

inputs.forEach(item => {
  item.addEventListener('change', () => {
    if (errorinput()) {
      select_text.textContent = 'Выбрать...'
      let input_value_1 = inputs[0].value,
          input_value_2 = inputs[1].value,
          result_1 = 100,
          result_2 = 100;
      if (input_value_2 / input_value_1 * 100 <= 100) {
        result_2 = input_value_2 / input_value_1 * 100;
      } else {
        result_1 = input_value_1 / input_value_2 * 100;
      }
      console.log(input_value_1, input_value_2);
      if (result_1 < 25) {
        result_1 = 25;
        result_2 = 100;
      } else if (result_2 < 25) {
        result_1 = 100;
        result_2 = 25;
      }
      span.parentElement.style.width = result_2+'%';
      span.style.height = result_1+'%';
      document.querySelector('.product-calculator-img__width').style.width = result_2+'%';
      document.querySelector('.product-calculator-img__height').style.height = result_1+'%';
      inputs_width.innerHTML = input_value_2;
      inputs_height.innerHTML = input_value_1;
      setPriceAndS()
    } 
  })
});

// Todo: Обработчик кнопок

let up = document.querySelector('.product-calculator-data-quantity__up'), 
    down = document.querySelector('.product-calculator-data-quantity__down'),
    input_up_down = document.querySelector('input.product-calculator-data-quantity__input');

up.addEventListener('click', (e) => {
  e.preventDefault();
  input_up_down.value++;
  setPriceAndS()
})

down.addEventListener('click', (e) => {
  e.preventDefault();
  if (input_up_down.value < 2) {
    input_up_down.value = 1;
  } else {
    input_up_down.value--;
  }
  setPriceAndS()
})

input_up_down.addEventListener('change', (e) => {
  if (input_up_down.value < 2) {
    input_up_down.value = 1;
  }
  setPriceAndS()
})

// Todo: Селект


let select_row = document.querySelector('.product-calculator-data__select-item-title-row'),
    select_elems = document.querySelectorAll('.product-calculator-data__select-item-title-elem');

select_text.addEventListener('click', (e) => {
  select_row.classList.toggle('active');
})

select_elems.forEach((elem) => {
  elem.addEventListener('click', (e) => {
    let spans = elem.querySelectorAll('span');
    inputs[0].value = spans[0].textContent;
    inputs[1].value = spans[1].textContent;
    inputs.forEach(item => {
        if (errorinput()) {
          select_text.textContent = elem.textContent;
          let input_value_1 = inputs[0].value,
              input_value_2 = inputs[1].value,
              result_1 = 100,
              result_2 = 100;
          if (input_value_2 / input_value_1 * 100 <= 100) {
            result_2 = input_value_2 / input_value_1 * 100;
          } else {
            result_1 = input_value_1 / input_value_2 * 100;
          }
          console.log(input_value_1, input_value_2);
          if (result_1 < 25) {
            result_1 = 25;
            result_2 = 100;
          } else if (result_2 < 25) {
            result_1 = 100;
            result_2 = 25;
          }
          span.parentElement.style.width = result_2+'%';
          span.style.height = result_1+'%';
          document.querySelector('.product-calculator-img__width').style.width = result_2+'%';
          document.querySelector('.product-calculator-img__height').style.height = result_1+'%';
          inputs_width.innerHTML = input_value_2;
          inputs_height.innerHTML = input_value_1;
          setPriceAndS()
        } 
    });

  })
});

document.querySelector('body').addEventListener('click', (e) => {
  if (e.target !== select_row && e.target !== select_text) {
    select_row.classList.remove('active');
  }
})