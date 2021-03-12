
import { addModaLListeners } from "../listeners/modalListeners.js";

export function printModal(text) {
    const $modal = `
          <div class='modal__background' id='modalBackground'>
              <div class='modal'>
                  <p class='modal__text'> ${text} </p>
                  <button>Ok</button>
              </div>
          </div>
      `;
  
    document.querySelector("body").innerHTML += $modal;
    addModaLListeners();
  }