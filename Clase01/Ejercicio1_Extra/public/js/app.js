async function multiply(event) {
  event.preventDefault();

  const num1 = document.getElementById("num1").value;
  const num2 = document.getElementById("num2").value;

  const response = await axios({
    method: "post",
    url: "/multiplicar",
    data: {
      num1,
      num2,
    },
  });

  document.getElementById(
    "result"
  ).textContent = `El resultado es: ${response.data}`;
}
