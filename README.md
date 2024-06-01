<div align="center">
  <img src="https://github.com/supchyan/kimi-music-obs/assets/123704468/04b49f24-2f25-47a5-8a87-d5eac141359e" height="150" />
</div>
<br/>

## Прежде всего:
Весь оверлей работает на `nodejs`, поэтому, если у вас его нет - надо [установить с офф сайта](https://nodejs.org/en). Проверить установлен ли `nodejs` можно, написав в консоли
```
node --version
```
#### Должен показать версию библиотеки:
![image](https://github.com/supchyan/kimi-music-obs/assets/123704468/8c959592-fc39-4211-ad79-5d7590537e23)

#### Если есть, то можно ехать дальше! А если не работает и пишет, что команды `node` нет, то перезапустите компьютер. Винда система кала, смиритесь.
<br/>

## Установка
В папке репозитория открываем терминал и пишем:
```
./install
```
*У **Windows** в качестве терминала на всех этапах используйте **powershell.*** <br/><br/>

#### Если Windows будет ругаться, что у скрипта нет подписи, то просто выполните его через ПКМ -> Выполнить в PowerShell:
![image](https://github.com/supchyan/kimi-music-obs/assets/123704468/237aeb2b-9bdf-4078-9a9c-cc74da1eae22)
<br/><br/>

После чего `npm` загрузит необходимые для работы пакеты.
<br/>

## Запуск сервера приложения:
В папке репозитория открываем терминал и пишем:
```
./run
```
#### Если всё ок, то увидите это:
![image](https://github.com/supchyan/kimi-music-obs/assets/123704468/22c7d85f-2126-46bb-9692-996574481258)<br/>
*У **Windows**, как и на прошлом этапе, может возникнуть ошибка с отсутствием сертификата,<br/>
так что снова используйте ПКМ -> Выполнить в PowerShell*, убрав галочку `Спрашивать каждый раз` <br/><br/>
<br/><br/>

## Как добавить оверлей в обс:
1. Создаем окно браузера в обс
2. Открываем его свойства и убираем галочку с `Локальный файл`, если стоит, а если не стоит, то тоже убираем В-)
3. Пишем туда адрес сервера из консоли
4. Выставляем размеры окна `640 x 360`
5. Нажимаем `ОК`
<br/><br/>
#### Должно выглядеть как-то так:
![image](https://github.com/supchyan/kimi-music-obs/assets/123704468/f70c46e1-6095-432d-992f-8804b041882b)
<br/><br/>

## ВАЖНО! Настройка конфига:
1. Создаем в корневой папке `config.json`
2. Пишем в него следующее:
```json
{
  "channel":"ваш username",
  "token":"ваш token",
  "rewardType":"ваш id награды",
  "rewardRequired":"1"
}
```
#### Получение `channel`:
![image](https://github.com/supchyan/kimi-music-obs/assets/123704468/ca9668b3-b4e1-4372-a02b-e02240e879ed)
<br/><br/>

#### Получение `token`: 
Генерируется [здесь](https://twitchapps.com/tmi/)
<br/><br/>

#### Получение `rewardType`:
```json
Для начала укажите "channel" и "token", а после запустите сервис через ./run
```
<br/>
Выбираете награду на твиче и в поле ввода пишите `!showType` <br/><br/>

![image](https://github.com/supchyan/kimi-music-obs/assets/123704468/56780f48-e518-4014-80a9-8dc7ccb8199f)

<br/><br/>

После чего приложение отправит в чат идентификатор награды, от вашего имени. <br/>
Вот его надо вставить в конфиге в `rewardType`. Это та награда, при помощи которой пользователи смогут ставить музыку в очередь через ссылки с ютуба. <br/><br/>
![image](https://github.com/supchyan/kimi-music-obs/assets/123704468/1a29a61d-a7ca-4319-b3fb-090d56a68c2f)<br/>
*на скрине показан другой никнейм, но у вас будет ваш!* <br/>
<br/><br/>

#### Что такое `rewardRequired`:
Если у вас нет доступа к наградам твича или вы не хотите заставлять зрителей покупать таким образом музыку на фон, то можете поставить в это поле `0`. Это в принципе отключит необходимость использовать награды и зрители получат возможность ставить очередь треков просто через чат.
<br/><br/>

## Что дальше?
В целом с этого момента оверлей работает и ждет ссылки на ютуб с чата на твиче в приоритете `зритель >>> стример` <br/>
Оверлей проигрывает треки попорядку, если вообще есть что проигрывать, а если нечего, то просто уходит в сон до следующей ссылки в чате. <br/>
Работает только с ютубом, youtube shorts не поддерживает, но поддерживает стримы, так что прямые трансляции музыки в оверлее работают. ( lofi девочка вперед )
<br/><br/>

#### P.S. Список команд приложения: [здесь](https://github.com/supchyan/kimi-music-obs/blob/main/COMMANDS.md)

## Почему не trula?
Приложение позволяет пользоваться собой, как стримеру, так и зрителям. Стример может включить свою музыку на фон (например двух часовой микс амогусов), которая будет ставиться на паузу и заменяться музыкой зрителей, если такая появится, а после, продолжать играть с момента паузы, если музыка зрителей закончится. В общем эдакий плеер для всех на стриме, но зрители в приоритете, ведь кто платит, тот...<br/><br/>

Команды этого приложения могут использовать в том числе модераторы, так что если что-то поломалось или музыка кого-то не устраивает, можно быстро напрямую из чата среаигровать и переключить её или обновить инстанс приложения, если то вдруг перестало корректно работать (но я надеюсь второе делать не потребуется...хд)<br/><br/>

Ещё, кажется у трулы есть опция просмотра очереди треков, но я подумал, что смысла добавлять ее нет, т.к. это можно сделать прям напрямую из управления наградами чата. Доступ к этой вкладке есть у модераторов и стримера соответственно, так что в неведении вы не останетесь. Более того, команда `!currentVideo` показывает любому желающему в чате играющий на стриме трек, так что отсутствие явной очереди не должно особо никого обидеть, наверное.<br/><br/>

Заявлять о себе конечно здорово, но не у каждого же человека на стриме, дак ещё и так навязчиво... Так что ничего лишнего в оверлее вы не увидите, кроме непосредственного видео с ссылки из чата.

## Почему не интегрировал сервер приложения в обс, а прошу хостить отдельно через консоль?
Потому что я не умею по-другому хыхыхы))0<br/>
В целом, человек, под которого я это написал, проблем не испытывает, так что я особо не парился с тем, как это всё лучше завернуть. Может быть как-нибудь потом я это сделаю. В этом плане трула лучше конечно... Юзерфрендли, все дела.


#### На этом всё, до новых встреч!

