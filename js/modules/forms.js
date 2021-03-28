import checkNumInput from './checkNumInput';

const forms = (state) => {
    const form = document.querySelectorAll('form'),
          input = document.querySelectorAll('input');

    checkNumInput('input[name="user_phone"]');

    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Мы скоро с вами свяжемся',
        fail: 'Что-то пошло не так'
    };

    const postDate = async (url, data) => {
        document.querySelector('.status').textContent = message.loading;
        const res = await fetch(url, {
            method: 'POST',
            body: data
        });
        return await res.text();
    };

    const resetInput = () => {
        input.forEach(item => {
            item.value = '';
        });
    };



    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
                statusMessage.classList.add('status');
                item.append(statusMessage);

            const formData = new FormData(item);
            //Собираем динамические данные с форм 
            if(item.getAttribute('data-calc') === 'end') {
                for(let key in state) {
                    formData.append(key, state[key]);
                }
            }

            postDate('assets/server.php', formData)
                .then(result => {
                    console.log(result);
                    statusMessage.textContent = message.success;
                }).catch( () => statusMessage.textContent = message.fail)
                .finally(() => {
                    resetInput();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 2000);
                });
        });
    });
};

export default forms;