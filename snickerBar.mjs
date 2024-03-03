export default class Bar {
  /**
   * @constructor
   * @param {{type: 'warning' | 'error' | 'success' | 'info'}} options
   */
  #barType;
  #showIcon;
  #theBody;
  #theIcon;
  #theText;

  constructor({ type, showIcon = true }) {
    this.#barType = type;
    this.#showIcon = showIcon;
  }

  appendOn({ element, vlang: { attr, value }} = {
    element: HTMLElement
  }) {
    const el = element instanceof HTMLElement ? element : document.querySelector(element);

    const [body, container, image, text] = [
      document.createElement('div'),
      document.createElement('div'),
      document.createElement('img'),
      document.createElement('p')
    ]

    body.dataset.id = 'snickerbar';
    body.classList.add('body');
    body.classList.add('center-with-flex');

    container.classList.add('container');
    container.id = this.#barType
    body.appendChild(container);
    
    image.src = `./global/images/bar/${this.#barType}.svg`;
    
    !this.#showIcon ? container.classList.add('noIcon') : undefined;
    this.#showIcon ? container.appendChild(image) : undefined;

    text.classList.add('text');
    text.setAttribute(`vlang-${attr}`, value);
    container.appendChild(text);

    el.appendChild(body);

    this.#theBody = body;
    this.#theIcon = image;
    this.#theText = text;

    return this;
  }
  
  show() {
    this.#theBody.style.display = 'block';

    return this
  }

  hide() {
    this.#theBody.style.display = 'none';

    return this;
  }
  
  change({ type, vlang: { attr, value } }) {
    this.#theBody.id = type;
    this.#theIcon.src = `./global/images/bar/${type}.svg`;
    this.#theText.setAttribute(`vlang-${attr}`, value);

    return this
  }
}
