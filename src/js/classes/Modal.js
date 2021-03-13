
export class Modal {
  constructor(message, callback) {
      this.callback = callback;
      this.printModal(message);
  }

  printModal(message) {
    const modal = `
          <div class='modal__background' id='modalBackground'>
              <div class='modal'>
                  <p class='modal__text'> ${message} </p>
                  <button id='modalButton'>Ok</button>
              </div>
          </div>
      `;

    this.$modal = $(modal);
    console.log(this.$modal);
    $("body").append(this.$modal);

    this.addModaLListeners();
  }

  removeModal() {
    $(this.$modal).remove();
  }

  addModaLListeners() {
    $(this.$modal).on("click", (event)=>{
        if($(event.target).hasClass('modal__background') || $(event.target).attr('id') == 'modalButton'){
            this.removeModal();
            this.callback();
        }
    })
  }
}
