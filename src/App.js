import React, { useState } from "react";

function CalculadoraMediaEscolar() {
  const [quantidadeNotas, setQuantidadeNotas] = useState(0);
  const [mediaEscola, setMediaEscola] = useState(0);
  const [notas, setNotas] = useState([]);
  const [mediaAluno, setMediaAluno] = useState(0);
  const [resultado, setResultado] = useState("");

  const handleQuantidadeNotasChange = (event) => {
    const quantidade = parseInt(event.target.value);
    setQuantidadeNotas(quantidade);
    setNotas(new Array(quantidade).fill(0));
  };

  const handleMediaEscolaChange = (event) => {
    const media = parseFloat(event.target.value);
    setMediaEscola(media);
  };

  const handleNotaChange = (index, event) => {
    const novaNota = parseFloat(event.target.value);
    const novasNotas = [...notas];
    novasNotas[index] = novaNota;
    setNotas(novasNotas);
  };

  const calcularMedia = () => {
    const media = notas.reduce((acc, nota) => acc + nota, 0) / quantidadeNotas;
    setMediaAluno(media);
    if (media >= mediaEscola) {
      setResultado("Aprovado");
    } else {
      setResultado("Reprovado");
    }
  };

  const notaMinima = Math.min(...notas);
  const notaNecessaria =
    mediaEscola * quantidadeNotas - notas.reduce((acc, nota) => acc + nota, 0) + notaMinima;

  return (
    <div style={{ textAlign: "center", color: resultado === "Reprovado" ? "#FF0000" : "#008000" }}>
      <label>
        Quantidade de notas:
        <input type="number" value={quantidadeNotas} onChange={handleQuantidadeNotasChange} />
      </label>
      <br />
      <label>
        Média da escola:
        <input type="number" step="0.01" value={mediaEscola} onChange={handleMediaEscolaChange} />
      </label>
      <br />
      {notas.map((nota, index) => (
        <div key={index}>
          <label>
            Nota {index + 1}:
            <input type="number" step="0.01" value={nota} onChange={(e) => handleNotaChange(index, e)} />
          </label>
        </div>
      ))}
      <br />
      <button style={{ background: "#008000", color: "#FFFFFF" }} onClick={calcularMedia}>
        Calcular Média
      </button>
      <br />
      <p>Média do aluno: {mediaAluno.toFixed(2)}</p>
      <p>Resultado: <span style={{ color: resultado === "Reprovado" ? "#FF0000" : "#008000" }}>{resultado}</span></p>
      {resultado === "Reprovado" && (
        <p>
          Para alcançar a média, substitua a nota {notaMinima.toFixed(2)} pela nota {notaNecessaria.toFixed(2)}
        </p>
      )}
    </div>
  );
}

export default CalculadoraMediaEscolar;
