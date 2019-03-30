/* eslint-env jquery, browser */
$(document).ready(() => {
  const fadeTime = 500;
  let title = document.querySelector('h1');
  let current = 1;
  const hellos = ['Hello', 'Bonjour', 'Hallo', 'Buongiorno', 'Holà']
  window.setInterval(async () => {
    title.classList.remove('show');
    await new Promise((resolve) => setTimeout(resolve, 200))
    title.innerText = hellos[current++%hellos.length];
    title.classList.add('show');
  }, 2500)

  let input = document.querySelector('input');
  let stuffs = document.querySelector('.stuffs');
  let additionals = document.querySelector('.additionals');
  let tiles = [...additionals.childNodes];

  let hasInteracted = false;
  let idleSince;
  input.addEventListener('input', e => {
    for(let tile of tiles)
      tile.classList.add('collapsed')
    hasInteracted = true;
    idleSince = Date.now();
    // if(input.value[input.value.length-1] == ' '){
    //   for(let tile of tiles)
    //     tile.classList.remove('collapsed');
    // } else {
      window.setTimeout(() => {
        if(hasInteracted && (Date.now() - idleSince >= fadeTime -  50)){
          for(let tile of tiles)
            tile.classList.remove('collapsed');
        }
      }, fadeTime);
    // }
    if(input.value == ''){
      hasInteracted = false;
    }
  });
});
