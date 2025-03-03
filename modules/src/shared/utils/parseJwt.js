export function parseJwt(token) {
  // Розділяємо токен на три частини
  var base64Url = token.split('.')[1];
  // Перетворюємо Base64Url в стандартний Base64
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  // Декодуємо Base64
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  // Парсимо JSON і повертаємо об'єкт
  return JSON.parse(jsonPayload);
}
