// Sequentially displays projects on page load

const makeProjectsVisible = function () {
  const projects = document.getElementsByClassName('featured-project');
  let count = 0;
  [...projects].forEach(function (project, index) {
    if (!project.classList.contains('featured-project--placeholder')) {
      setTimeout(function () {
        project.classList.add('featured-project--visible');
      }, count * 120);
      count += 1;
    }
  });
};

window.onload = makeProjectsVisible;
