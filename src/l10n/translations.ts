/*
 * Copyright 2019 s4y.solutions
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import T from './index';

const translation = {
  'en': {
    'Add': 'Add',
    'AppTitle': 'Map2',
    'Bing': 'Bing',
    'BingBirdsEye': 'Bird\'s Eye',
    'BingMaps': 'Maps',
    'BingRoads': 'Roads',
    'BingSatellite': 'Satellite',
    'BingHybrid': 'Hybrid',
    'Choose best category': 'You are going to plan one of:',
    'Choose best route': 'which consist from:',
    'Cosmos': 'Cosmos',
    'Delete line': 'Delete track',
    'Delete point': 'Delete point',
    'Description': 'Description',
    'ESRI': 'ESRI',
    'Expedition': 'Expedition',
    'Export': 'Export',
    'Export menu': 'Export',
    'File': 'File',
    'Genshtab': 'Soviet Militaty maps',
    'GeoHub': 'GeoHub',
    'GeoPortal': 'Geo Portal',
    'Google': 'Google',
    'GoogleEarth': 'Google Earth',
    'GoogleLandscape': 'Landscape',
    'GoogleMap': 'Map',
    'GoogleSatellite': 'Satellite',
    'GoogleHybrid': 'Hybrid',
    'Historical': 'Historical',
    'Import menu': 'Import',
    'Items': 'Items',
    'LatLon': 'Latitude, longitude',
    'Line': 'Line',
    'LocalMaps': 'Local maps',
    'Mailru': 'Mail.ru',
    'Marina': 'Marina',
    'Modify point': 'Modify point',
    'Modify line': 'Modify track ',
    'Moscow': 'Moscow',
    'Navteq': 'Navteq',
    'Nokia': 'Nokia',
    'Orphan': '...',
    'OSM': 'OSM',
    'Others': 'Others',
    'Personalization': 'Personalization',
    'Personalize wording': 'Please choose a wording that describes your activity best',
    'Plan': 'Day Plan',
    'Point': 'Point',
    'Points': 'Points',
    'Project': 'Project',
    'Route': 'Day Route',
    'Settings': 'View',
    'Skip this dialog': 'Don\'t show this dialog for next 10 seconds',
    'Sources': 'Maps',
    'Space': 'Space',
    'Title': 'Title',
    'The feature will be deleted, are you sure?': 'Вы уверены в удалении?',
    'Tools': 'Show/hide tools panel',
    'Tourist': 'Tourist',
    'Travel': 'Travel',
    'Trip': 'Trip',
    'Yahoo': 'Yahoo',
    'Yandex': 'Yandex',
    'YandexMap': 'OlMap.tsx.d.ts.jsx.tsx',
    'YandexPublic': 'Public',
    'YandexSatellite': 'Sattelite',
    'Yes, delete the feature': 'Да, удалить',

    'Delete feature point hint': 'Delete the point',
    'Delete feature line hint': 'Delete the line',
    'Modify feature point hint': 'Modify the point',
    'Modify feature line hint': 'Modify the line',
    'Open feature point hint': 'Show properties of the point',
    'Open feature line hint': 'Show properties of the line',
    'Visibility off feature point hint': 'Hide the point on the map',
    'Visibility off feature line hint': 'Hide the line on the map',
    'Visibility on feature point hint': 'Show the point on the map',
    'Visibility on feature line hint': 'Show the line on the map',
  },
  'ru': {
    'About': 'О сервисе',
    'About beta': `Map2 находится в активной разработке, изменения в работу могут вноситься в любой момент и без предупреждения.
Возможно наличие ошибок приводящих к потере данных. Для того, чтобы избежать полной потери результатов работы выполняйте экспорт
в KML файл настолько часто, насколько возможно.`,
    'About networking': `В настоящее время Map2 не использует никакие сетевые ресурсы, не загружает и не передает никаких данных.
Это значит, что все созданные точки и треки хранятся исключительно на вашем компьютере и только в одном браузере.
Для того, чтобы открыть их в другом браузере необходимо выполнить экспорт в KML файл и импортировать его в другое приложение или сервис.`,
    'About Red Off-road': 'За финансовая поддержкy: Экспедиционный проект',
    'About service': 'Map2 предназначен для создания и организации навигационных треков в формате KLM пригодных для загрузки в навигационные приложения и сервисы',
    'About Tulupov': 'За мотивацию:',
    'About Nevinski': 'За идеи:',
    'Authors': '',
    'Add': '+',
    'AppTitle': 'Map2',
    'Bing': 'Bing',
    'BingBirdsEye': 'Berid\'s Eye',
    'BingMaps': 'Карты',
    'BingHybrid': 'Гибрид',
    'BingRoads': 'Карты',
    'BingSatellite': 'Спутник',
    'Cancel': 'Отмена',
    'Cancel import and fix the file manually': 'Отменить импорт и исправить файл вручную',
    'Choose best category': 'Вы организуете...',
    'Choose best route': 'которые содержат или состоят из...',
    'Click fix the file automatically': 'Исправить файл автоматически',
    'Click to upload': 'Загрузить файлы',
    'Close': 'Закрыть',
    'Cosmos': 'Космоснимки',
    'Credentials': 'Благодарности',
    'Delete line': 'Удалить трек',
    'Delete point': 'Удалить точку',
    'Description': 'Описание',
    'ESRI': 'ESRI',
    'Expedition': 'Экспедиция',
    'Export': 'Экспорт',
    'Export menu': 'Экспорт',
    'Export all': 'Экспорт всего каталога',
    'Feedback': 'Обратная связь',
    'Fix': 'Исправить',
    'File': 'Файлы',
    'Genshtab': 'Генштаб',
    'GeoHub': 'GeoHub',
    'GeoPortal': 'Геопортал',
    'Google': 'Google',
    'GoogleEarth': 'Google Earth',
    'GoogleLandscape': 'Рельеф',
    'GoogleMap': 'Карты',
    'GoogleSatellite': 'Спутник',
    'GoogleHybrid': 'Гибрид',
    'Historical': 'Исторические',
    'Import': 'Импорт данных',
    'Import menu': 'Импорт',
    'Import KML': 'Импорт данных из KML файлов',
    'Items': 'Пункты',
    'LatLon': 'Широта, долгота',
    'Line': 'Трек',
    'LocalMaps': 'Локальные карты',
    'Mailru': 'Mail.ru',
    'Marina': 'Морские карты',
    'Modify point': 'Изменить точку',
    'Modify line': 'Изменить трек',
    'Moscow': 'Генплан Москвы',
    'Navteq': 'Navteq',
    'Nokia': 'Nokia',
    'Only visible': 'Только видимые',
    'or drop files here': 'или перетащить файлы сюда',
    'OSM': 'OSM',
    'Others': 'Другие карты',
    'Personalization': 'Персонализация',
    'Personalize wording': 'Выберите слова, которые лучше описывают вашу деятельность:',
    'Plan': 'Дневной план',
    'Point': 'Точка',
    'Points': 'Точки',
    'Possible actions:': 'Возможные действия:',
    'Problem: Some folders have both features and subfolders': 'Обнаружена проблема: некоторые папки содержат и метки и вложенные папки',
    'Problem: Some folders have more than 2 levels on nesting': 'Обнаружена проблема: некоторые папки имееют более 2х уровней вложенности',
    'Project': 'Проект',
    'Route': 'Маршрут',
    'Settings': 'Вид',
    'Skip this dialog': 'Не показывать это сообщение в течении 10 секунд',
    'Sources': 'Карты',
    'Space': 'Космос',
    'Title': 'Наименование',
    'Tools': 'Показать/скрыть инструменты',
    'Tourist': 'Туристические',
    'Travel': 'Путешествие',
    'Trip': 'Поездка',
    'Yahoo': 'Yahoo',
    'Yandex': 'Яндекс',
    'YandexMap': 'Карта',
    'YandexPublic': 'Народная',
    'YandexSatellite': 'Спутник',
    'Zoom in': 'Увеличить масштаб',
    'Zoom out': 'Уменьшить масштаб',

    'Delete feature point hint': 'Удалить точку',
    'Delete feature line hint': 'Удалить трек',
    'Modify feature point hint': 'Изменить точку',
    'Modify feature line hint': 'Изменить трек',
    'Open feature point hint': 'Показать свойства точки',
    'Open feature line hint': 'Показать свойства трека',
    'Visibility off feature point hint': 'Не отображать точку на карте',
    'Visibility off feature line hint': 'Не отображать трек на карте',
    'Visibility on feature point hint': 'Отображать точку на карте',
    'Visibility on feature line hint': 'Отображать трек на карте',
  },
};

export default translation;
