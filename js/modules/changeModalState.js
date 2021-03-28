
import checkNumInput from './checkNumInput';

const changeModalState = (state) => {
    const windowForm = document.querySelectorAll('.balcon_icons_img'),
          windowWidth = document.querySelectorAll('#width'),
          windowHeigth = document.querySelectorAll('#height'),
          windowType = document.querySelectorAll('#view_type'),
          windowProfile = document.querySelectorAll('.checkbox');

          checkNumInput('#width');
          checkNumInput('#height');


    function bindActionToElem(event, elem, key){
        elem.forEach((item, i) => {
            item.addEventListener(event, () => {
                switch (item.nodeName) {
                    case 'SPAN':
                        state[key] = i;
                        break;
                    case 'INPUT':
                        if (item.getAttribute('type') === 'checkbox') {
                            i === 0 ? state[key] = "Холодное" : state[key] = "Теплое";

                            elem.forEach((box, j) => {
                                box.checked = false;
                                if(i == j) {
                                    box.checked = true;
                                }
                            });

                        }else {
                            state[key] = item.value;
                        }
                        break;
                    case 'SELECT':
                        state[key] = item.value;
                        break;
                }

                console.log(state);
            });
        });
    }

    bindActionToElem('click', windowForm, 'form');
    bindActionToElem('input', windowWidth, 'width');
    bindActionToElem('input', windowHeigth, 'heigth');
    bindActionToElem('change', windowType, 'type');
    bindActionToElem('change', windowProfile, 'profile');
    


};
export default changeModalState;