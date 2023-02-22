# Лабораторна робота №2

## Запуск програми

### yarn

```bash
yarn start
```

### npm

```bash
npm run start
```

## Контрольні питання

1. В чому різниця між setTimeout та setInterval

   **setTimeout** та **setInterval** є двома методами JavaScript, які дозволяють виконувати код через певний час після його виклику. Основна різниця між цими методами полягає в тому, що **setTimeout** виконує функцію один раз після заданого інтервалу часу, тоді як **setInterval** виконує функцію з інтервалом часу між кожним виконанням.

2. Що таке блокуючий код?

    У Node.js є не блокуючий та блокуючий код. Блокуючий код - це код, який зупиняє виконання програми, доки не будуть завершені певні операції, такі як введення/виведення даних або запит до бази даних.

    У блокуючого коду, коли одна операція виконується, програма не може перейти до наступної операції, що призводить до затримок в роботі програми. Це може бути особливо проблематично для серверних застосунків, які повинні обслуговувати багато запитів одночасно.

    Node.js дозволяє використовувати асинхронний код, який не блокує виконання програми. Замість цього, операції запускаються в фоновому режимі, і програма може продовжувати виконання інших задач, доки вони не завершаться. Це забезпечує більшу ефективність і продуктивність застосунків, особливо у випадку, коли необхідно обробляти багато запитів одночасно.

3. Які переваги асинхронного читання з диску перед синхронним?

    Асинхронне читання з диску в Node.js має кілька переваг порівняно з синхронним читанням:

    - **Ефективність:** Асинхронне читання з диску дозволяє Node.js продовжувати виконання інших задач під час очікування відповіді від диску. Це дозволяє виконувати більше операцій в одиницю часу і знижує час відгуку.

    - **Масштабованість:** Асинхронні операції дозволяють Node.js обробляти більше запитів за одиницю часу. Коли сервер обробляє велику кількість запитів одночасно, асинхронні операції можуть допомогти уникнути блокування і падінь продуктивності.

    - **Робота з файлами більшого розміру:** Асинхронне читання з диску дозволяє читати файли більшого розміру, не обмежуючи при цьому продуктивність додатку.

    - **Обробка помилок:** Асинхронне читання з диску дозволяє зручно обробляти помилки. Зазвичай, при синхронному читанні з диску, будь-яка помилка зупиняє виконання програми. Асинхронне читання з диску дозволяє використовувати механізми обробки помилок, які забезпечують більш стабільну роботу програми.

    Отже, асинхронне читання з диску має більше переваг порівняно зі синхронним читанням з диску, коли мається справа з операціями вводу/виводу в Node.js.

4. Опишіть різницю між Callbacks API, Promise API та async / await.

    **Callbacks API:** Це старіший підхід, що використовує функції зворотного виклику для обробки асинхронних запитів. Функція зворотного виклику передається як аргумент функції, яка виконує асинхронну операцію. Після завершення операції викликається функція зворотного виклику з результатами.

    ```javascript
    function getData(callback) {
      // виконати запит до сервера
      callback(data);
    }

    // використання
    getData(function(data) {
      console.log(data);
    });
    ```

    **Promise API:** Це покращений підхід до обробки асинхронних запитів, що використовує об'єкти Promise для представлення асинхронної операції та її результатів. Об'єкт Promise повертається з функції, яка виконує асинхронну операцію. Після завершення операції, Promise може бути вирішеним або відхиленим зі значенням, яке представляє результат операції або помилку.
    Приклад:

    ```javascript
    function getData() {
      return new Promise(function(resolve, reject) {
        // виконати запит до сервера
        if (success) {
          resolve(data);
        } else {
          reject(error);
        }
      });
    }

    // використання
    getData().then(function(data) {
      console.log(data);
    }).catch(function(error) {
      console.log(error);
    });
    ```

    **async/await:** Це новіший підхід до обробки асинхронних запитів, що використовує ключові слова async та await. Функції, які містять ключове слово async, повертають Promise, який може бути вирішений або відхилений. Ключове слово await застосовується до Promise та чекає на його вирішення або відхилення перед продовженням виконання коду.
    Приклад:

    ```javascript
    async function getData() {
      try {
        const data = await fetchData();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }

    // використання
    getData();
    ```

    Основні відмінності між цими підходами:
    - Callbacks використовують функції зворотного виклику, тоді як Promise та async/await повертають об'єкти Promise.
    - Promise та async/await дають зручний спосіб обробки помилок, який відсутній в Callbacks.
    - Async/await є більш читабельним та зручним для розробників, оскільки виключає необхідність використання ланцюжків .then().
    - Async/await зменшує вкладеність коду в порівнянні з Callbacks та Promise.

5. Як оброблюються помилки при використанні Promise API?

    Помилки при використанні Promise API обробляються за допомогою методу catch(), який приймає функцію зворотного виклику, яка буде викликана, якщо Promise буде відхилений.

    При виконанні асинхронної операції, Promise може бути вирішеним або відхиленим. Якщо Promise вирішений, функція зворотного виклику, передана методом .then(), буде виконана з результатом операції. Якщо Promise відхилено, буде виконана функція зворотного виклику, передана методом .catch(), з помилкою, яка була відкинута.

    Наприклад:

    ```javascript
    function getData() {
      return new Promise(function(resolve, reject) {
        // виконати запит до сервера
        if (success) {
          resolve(data);
        } else {
          reject(new Error('Помилка!'));
        }
      });
    }

    // використання
    getData().then(function(data) {
      console.log(data);
    }).catch(function(error) {
      console.log(error.message);
    });
    ```

    У цьому прикладі, якщо операція завершиться успішно, функція передана методом .then() буде викликана з результатом операції. Якщо операція закінчиться невдачею, функція передана методом .catch() буде викликана з помилкою, яка була відкинута.

    Окрім методу .catch(), також можна використовувати метод .finally(), який буде викликаний незалежно від того, чи відбулася операція успішно, чи виникла помилка.

6. Як створити директорію через модуль fs? За що відповідає параметр mode?

    Щоб створити директорію за допомогою модуля fs, можна використовувати метод fs.mkdir(). Наприклад:

    ```javascript
    const fs = require('fs');

    fs.mkdir('/повний/шлях/до/директорії', function(err) {
      if (err) {
        console.error(err);
      } else {
        console.log('Директорію створено успішно!');
      }
    });
    ```

    У цьому прикладі метод fs.mkdir() створює директорію за вказаним шляхом. Функція зворотного виклику, передана як другий параметр, викликається після завершення операції створення директорії.

    Другий параметр методу fs.mkdir() - це параметр mode, який вказує, які права повинні бути надані новій директорії. Це необов'язковий параметр і за замовчуванням йому присвоюється значення 0o777 (що відповідає правам доступу 0777 в восьмеричному форматі). Значення mode може бути встановлено у восьмеричному форматі, або у строковому форматі, наприклад: '777' або '0755'.

    Наприклад, якщо потрібно надати новій директорії права доступу 0755, то можна використати такий код:

    ```javascript
    fs.mkdir('/повний/шлях/до/директорії', { mode: 0o755 }, function(err) {
      if (err) {
        console.error(err);
      } else {
        console.log('Директорію створено успішно!');
      }
    });
    ```

    Таким чином, параметр mode відповідає за надання прав доступу до новоствореної директорії.
