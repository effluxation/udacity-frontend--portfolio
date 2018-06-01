// Sequentially displays projects on page load

const makeProjectsVisible = function () {
  const projects = document.getElementsByClassName('featured-project');
  [...projects].forEach(function (project, index) {
    setTimeout(function () {
      project.classList.add('featured-project--visible');
    }, index * 120);
  });
};

window.onload = makeProjectsVisible;
