// Reveals email on click

const emailElement = document.querySelector('.entypo-mail');
emailElement.onclick = function () {
  emailElement.href = 'mailto:' + emailElement.dataset.lhs_a + '.' + emailElement.dataset.lhs_b + '@' + emailElement.dataset.dom + '.' + emailElement.dataset.tld;
};
