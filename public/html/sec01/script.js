const resultElm = document.querySelector(".result");
const incrementBtnElm = document.querySelector("#increment-btn");

let result = 0;
resultElm.textContent = result;

const increment = () => {
	result++;
	resultElm.textContent = result;
};

incrementBtnElm.addEventListener("click", increment);
